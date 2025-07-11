<template>
  <div class="blog-page">
    <header class="blog-header">
      <h1 class="blog-title">Welcome to John's Blog</h1>
      <nav class="blog-nav">
        <router-link class="nav-link" to="/home">Home</router-link>
        <router-link class="nav-link" to="/tools">Tools</router-link>
      </nav>
    </header>

    <main class="blog-content">
      <router-view />
    </main>
  </div>
</template>

<script setup></script>

<style scoped>
.blog-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em;
  font-family: system-ui, sans-serif;
  background-color: #fdfdfd;
  min-height: 100vh;
}

.blog-header {
  width: 100%;
  max-width: 800px;
  text-align: center;
  margin-bottom: 2em;
}

.blog-title {
  font-size: 2.5em;
  margin: 0 0 0.5em;
  color: #222;
}

.blog-nav {
  display: flex;
  justify-content: center;
  gap: 2em;
}

.nav-link {
  color: #0953f4;
  text-decoration: none;
  font-size: 1.2em;
}

.nav-link:hover {
  text-decoration: underline;
}

.blog-content {
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 2em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
</style>

<style>
/* Reset page margin/padding */
body,
html {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

/* Ensure router transitions start from top */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
