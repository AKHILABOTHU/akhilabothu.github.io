import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import reveal from './directives/reveal'

createApp(App)
    .use(router)
    .directive('reveal', reveal)
    .mount('#app')

const pageLoaded = new Promise((resolve) => {
    if (document.readyState === 'complete') {
        resolve()
    } else {
        window.addEventListener('load', resolve, { once: true })
    }
})

// Smooth scrolling during load collides with the jump to a direct link like /#awards
Promise.all([router.isReady(), document.fonts.ready, pageLoaded]).then(() => {
    setTimeout(() => document.documentElement.classList.add('smooth-scroll'), 300)
})
