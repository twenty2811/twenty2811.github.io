import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/HomePage')
    },
    {
        path: '/tools',
        name: 'Tools',
        component: () => import('@/components/OnlineTools')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;