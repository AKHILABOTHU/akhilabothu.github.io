<template>
  <section id="skills" class="section section--alt">
    <div class="wrap">
      <h2 v-reveal class="section__title">What I work with</h2>
      <p v-reveal class="section__lead">
        The full stack, from database to interface, plus what it takes to ship and run it.
      </p>

      <div class="groups">
        <div v-for="(skill, index) in skills" :key="skill.group" v-reveal>
          <div class="card card--lift group">
            <h3>{{ skill.group }}</h3>
            <div
              :ref="(el) => { carouselEls[index] = el }"
              class="carousel"
              :class="{ 'carousel--scrollable': scrollState[index]?.scrollable }"
            >
              <button
                v-show="scrollState[index]?.scrollable"
                type="button"
                class="carousel__button"
                :disabled="!scrollState[index]?.canPrev"
                :aria-label="`Previous ${skill.group} tools`"
                @click="scrollTools(index, -1)"
              >
                <!-- Bootstrap Icons: chevron-left (MIT) -->
                <svg class="bi bi-chevron-left" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
              </button>

              <ul
                :ref="(el) => { trackEls[index] = el }"
                class="tools"
                :class="{
                  'tools--fade-start': scrollState[index]?.canPrev,
                  'tools--fade-end': scrollState[index]?.canNext
                }"
                @scroll.passive="updateScrollState(index)"
              >
                <li v-for="tool in skill.tools" :key="tool.name" class="tool">
                  <span class="tool__logo">
                    <img :src="tool.src || `${iconBase}/${tool.icon}.svg`" alt="" width="28" height="28" loading="lazy">
                  </span>
                  {{ tool.name }}
                </li>
              </ul>

              <button
                v-show="scrollState[index]?.scrollable"
                type="button"
                class="carousel__button"
                :disabled="!scrollState[index]?.canNext"
                :aria-label="`Next ${skill.group} tools`"
                @click="scrollTools(index, 1)"
              >
                <!-- Bootstrap Icons: chevron-right (MIT) -->
                <svg class="bi bi-chevron-right" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
            <p class="also">{{ skill.also }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  skills: Array
})

// A tool can give a full "src" instead, for logos that only exist in a newer icon set
const iconBase = 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons'

const carouselEls = []
const trackEls = []
const scrollState = ref(props.skills.map(() => ({ scrollable: false, canPrev: false, canNext: false })))

// Each logo needs at least this much room (matches .tool's 6.5rem)
const toolWidth = () => 6.5 * parseFloat(getComputedStyle(document.documentElement).fontSize)

// Buttons show only when the logos can't all fit across the full card width. Measuring without the
// buttons keeps the answer stable, since the buttons themselves take up room once they appear.
const updateScrollState = (index) => {
  const carousel = carouselEls[index]
  const track = trackEls[index]
  if (!carousel || !track) {
    return
  }
  const scrollable = props.skills[index].tools.length * toolWidth() > carousel.clientWidth + 1
  const maxScroll = track.scrollWidth - track.clientWidth
  scrollState.value[index] = {
    scrollable,
    canPrev: scrollable && track.scrollLeft > 1,
    canNext: scrollable && track.scrollLeft < maxScroll - 1
  }
}

const updateAll = () => props.skills.forEach((_, index) => updateScrollState(index))

// Move by most of the visible width, so one logo stays in view for context
const scrollTools = (index, direction) => {
  const el = trackEls[index]
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' })
}

let resizeObserver = null

onMounted(() => {
  updateAll()
  resizeObserver = new ResizeObserver(updateAll)
  carouselEls.forEach((el) => el && resizeObserver.observe(el))
})

onUnmounted(() => resizeObserver?.disconnect())
</script>

<style scoped>
.groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 2.5rem;
}

.group {
  height: 100%;
  padding: 1.5rem;
}

h3 {
  font-size: 1.1875rem;
  font-weight: 600;
  line-height: 1.3;
}

.carousel {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1.125rem;
}

.tools {
  display: flex;
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 0.25rem 0;
  overflow-x: auto;
  list-style: none;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.tools::-webkit-scrollbar {
  display: none;
}

/* Fade only the side that has more logos hidden behind it */
.tools--fade-start {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%);
  mask-image: linear-gradient(90deg, transparent, #000 12%);
}

.tools--fade-end {
  -webkit-mask-image: linear-gradient(90deg, #000 88%, transparent);
  mask-image: linear-gradient(90deg, #000 88%, transparent);
}

.tools--fade-start.tools--fade-end {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
}

.tool {
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  width: 6.5rem;
  gap: 0.375rem;
  font-size: 0.8125rem;
  line-height: 1.25;
  text-align: center;
  scroll-snap-align: start;
}

/* Without buttons, spread the logos evenly, but never squeeze them; overflowing is what brings the buttons in */
.carousel:not(.carousel--scrollable) .tool {
  flex: 1 0 6.5rem;
}

.carousel__button {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--rule);
  border-radius: 50%;
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;
}

.carousel__button:hover:not(:disabled) {
  border-color: var(--accent);
  background: var(--tint);
  color: var(--accent);
}

.carousel__button:disabled {
  opacity: 0.35;
  cursor: default;
}

/* White in both themes, because some logos are dark */
.tool__logo {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid var(--rule);
  border-radius: 8px;
  background: #ffffff;
  transition: transform 0.2s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.tool:hover .tool__logo {
  transform: translateY(-3px) scale(1.06);
}

.tool__logo img {
  display: block;
  width: 1.75rem;
  height: 1.75rem;
}

.also {
  margin-top: 1.125rem !important;
  padding-top: 0.875rem;
  border-top: 1px solid var(--rule);
  color: var(--muted);
  font-size: 0.9375rem;
}

@media (max-width: 860px) {
  .groups {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
