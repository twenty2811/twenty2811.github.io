import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import HomePage from '@/views/HomePage.vue'
import ToolsPage from '@/views/ToolsPage.vue'
import BlogListPage from '@/views/BlogList.vue'
import BlogViewerPage from '@/views/BlogViewer.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,  // maybe App.vue equivalent
    children: [
      { path: '', redirect: '/home' },
      { path: 'home', component: HomePage },
      { path: 'tools', component: ToolsPage },
      { path: 'blog', component: BlogListPage },
      { path: 'blog/:slug', component: BlogViewerPage, meta: { title: 'Blogs' } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const defaultTitle = "John's Blog"
  document.title = to.meta.title || defaultTitle
  next()
})

export default router
