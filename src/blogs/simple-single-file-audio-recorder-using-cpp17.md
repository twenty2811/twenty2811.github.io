Here is the codes that's generated with llms, with some tinkering for use under Mac. The problem is that due to not using libsndfile, the wav format seems broken in devices under Ubuntu.

## TODO
- [ ] Fix the broken voice, it might be related to the sample rate
- [ ] Address the issue of environmental noise interference

## The build command

```shell
g++ -std=c++17 -Wall -O2 -o recorder main.cpp -lportaudio -pthread
```

## The full codes for main.cpp

```cpp
#include <portaudio.h>
#include <chrono>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <cstring>
#include <algorithm>
#include <iterator>
#include <thread>
#include <queue>
#include <mutex>
#include <condition_variable>

namespace fs = std::filesystem;

using Sample = float;
constexpr int SAMPLE_RATE = 16000;
constexpr int FRAMES_PER_BUFFER = 512;
constexpr int NUM_CHANNELS = 1;
// constexpr float SILENCE_THRESHOLD = 0.02f;
// constexpr int SILENCE_DURATION_MS = 1000;
constexpr int MAX_CHUNK_DURATION_MS = 3000;
const int MAX_CHUNK_FRAMES = SAMPLE_RATE * MAX_CHUNK_DURATION_MS / 1000;

std::queue<std::vector<Sample>> audioQueue;
std::mutex queueMutex;
std::condition_variable queueCond;
bool stopWriter = false;

float silenceThreshold = 0.02f;
int silenceDurationMs = 200;

// Converts float [-1.0, 1.0] to 16-bit PCM
int16_t floatToInt16(Sample s) {
    s = std::max(-1.0f, std::min(1.0f, s));
    return static_cast<int16_t>(s * 32767);
}

std::string generateFilename() {
    auto now = std::chrono::system_clock::now();
    auto timestamp =
        std::chrono::duration_cast<std::chrono::seconds>(now.time_since_epoch()).count();
    return "../audios/" + std::to_string(timestamp) + ".wav";
}

void writeWavFile(const std::vector<Sample>& audio) {
    std::string filename = generateFilename();
    std::ofstream file(filename, std::ios::binary);
    if (!file) {
        std::cerr << "Cannot open file for writing: " << filename << "\n";
        return;
    }

    std::vector<int16_t> int16Buffer;
    int16Buffer.reserve(audio.size());
    for (Sample s : audio) {
        s = std::max(-1.0f, std::min(1.0f, s));  // Clip
        int16_t i16 = static_cast<int16_t>(std::round(s * 32767.0f));
        int16Buffer.push_back(i16);
    }

    int32_t dataSize = int16Buffer.size() * sizeof(int16_t);
    int32_t chunkSize = 36 + dataSize;

    file.write("RIFF", 4);
    file.write(reinterpret_cast<const char*>(&chunkSize), 4);
    file.write("WAVE", 4);

    file.write("fmt ", 4);
    int32_t subchunk1Size = 16;
    int16_t audioFormat = 1;
    int16_t numChannels = NUM_CHANNELS;
    int32_t sampleRate = SAMPLE_RATE;
    int16_t bitsPerSample = 16;
    int32_t byteRate = sampleRate * numChannels * bitsPerSample / 8;
    int16_t blockAlign = numChannels * bitsPerSample / 8;

    file.write(reinterpret_cast<const char*>(&subchunk1Size), 4);
    file.write(reinterpret_cast<const char*>(&audioFormat), 2);
    file.write(reinterpret_cast<const char*>(&numChannels), 2);
    file.write(reinterpret_cast<const char*>(&sampleRate), 4);
    file.write(reinterpret_cast<const char*>(&byteRate), 4);
    file.write(reinterpret_cast<const char*>(&blockAlign), 2);
    file.write(reinterpret_cast<const char*>(&bitsPerSample), 2);

    file.write("data", 4);
    file.write(reinterpret_cast<const char*>(&dataSize), 4);

    file.write(reinterpret_cast<const char*>(int16Buffer.data()), dataSize);
    std::cout << "Saved: " << filename << "\n";
}

void writerThread() {
    while (true) {
        std::vector<Sample> audio;
        {
            std::unique_lock<std::mutex> lock(queueMutex);
            queueCond.wait(lock, [] { return !audioQueue.empty() || stopWriter; });
            if (stopWriter && audioQueue.empty()) break;
            audio = std::move(audioQueue.front());
            audioQueue.pop();
        }
        writeWavFile(audio);
    }
}

int findDeviceWithName(const std::string& needle) {
    int numDevices = Pa_GetDeviceCount();
    for (int i = 0; i < numDevices; ++i) {
        const PaDeviceInfo* info = Pa_GetDeviceInfo(i);
        std::string name = info->name ? info->name : "";
        if (name.find(needle) != std::string::npos) {
            std::cout << "✔ Found match: index=" << i << ", name=\"" << name << "\"\n";
            return i;
        }
    }
    std::cerr << "❌ No match found for \"" << needle << "\"\n";
    return -1;
}

bool isVoice(const Sample* buffer, int frameCount, float threshold) {
    float energy = 0.0f;
    int zeroCrossings = 0;
    bool lastPositive = buffer[0] > 0;

    for (int i = 0; i < frameCount; ++i) {
        energy += buffer[i] * buffer[i];

        bool currentPositive = buffer[i] > 0;
        if (currentPositive != lastPositive) {
            zeroCrossings++;
            lastPositive = currentPositive;
        }
    }

    float rms = std::sqrt(energy / frameCount);
    float zcr = static_cast<float>(zeroCrossings) / frameCount;

    bool isLoudEnough = rms > threshold;
    bool isHumanZCR = zcr > 0.05f && zcr < 0.35f;

    return isLoudEnough && isHumanZCR;
}

int main(int argc, char** argv) {
    for (int i = 1; i < argc; ++i) {
        std::string arg = argv[i];
        if ((arg == "--threshold" || arg == "-t") && i + 1 < argc) {
            try {
                silenceThreshold = std::stof(argv[++i]);
            } catch (...) {
                std::cerr << "Invalid threshold value, using default.\n";
            }
        } else if ((arg == "--duration" || arg == "-d") && i + 1 < argc) {
            try {
                silenceDurationMs = std::stoi(argv[++i]);
            } catch (...) {
                std::cerr << "Invalid duration value, using default.\n";
            }
        } else {
            std::cerr << "Unknown option: " << arg << "\n";
        }
    }

    if (!fs::exists("../audios")) {
        fs::create_directories("../audios");
    }

    Pa_Initialize();
    std::thread writer(writerThread);

    PaStream* stream;
    PaStreamParameters inputParams;

    int deviceIndex = -1;

#if defined(__APPLE__) && defined(__MACH__)
    // macOS: use default input device
    deviceIndex = Pa_GetDefaultInputDevice();
    std::cout << "macOS: using default input device index = " << deviceIndex << "\n";
#else
    // Linux/others: search for named device
    deviceIndex = findDeviceWithName("USB Audio Device");
    if (deviceIndex < 0) {
        std::cerr << "No USB Audio Device found, fallback to default input device.\n";
        deviceIndex = Pa_GetDefaultInputDevice();
    }
#endif

    if (deviceIndex < 0) {
        std::cerr << "❌ Failed to select an input device.\n";
        return 1;
    }

    inputParams.device = deviceIndex;

    inputParams.channelCount = NUM_CHANNELS;
    inputParams.sampleFormat = paFloat32;
    inputParams.suggestedLatency = Pa_GetDeviceInfo(inputParams.device)->defaultLowInputLatency;
    inputParams.hostApiSpecificStreamInfo = nullptr;

    PaError err = Pa_OpenStream(&stream, &inputParams, nullptr, SAMPLE_RATE, FRAMES_PER_BUFFER,
                                paClipOff, nullptr, nullptr);
    if (err != paNoError) {
        std::cerr << "Error opening stream: " << Pa_GetErrorText(err) << "\n";
        return 1;
    }

    err = Pa_StartStream(stream);
    if (err != paNoError) {
        std::cerr << "Error starting stream: " << Pa_GetErrorText(err) << "\n";
        return 1;
    }

    std::vector<Sample> currentBuffer;
    int silentDurationMs = 0;
    Sample buffer[FRAMES_PER_BUFFER];
    Sample previousSample = 0.0f;

    std::cout << "Recording. Speak into the mic...\n";

    while (true) {
        err = Pa_ReadStream(stream, buffer, FRAMES_PER_BUFFER);
        if (err != paNoError) {
            std::cerr << "Error reading stream: " << Pa_GetErrorText(err) << "\n";
            break;
        }

        for (int i = 0; i < FRAMES_PER_BUFFER; ++i) {
            Sample filtered = buffer[i] - previousSample * 0.95f;
            previousSample = buffer[i];
            buffer[i] = filtered;
        }

        float energy = 0.0f;
        for (int i = 0; i < FRAMES_PER_BUFFER; ++i) {
            energy += buffer[i] * buffer[i];
        }

        bool voice = isVoice(buffer, FRAMES_PER_BUFFER, silenceThreshold);
        if (!voice) {
            silentDurationMs += (FRAMES_PER_BUFFER * 1000 / SAMPLE_RATE);
            if (silentDurationMs >= silenceDurationMs && !currentBuffer.empty()) {
                std::lock_guard<std::mutex> lock(queueMutex);
                audioQueue.push(currentBuffer);
                queueCond.notify_one();
                currentBuffer.clear();
            }
        } else {
            silentDurationMs = 0;
            currentBuffer.insert(currentBuffer.end(), buffer, buffer + FRAMES_PER_BUFFER);

            while ((int)currentBuffer.size() >= MAX_CHUNK_FRAMES) {
                std::vector<Sample> chunk(currentBuffer.begin(),
                                          currentBuffer.begin() + MAX_CHUNK_FRAMES);
                std::lock_guard<std::mutex> lock(queueMutex);
                audioQueue.push(std::move(chunk));
                queueCond.notify_one();
                currentBuffer.erase(currentBuffer.begin(),
                                    currentBuffer.begin() + MAX_CHUNK_FRAMES);
            }
        }
    }

    Pa_StopStream(stream);
    Pa_CloseStream(stream);
    Pa_Terminate();

    {
        std::lock_guard<std::mutex> lock(queueMutex);
        stopWriter = true;
        queueCond.notify_one();
    }
    writer.join();
    return 0;
}
```
