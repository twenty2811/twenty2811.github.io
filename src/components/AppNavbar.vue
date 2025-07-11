<template>
  <div :class="['app-container', { dark: isDark }]">
    <header class="app-navbar">
      <div class="navbar-inner">
        <h1 class="app-title">John's Blog</h1>

        <!-- Mobile Menu Button -->
        <button class="mobile-toggle" @click="drawerOpen = !drawerOpen">
          <span :class="{ open: drawerOpen }"></span>
        </button>

        <!-- Navigation -->
        <nav class="nav-links desktop-only">
          <router-link to="/home" class="nav-link" exact>Home</router-link>
          <router-link to="/tools" class="nav-link">Tools</router-link>
          <router-link to="/blog" class="nav-link">Blog</router-link>
          <button class="theme-toggle" @click="toggleDark">
            {{ isDark ? "☀️" : "🌙" }}
          </button>
        </nav>
      </div>

      <!-- Mobile Drawer -->
      <nav v-if="drawerOpen" class="nav-drawer mobile-only">
        <router-link to="/home" class="nav-link" @click="drawerOpen = false"
          >Home</router-link
        >
        <router-link to="/tools" class="nav-link" @click="drawerOpen = false"
          >Tools</router-link
        >
        <router-link to="/blog" class="nav-link" @click="drawerOpen = false"
          >Blog</router-link
        >
        <button class="theme-toggle" @click="toggleDark">
          {{ isDark ? "☀️" : "🌙" }}
        </button>
      </nav>
    </header>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";

const isDark = ref(false);
const drawerOpen = ref(false);

function toggleDark() {
  isDark.value = !isDark.value;
}

watchEffect(() => {
  document.documentElement.setAttribute(
    "data-theme",
    isDark.value ? "dark" : "light"
  );
});
</script>

<style scoped>
/* Responsive helpers */
.desktop-only {
  display: flex;
}
.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: flex;
    flex-direction: column;
    padding: 1em;
    background: var(--bg);
  }
}

.app-navbar {
  height: 60px; /* fixed height */
  line-height: 60px; /* vertical centering text if needed */
  padding: 0 1rem; /* horizontal padding */
  box-sizing: border-box; /* include padding in width/height */
  background: var(--card);
  box-shadow: 0 2px 8px var(--shadow);
  position: fixed; /* fixed at top */
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center; /* vertical center content */
  justify-content: space-between;
}

.navbar-inner {
  max-width: 960px;
  width: 100%;
  margin: 0 auto;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.app-title {
  font-size: 1.5em;
  color: var(--accent);
  margin: 0;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  gap: 1.5em;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: var(--text);
  font-size: 1em;
  position: relative;
}

.nav-link.router-link-active::after,
.nav-link.router-link-exact-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 2px;
  background: var(--accent);
}

.theme-toggle {
  background: transparent;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  color: var(--text);
}

.mobile-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }
}

/* Main Page Content */
.page-content {
  flex: 1;
  max-width: 900px;
  margin: 2em auto;
  padding: 0 1em;
  background: var(--card);
  border-radius: 8px;
  box-shadow: 0 3px 10px var(--shadow);
}
</style>
