<template>
  <section id="experience" class="section">
    <div class="wrap">
      <h2 v-reveal class="section__title">Experience</h2>

      <p v-reveal class="section__lead">Three teams so far, each with more ownership than the last.</p>

      <!-- Career path: oldest on the left, climbing to today on the right -->
      <div ref="pathEl" v-reveal class="path">
        <svg class="path__line" :viewBox="`0 0 ${size.w} ${size.h}`" :width="size.w" :height="size.h" aria-hidden="true">
          <path :d="curve" />
        </svg>

        <ol class="stops">
          <li
            v-for="(position, index) in timeline"
            :key="position.company"
            class="stop"
            :class="{ 'stop--current': position.current }"
            :style="{ '--rise': timeline.length - 1 - index, '--order': index }"
          >
            <span :ref="(el) => { dotEls[index] = el }" class="stop__dot" aria-hidden="true"></span>
            <LogoTile :src="logoUrl(position.logo)" :fit="position.logoFit" :monogram="position.monogram" />
            <h3 class="stop__company">
              {{ position.company }}
              <span v-if="position.current" class="tag">Current</span>
            </h3>
            <p class="stop__role">{{ position.role }}</p>
            <p class="stop__period">{{ position.period }}</p>
            <p class="stop__detail">{{ position.detail }}</p>
          </li>
        </ol>
      </div>

      <h3 v-reveal class="group-title">Selected work</h3>
      <p v-reveal class="group-lead">A closer look at three projects from my time at Capgemini.</p>

      <article
        v-for="(study, index) in caseStudies"
        :key="study.title"
        v-reveal
        class="study-slot"
      >
        <div class="card study" :class="{ 'study--flip': index % 2 === 1 }">
          <div class="study__text">
            <p class="study__meta">
              <span class="tag">{{ study.client }}</span>
              <span>{{ study.period }}</span>
            </p>
            <h4 class="study__title">{{ study.title }}</h4>

            <h5>The challenge</h5>
            <p class="study__body">{{ study.challenge }}</p>

            <h5>What I did</h5>
            <ul class="steps">
              <li v-for="step in study.steps" :key="step">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M3 8.5l3.25 3.25L13 5" />
                </svg>
                {{ step }}
              </li>
            </ul>

            <p class="stack">
              <span v-for="tech in study.stack" :key="tech" class="tag tag--plain">{{ tech }}</span>
            </p>
          </div>

          <div class="board">
            <h5>What changed</h5>
            <dl>
              <div v-for="change in study.changes" :key="change.label" class="change">
                <dt>{{ change.label }}</dt>
                <dd>
                  <span class="chip chip--from">{{ change.from }}</span>
                  <span class="line" aria-hidden="true"></span>
                  <span class="sr-only">became</span>
                  <span class="chip chip--to">{{ change.to }}</span>
                </dd>
              </div>
            </dl>
            <p class="outcome">{{ study.outcome }}</p>
          </div>
        </div>
      </article>

      <h3 v-reveal class="group-title">More projects</h3>
      <div class="more">
        <article v-for="item in moreWork" :key="item.name" v-reveal>
          <div class="card card--lift more__card">
            <p class="more__client">{{ item.client }}</p>
            <h4 class="more__name">{{ item.name }}</h4>
            <p class="more__summary">{{ item.summary }}</p>
            <p class="stack more__stack">
              <span v-for="tech in item.stack" :key="tech" class="tag">{{ tech }}</span>
            </p>
          </div>
        </article>
      </div>

      <p v-reveal class="foot">
        Want the full history?
        <a :href="resumeUrl" target="_blank" rel="noopener">Read my resume</a>
      </p>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import LogoTile from './LogoTile.vue'

// Company logos live in src/assets/images; data.json stores just the file name
const logoUrl = (file) => file && new URL(`../assets/images/${file}`, import.meta.url).href

const props = defineProps({
  positions: Array,
  caseStudies: Array,
  moreWork: Array,
  resumeUrl: String
})

// data.json lists today first; the path reads oldest to newest, left to right
const timeline = computed(() => [...props.positions].reverse())

const pathEl = ref(null)
const dotEls = []
const size = ref({ w: 0, h: 0 })
const curve = ref('')

