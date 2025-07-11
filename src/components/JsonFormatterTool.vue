<template>
    <div class="json-tool">
      <h2 class="tool-title">JSON Formatter</h2>
  
      <div class="editor-section">
        <label for="json-input">Paste JSON</label>
        <textarea
          id="json-input"
          v-model="input"
          placeholder='{"name":"John", "age":30}'
        ></textarea>
  
        <div class="actions">
          <button @click="formatJson">Format</button>
          <button @click="minifyJson">Minify</button>
          <button @click="clearInput">Clear</button>
        </div>
      </div>
  
      <div class="output-section" v-if="output">
        <label for="json-output">Result</label>
        <textarea id="json-output" readonly :value="output"></textarea>
      </div>
  
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const input = ref('')
  const output = ref('')
  const error = ref('')
  
  const formatJson = () => {
    try {
      error.value = ''
      const parsed = JSON.parse(input.value)
      output.value = JSON.stringify(parsed, null, 2)
    } catch (err) {
      error.value = 'Invalid JSON: ' + err.message
      output.value = ''
    }
  }
  
  const minifyJson = () => {
    try {
      error.value = ''
      const parsed = JSON.parse(input.value)
      output.value = JSON.stringify(parsed)
    } catch (err) {
      error.value = 'Invalid JSON: ' + err.message
      output.value = ''
    }
  }
  
  const clearInput = () => {
    input.value = ''
    output.value = ''
    error.value = ''
  }
  </script>
  
  <style scoped>
  .json-tool {
    background: var(--card, #fff);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
    font-family: system-ui, sans-serif;
  }
  
  .tool-title {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .editor-section label,
  .output-section label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: block;
  }
  
  textarea {
    width: 100%;
    height: 180px;
    font-family: monospace;
    font-size: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    background: var(--bg, #fdfdfd);
    color: var(--text, #111);
    resize: vertical;
  }
  
  .actions {
    margin-top: 0.75rem;
    display: flex;
    gap: 1rem;
  }
  
  .actions button {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: var(--accent, #0953f4);
    color: #fff;
    transition: background 0.2s ease;
  }
  
  .actions button:hover {
    background: #003bbd;
  }
  
  .output-section {
    margin-top: 2rem;
  }
  
  .error-msg {
    margin-top: 1rem;
    color: crimson;
    font-weight: bold;
  }
  </style>
  