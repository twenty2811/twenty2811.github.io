<template>
  <div>
    <h1>Thoughts, Programming, Collections</h1>
    <h3>Most Visited Sites</h3>
    <ul class="site-list">
      <li v-for="(site, index) in sites" :key="site.name">
        <a :href="site.url" target="_blank" rel="noopener">
          <img
            v-if="iconVisible[index]"
            :src="site.favicon"
            :alt="site.name + ' logo'"
            class="favicon"
          />
          {{ site.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

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
    favicon:
      "https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png",
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
  },
];

const iconVisible = ref(new Array(sites.length).fill(false))

// Track which icons are visible
async function checkFavicon(url, timeoutMs = 300) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      mode: 'no-cors', // may still fail but avoids CORS errors
    });
    clearTimeout(timeout);
    return res.ok || res.status === 0; // status 0 if no-cors
  } catch (err) {
    return false;
  }
}

onMounted(async () => {
  await Promise.all(
    sites.map(async (site, index) => {
      const ok = await checkFavicon(site.favicon, 300);
      iconVisible.value[index] = ok;
    })
  );
});
</script>

<style scoped>
h1,
h3 {
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