// Draws a smooth curve through the dots, entering low on the left and leaving high on the right
const drawCurve = () => {
  const root = pathEl.value
  const dots = dotEls.filter(Boolean)
  if (!root || !dots.length || getComputedStyle(root.querySelector('.path__line')).display === 'none') {
    curve.value = ''
    return
  }
  const box = { width: root.offsetWidth, height: root.offsetHeight }
  // Layout offsets, not screen positions, so the fade-in movement doesn't skew the curve
  const points = dots.map((dot) => {
    let x = dot.offsetWidth / 2
    let y = dot.offsetHeight / 2
    for (let el = dot; el && el !== root; el = el.offsetParent) {
      x += el.offsetLeft
      y += el.offsetTop
    }
    return { x, y }
  })
  const first = points[0]
  const last = points[points.length - 1]
  const rise = points.length > 1 ? (first.y - last.y) / (points.length - 1) : 40
  points.unshift({ x: 0, y: first.y + rise * 0.6 })
  points.push({ x: box.width, y: Math.max(last.y - rise * 0.5, 4) })

  // Catmull-Rom spline turned into cubic Bezier segments
  let d = `M${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    // Keep handles between their own two points, so the line never loops back on itself
    const clampX = (x) => Math.min(Math.max(x, p1.x), p2.x)
    const c1 = { x: clampX(p1.x + (p2.x - p0.x) / 6), y: p1.y + (p2.y - p0.y) / 6 }
    const c2 = { x: clampX(p2.x - (p3.x - p1.x) / 6), y: p2.y - (p3.y - p1.y) / 6 }
    d += ` C${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`
  }
  size.value = { w: box.width, h: box.height }
  curve.value = d
}

let resizeObserver = null

onMounted(() => {
  drawCurve()
  resizeObserver = new ResizeObserver(drawCurve)
  resizeObserver.observe(pathEl.value)
})

onUnmounted(() => resizeObserver?.disconnect())
</script>

<style scoped>
/* ---------- Career path ---------- */
/* Positioned, so the dots' offsets are measured from here */
.path {
  position: relative;
  margin-top: 1rem;
  padding-top: 3rem;
}

.stops,
.stop {
  position: relative;
}

.path__line {
  position: absolute;
  inset: 0;
  overflow: visible;
  pointer-events: none;
}

.path__line path {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2;
  stroke-dasharray: 6 7;
  stroke-linecap: round;
  opacity: 0.55;
}

.stops {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Each later job sits higher, so the dots climb */
.stop {
  padding-top: calc(var(--rise) * 5.5rem);
}

.stop__dot {
  display: block;
  width: 0.875rem;
  height: 0.875rem;
  margin: 0 0 1.125rem calc(2.75rem - 0.4375rem);
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 5px var(--bg);
}

.stop--current .stop__dot {
  background: var(--highlight);
}

.stop__company {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.stop__role {
  margin-top: 0.25rem;
  font-weight: 500;
}

.stop__period {
  margin-top: 0.125rem;
  color: var(--muted);
  font-size: 0.9375rem;
}

.stop__detail {
  max-width: 18rem;
  margin-top: 0.5rem;
  color: var(--muted);
  font-size: 0.875rem;
}

/* The line draws itself from left to right, then each stop arrives in turn */
.reveal .path__line {
  clip-path: inset(0 100% 0 0);
}

.reveal .stop {
  opacity: 0;
  transform: translateY(12px);
}

.reveal--in .path__line {
  clip-path: inset(0 0 0 0);
  transition: clip-path 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
}

.reveal--in .stop {
  opacity: 1;
  transform: none;
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: calc(0.35s + var(--order) * 0.35s);
}

@media (prefers-reduced-motion: no-preference) {
  .stop--current .stop__dot {
    animation: pulse 2.4s ease-out infinite;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 5px var(--bg), 0 0 0 5px color-mix(in srgb, var(--highlight) 45%, transparent);
  }
  70%,
  100% {
    box-shadow: 0 0 0 5px var(--bg), 0 0 0 14px transparent;
  }
}

.group-title {
  margin-top: clamp(3.5rem, 7vw, 5rem);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.015em;
}

.site .group-lead {
  margin-top: 0.5rem;
  color: var(--muted);
  font-size: 1.0625rem;
}

.study-slot {
  margin-top: 1.5rem;
}

.study-slot:first-of-type {
  margin-top: 2rem;
}

.study {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  overflow: hidden;
  transition: box-shadow 0.25s ease, border-color 0.25s ease;
}

.study--flip {
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
}

.study--flip .study__text {
  order: 2;
}

.study__text {
  padding: clamp(1.5rem, 3vw, 2.25rem);
}

.study__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--muted);
  font-size: 0.875rem;
}

.study__title {
  margin-top: 0.75rem;
  font-size: clamp(1.25rem, 2.2vw, 1.5rem);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

h5 {
  margin: 1.25rem 0 0;
  color: var(--highlight);
  font-size: 0.875rem;
  font-weight: 600;
}

.study__body {
  margin-top: 0.25rem;
}

.steps {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.375rem;
  padding: 0;
  list-style: none;
}

.steps li {
  position: relative;
  padding-left: 1.625rem;
}

.steps svg {
  position: absolute;
  left: 0;
  top: 0.3125rem;
  color: var(--accent);
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 1.25rem;
}

.tag--plain {
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--rule);
  color: var(--muted);
  font-weight: 400;
}

.board {
  display: flex;
  flex-direction: column;
  padding: clamp(1.5rem, 3vw, 2.25rem);
  background: var(--panel);
  color: var(--panel-ink);
}

.board h5 {
  margin-top: 0;
  color: var(--panel-highlight);
}

.change {
  padding-block: 0.875rem;
  border-bottom: 1px solid var(--panel-rule);
}

.change dt {
  color: var(--panel-muted);
  font-size: 0.8125rem;
}

.change dd {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem 0.5rem;
  margin-top: 0.375rem;
}

.chip {
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: nowrap;
}

.chip--from {
  box-shadow: inset 0 0 0 1px var(--panel-field);
  color: var(--panel-muted);
}

.chip--to {
  background: var(--panel-accent);
  color: #0b211e;
  font-weight: 600;
}

/* Connecting line that draws itself when the card fades in */
.line {
  position: relative;
  flex: 1 1 1rem;
  min-width: 1rem;
  max-width: 3rem;
  height: 2px;
  background: var(--panel-highlight);
  transform-origin: left;
}


.reveal .line {
  transform: scaleX(0);
}

.reveal--in .line {
  transform: scaleX(1);
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) 0.35s;
}

.outcome {
  margin-top: auto;
  padding-top: 1.25rem;
  font-weight: 500;
  line-height: 1.4;
}

@media (hover: hover) {
  .study:hover {
    border-color: var(--accent);
    box-shadow: var(--shadow-hover);
  }
}

.more {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.more__card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
}

.more__client {
  color: var(--muted);
  font-size: 0.875rem;
}

.more__name {
  margin-top: 0.25rem;
  font-size: 1.1875rem;
  font-weight: 600;
  line-height: 1.3;
}

.more__summary {
  flex: 1;
  margin-top: 0.625rem;
  color: var(--muted);
}

.more__stack {
  margin-top: 1rem;
}

.site .foot {
  margin-top: 2rem;
  color: var(--muted);
}

/* Phones: a vertical dashed timeline, today on top */
@media (max-width: 860px) {
  .path {
    margin-top: 2rem;
    padding-top: 0;
  }

  .path__line {
    display: none;
  }

  .stops {
    display: flex;
    flex-direction: column-reverse;
    gap: 2.25rem;
    padding-left: 2rem;
  }

  .stops::before {
    content: '';
    position: absolute;
    left: 0.375rem;
    top: 0.75rem;
    bottom: 0.75rem;
    border-left: 2px dashed var(--accent);
    opacity: 0.55;
  }

  .stop {
    position: relative;
    padding-top: 0;
  }

  .stop__dot {
    position: absolute;
    left: -2rem;
    top: 0.9375rem;
    margin: 0;
  }

  .stop__detail {
    max-width: none;
  }
}

@media (max-width: 860px) {
  .study,
  .study--flip,
  .more {
    grid-template-columns: minmax(0, 1fr);
  }

  .study--flip .study__text {
    order: 0;
  }
}
</style>
