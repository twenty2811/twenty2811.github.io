<template>
  <div class="timestamp-tool">
    <h2 class="tool-title">Unix Timestamp Tool</h2>

    <div class="timestamp-section">
      <label for="unix">Unix Timestamp</label>
      <input
        id="unix"
        type="number"
        v-model="timestamp"
        placeholder="Enter Unix timestamp"
      />
      <button @click="convertToDate">Convert to Date</button>
    </div>

    <div class="timestamp-section">
      <label for="date">Readable Date</label>
      <input
        id="date"
        type="datetime-local"
        v-model="readable"
      />
      <button @click="convertToTimestamp">Convert to Timestamp</button>
    </div>

    <div class="output">
      <p><strong>Timestamp:</strong> {{ timestamp }}</p>
      <p><strong>Readable Date:</strong> {{ formattedDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const timestamp = ref(Math.floor(Date.now() / 1000))
const readable = ref(new Date(timestamp.value * 1000).toISOString().slice(0, 16))

const convertToDate = () => {
  if (timestamp.value) {
    const dt = new Date(Number(timestamp.value) * 1000)
    readable.value = dt.toISOString().slice(0, 16)
  }
}

const convertToTimestamp = () => {
  if (readable.value) {
    timestamp.value = Math.floor(new Date(readable.value).getTime() / 1000)
  }
}

const formattedDate = computed(() => {
  return new Date(Number(timestamp.value) * 1000).toLocaleString()
})
</script>

<style scoped>
.timestamp-tool {
  background: var(--card, #fff);
  padding: 2rem;
  font-family: system-ui, sans-serif;
}

.tool-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.timestamp-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.timestamp-section input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: var(--bg, #fafafa);
  color: var(--text, #222);
}

.timestamp-section button {
  align-self: flex-start;
  padding: 0.4rem 0.8rem;
  background: var(--accent, #0953f4);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.timestamp-section button:hover {
  background: #003bbd;
}

.output p {
  margin-top: 0.5rem;
  color: var(--text, #222);
}
</style>
