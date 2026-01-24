import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BirthdayInvitation from '../views/BirthdayInvitation.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/birthdayinvitation',
            name: 'birthday-invitation',
            component: BirthdayInvitation
        }
    ]
})

export default router
