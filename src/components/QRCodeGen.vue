<template>
  <div>
    <div class="container">
      <textarea
        class="text-style"
        cols="30"
        placeholder="Qr Code Contents"
        v-model="inputValue"
        @input="handleInput"
      />

      <vue-qrcode class="code-style" :value="inputValue" />
    </div>
  </div>
</template>

<script setup>
import VueQrcode from "vue-qrcode";
import { ref } from "vue";

const inputValue = ref("");
const handleInput = (event) => {
  inputValue.value = event.target.value;
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.text-style {
  margin-top: 2em;
  display: block;
  min-height: 80px; /* Set a minimum height */
  resize: true; /* Disable textarea resizing */
}

.text-style,
.code-style {
  align-self: flex-start;
}
</style>
