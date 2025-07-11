<template>
  <div>
    <h1>Thoughts, Programming, Collections</h1>
    <h3>Most Visited Sites</h3>
    <ul class="site-list">
      <li v-for="site in sites" :key="site.name">
        <a :href="site.url" target="_blank" rel="noopener">
          <img :src="site.favicon" :alt="site.name + ' logo'" class="favicon" />
          {{ site.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const sites = [
  {
    name: "Google",
    url: "https://www.google.com",
    favicon: "https://www.google.com/favicon.ico",
  },
  {
    name: "Bing",
    url: "https://www.bing.com",
    favicon: "https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg-png.png",
  },
  {
    name: "GitHub",
    url: "https://github.com",
    favicon: "https://github.githubassets.com/favicons/favicon.svg",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com",
    favicon: "https://s.ytimg.com/yts/img/favicon_32-vflOogEID.png",
  },
  {
    name: "Reddit",
    url: "https://www.reddit.com",
    favicon: "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png",
  },
  {
    name: "Wikipedia",
    url: "https://www.wikipedia.org",
    favicon: "https://www.wikipedia.org/static/favicon/wikipedia.ico",
  },
  {
    name: "Stack Overflow",
    url: "https://stackoverflow.com",
    favicon: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico",
  }
];
</script>

<style scoped>
h1, h3 {
  text-align: center;
  color: #222;
}

.site-list {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5em;
}

.site-list li {
  margin: 0;
}

.site-list a {
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: 1.1em;
  color: #42b983;
  padding: 0.4em 0.8em;
  border: 2px solid #42b983;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.site-list a:hover {
  background-color: #42b983;
  color: white;
}

.favicon {
  width: 20px;
  height: 20px;
}
</style>
