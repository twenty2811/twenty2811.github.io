<template>
  <div class="blog-layout">
    <aside class="sidebar">
      <h2>Articles</h2>
      <ul>
        <li v-for="post in posts" :key="post.slug">
          <router-link
            :to="`/blog/${post.slug}`"
            :class="{ active: post.slug === route.params.slug }"
          >
            {{ post.title }}
          </router-link>
        </li>
      </ul>
    </aside>

    <main class="content">
      <h1>{{ title }}</h1>
      <div v-html="htmlContent" class="markdown" />
    </main>
  </div>
</template>

<script setup>
import { useBlogPosts } from "@/composables/useBlogPosts";
import { useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import { marked } from "marked";

const route = useRoute();
const posts = useBlogPosts();

const title = ref("");
const htmlContent = ref("");

function loadPost(slug) {
  const post = posts.find((p) => p.slug === slug);
  if (post) {
    title.value = post.title;
    htmlContent.value = marked.parse(post.content);
  } else {
    title.value = "Not Found";
    htmlContent.value = "<p>Article not found.</p>";
  }
}

onMounted(() => loadPost(route.params.slug));
watch(
  () => route.params.slug,
  (slug) => loadPost(slug)
);
</script>

<style scoped>
.blog-layout {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 2rem;
  max-width: 100%; /* Wider than before */
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  box-sizing: border-box;
  background-color: var(--bg);
  color: var(--text);
}

.sidebar {
  flex: 0 0 220px;
  background: #f4f4f4;
  color: var(--text);
  padding: 1.2rem;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 2rem;
  box-sizing: border-box;
}

.sidebar h2 {
  margin-bottom: 1em;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 0.5em;
}

.sidebar a {
  text-decoration: none;
  color: #0953f4;
}

.sidebar a.active {
  font-weight: bold;
  text-decoration: underline;
}

.content {
  flex: 1 1 0;
  min-width: 900px;
  background-color: var(--bg);
  color: var(--text);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  width: 100%;
}

/* Markdown Styling */
.markdown {
  line-height: 1.6;
  max-width: 100%;
}

/* Responsive Layout */
@media (max-width: 1024px) {
  .blog-layout {
    flex-direction: column;
    padding: 1rem;
  }

  .sidebar {
    position: static;
    width: 100%;
    margin-bottom: 1rem;
  }

  .content {
    width: 100%;
  }
}
</style>
