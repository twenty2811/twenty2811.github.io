<template>
  <HelloWorld msg="thoughts, programming, collections" />

  <div :price="price">
    {{ price }}
  </div>

  <div>
    <q-r-code-gen></q-r-code-gen>
  </div>
  

</template>

<script setup>
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import HelloWorld from "./components/HelloWorld.vue";
import QRCodeGen from "./components/QRCodeGen.vue";

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
  if (hour < 9 || hour > 15) {
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
