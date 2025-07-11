<template>
  <div>
    <AppNavbar />
    <main class="page-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppNavbar from "@/components/AppNavbar.vue";
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  margin-top: 60px; /* if you have fixed navbar */
  min-height: calc(100vh - 60px); /* fill remaining height */
  
  display: flex;
  justify-content: center; /* horizontal center */
  align-items: flex-start;  /* vertical alignment at top, change to center if needed */

  padding: 1rem 2rem;
  box-sizing: border-box;
}


</style>
