<template>
  <div class="page-layout">
    <main class="page-content">
      <h1>Blog Articles</h1>
      <ul>
        <li v-for="post in posts" :key="post.slug">
          <router-link :to="`/blog/${post.slug}`">{{ post.title }}</router-link>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
import { useBlogPosts } from "@/composables/useBlogPosts";

const posts = useBlogPosts();
</script>

<style scoped>
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
  width: 100%;
}

.page-content {
  margin-top: 60px;
  max-width: 960px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 2rem;
  box-sizing: border-box;
  text-align: left;
  background: var(--card);
  box-shadow: 0 3px 10px var(--shadow);
  border-radius: 8px;
}

.page-content h1 {
  width: 100%;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 600;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 1em;
  font-size: 1.1em;
}
</style>
