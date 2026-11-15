<template>
  <header class="site-header">
    <div class="wrap bar">
      <a class="brand" href="/">{{ fullName }}</a>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="site-nav"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="menuOpen = !menuOpen"
      >
        <!-- Bootstrap Icons: x-lg and list (MIT) -->
        <svg v-if="menuOpen" class="bi bi-x-lg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
        <svg v-else class="bi bi-list" viewBox="0 0 16 16" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
        </svg>
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
          <svg :class="`bi bi-${item.icon}`" viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
            <path v-for="d in icons[item.icon]" :key="d" :d="d" />
          </svg>
          {{ item.label }}
        </a>
        <button class="theme-toggle" type="button" @click="emit('toggle-dark-mode')">
          <svg :class="`bi bi-${darkMode ? 'sun' : 'moon'}`" viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
            <path v-for="d in icons[darkMode ? 'sun' : 'moon']" :key="d" :d="d" />
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
  { id: 'home', label: 'Home', icon: 'house' },
  { id: 'about', label: 'About', icon: 'person' },
  { id: 'skills', label: 'Skills', icon: 'code-slash' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'awards', label: 'Awards', icon: 'trophy' },
  { id: 'certifications', label: 'Certifications', icon: 'patch-check' },
  { id: 'recommendations', label: 'Recommendations', icon: 'chat-quote' },
  { id: 'contact', label: 'Contact', icon: 'envelope' }
]

// Bootstrap Icons (MIT), outline style
const icons = {
  house: ['M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z'],
  person: ['M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z'],
  'code-slash': ['M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0'],
  briefcase: ['M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5'],
  trophy: ['M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5q0 .807-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33 33 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935m10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935M3.504 1q.01.775.056 1.469c.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.5.5 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667q.045-.694.056-1.469z'],
  'patch-check': [
    'M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0',
    'm10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z'
  ],
  'chat-quote': [
    'M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105',
    'M7.066 6.76A1.665 1.665 0 0 0 4 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z'
  ],
  envelope: ['M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z'],
  sun: ['M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708'],
  moon: ['M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286']
}

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
  gap: 1.25rem;
  font-size: 0.9375rem;
}

.site .nav a {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
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
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-right: -0.625rem;
  border-radius: 8px;
  color: var(--ink);
}

.menu-toggle:hover {
  background: var(--tint);
}

@keyframes menu-in {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
}

@media (max-width: 1180px) {
  .menu-toggle {
    display: grid;
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
