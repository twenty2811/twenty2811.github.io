<template>
  <router-link class="router-link" to="/home"> Home </router-link>
  <router-link class="router-link" to="/tools"> Tools </router-link>
  <router-view />
</template>

<script setup></script>

<style scoped>
.router-link {
  color: #0953f4;
  font-size: 2em;
  padding: 1em 2em;
  justify-content: center;
}
</style>
