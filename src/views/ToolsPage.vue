<template>
  <div class="page-layout">
    <main class="page-content">
      <div :price="price">
        {{ price }}
      </div>

      <div>
        <q-r-code-gen></q-r-code-gen>
      </div>

      <div>
        <password-gen></password-gen>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import QRCodeGen from "@/components/QRCodeGen.vue";
import PasswordGen from "@/components/PasswordGen.vue";

const price = ref();

const isWeekend = (date) => {
  if (date.getDay() === 0 || date.getDay() === 6) {
    return true;
  } else {
    return false;
  }
};

onMounted(() => {
  const hour = dayjs().hour();
  if (hour < 9 || hour > 14) {
    return;
  }
  const today = new Date();
  if (isWeekend(today)) {
    return;
  }

  const task = setInterval(
    () =>
      fetch("https://push2.eastmoney.com/api/qt/ulist.np/get?secids=0.002127")
        .then((res) => res.json())
        .then((data) => {
          price.value = data.data.diff[0].f2;
        }),
    3000
  );

  setTimeout(() => clearInterval(task), 1000 * 60 * 60);
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.page-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  font-family: system-ui, sans-serif;
  background-color: var(--bg);
  color: var(--text);
  min-height: 100vh;
  margin: 0 auto;
}

.page-content {
  margin-top: 60px; /* Adjust if you have a fixed navbar height */
  max-width: 800px; /* Limit the content width */
  width: 100%; /* Full width inside max-width */
  margin-left: auto; /* Center horizontally */
  margin-right: auto; /* Center horizontally */
  padding: 1.5rem 2rem; /* Add some padding */
  box-sizing: border-box; /* Include padding in width */
  text-align: center; /* Center text inside */
  /* Optional: add shadow or border radius for style */
  background: var(--card);
  box-shadow: 0 3px 10px var(--shadow);
  border-radius: 8px;
}
</style>
