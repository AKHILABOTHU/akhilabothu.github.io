<template>
  <header class="site-header">
    <div class="wrap bar">
      <a class="brand" href="/">{{ fullName }}</a>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="site-nav"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Close' : 'Menu' }}
      </button>

      <nav id="site-nav" class="nav" :class="{ 'nav--open': menuOpen }" aria-label="Main">
        <a
          v-for="item in items"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ 'is-active': activeId === item.id }"
          :aria-current="activeId === item.id ? 'true' : null"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </a>
        <button class="theme-toggle" type="button" @click="emit('toggle-dark-mode')">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <template v-if="darkMode">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </template>
            <path v-else d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
          </svg>
          {{ darkMode ? 'Light' : 'Dark' }}
        </button>
      </nav>
    </div>
    <div class="progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true"></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
  fullName: String,
  darkMode: Boolean
})

const emit = defineEmits(['toggle-dark-mode'])

const menuOpen = ref(false)
const activeId = ref('')
const progress = ref(0)

const items = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'awards', label: 'Awards' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'contact', label: 'Contact' }
]

let observer = null
let frame = null

const updateProgress = () => {
  frame = null
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  progress.value = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
}

const onScroll = () => {
  if (frame === null) {
    frame = requestAnimationFrame(updateProgress)
  }
}

onMounted(() => {
  // The active section is whichever one crosses the middle of the screen
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id
      } else if (activeId.value === entry.target.id) {
        activeId.value = ''
      }
    })
  }, { rootMargin: '-45% 0px -50% 0px' })

  items.forEach((item) => {
    const section = document.getElementById(item.id)
    if (section) {
      observer.observe(section)
    }
  })

  window.addEventListener('scroll', onScroll, { passive: true })
  updateProgress()
})

onUnmounted(() => {
  observer.disconnect()
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(frame)
})
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--bg);
  border-bottom: 1px solid var(--rule);
  transition: background-color 0.25s ease;
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--header-height);
}

.progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--accent);
  transform-origin: left;
}

.site .brand {
  color: var(--ink);
  font-weight: 600;
  text-decoration: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.9375rem;
}

.site .nav a {
  position: relative;
  padding-block: 0.375rem;
  color: var(--muted);
  text-decoration: none;
}

.site .nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.site .nav a:hover,
.site .nav a.is-active {
  color: var(--ink);
}

.site .nav a:hover::after,
.site .nav a.is-active::after {
  transform: scaleX(1);
}

button {
  padding: 0;
  border: 0;
  background: none;
  color: var(--muted);
  font: inherit;
  cursor: pointer;
  transition: color 0.15s ease;
}

button:hover {
  color: var(--ink);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding-left: 1.5rem;
  border-left: 1px solid var(--rule);
}

.theme-toggle svg {
  transition: transform 0.35s ease;
}

.theme-toggle:hover svg {
  transform: rotate(20deg);
}

.menu-toggle {
  display: none;
  font-size: 0.9375rem;
  min-height: 2.75rem;
  padding-inline: 0.5rem;
  margin-right: -0.5rem;
}

@keyframes menu-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
}

@media (max-width: 980px) {
  .menu-toggle {
    display: block;
  }

  .nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.5rem clamp(1rem, 4vw, 2.5rem) 1rem;
    background: var(--bg);
    border-bottom: 1px solid var(--rule);
  }

  .nav--open {
    display: flex;
    animation: menu-in 0.2s ease;
  }

  .site .nav a,
  .theme-toggle {
    padding: 0.625rem 0;
    text-align: left;
  }

  .site .nav a::after {
    display: none;
  }

  .site .nav a.is-active {
    color: var(--accent);
    font-weight: 500;
  }

  .theme-toggle {
    margin-top: 0.5rem;
    border-left: 0;
    border-top: 1px solid var(--rule);
    padding-top: 1rem;
  }
}
</style>
