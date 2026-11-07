import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ],
    scrollBehavior(to, from) {
        if (to.hash) {
            // A direct link opens at the section; web fonts change the page height, so wait for them
            const isDirectLink = from.matched.length === 0
            return document.fonts.ready.then(() => ({
                el: to.hash,
                top: 80,
                behavior: isDirectLink ? 'instant' : 'smooth'
            }))
        }
    }
})

export default router
