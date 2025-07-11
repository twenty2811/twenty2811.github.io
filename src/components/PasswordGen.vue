<template>
  <div
    class="password-style"
    v-for="password in passwords"
    :key="password"
    @click="copyToClipboard(password)"
  >
    {{ password }}
  </div>

  <div v-if="showHint" class="hint">
    Click an item to copy it to the clipboard
  </div>

  <p>
    Password should include symbols and at least one character from each pool?
  </p>
  <label>
    <input type="radio" name="answer" value="yes" v-model="answer" /> Yes
  </label>
  <label>
    <input type="radio" name="answer" value="no" v-model="answer" /> No
  </label>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import generator from "generate-password";

let passwords = reactive();
const answer = ref("");
const showHint = ref(true);

watch(
  answer,
  // eslint-disable-next-line no-unused-vars
  (newValue, oldValue) => {
    passwords = generator.generateMultiple(3, {
      length: 20,
      uppercase: true,
      numbers: true,
      symbols: newValue === "yes" ? true : false,
      excludeSimilarCharacters: true,
      strict: newValue === "yes" ? true : false,
    });
  }
);

// TODO, optimize this later
const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showHint.value = false;
    })
    .catch((err) => {
      console.log("Error copying to clipboard: " + err.message);
    });
};

passwords = generator.generateMultiple(3, {
  length: 20,
  uppercase: true,
  numbers: true,
  symbols: true,
  excludeSimilarCharacters: true,
  strict: true,
});
</script>

<style scoped>
.password-style {
  margin-top: 1em;
  cursor: pointer;
}

.password-title {
  margin-top: 2em;
  margin-bottom: 2em;
  cursor: pointer;
}

.hint {
  margin-top: 10px;
  font-size: 0.8rem;
  color: #888;
}
</style>
