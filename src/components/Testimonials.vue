<template>
  <section id="recommendations" class="section section--alt">
    <div class="wrap">
      <h2 v-reveal class="section__title">What colleagues say</h2>

      <div class="quotes">
        <div
          v-for="(testimonial, index) in ordered"
          :key="testimonial.name"
          v-reveal
          class="quote-slot"
          :class="{ 'quote-slot--lead': index === 0 }"
        >
          <figure class="card card--lift quote" :class="{ 'quote--lead': index === 0 }">
            <div>
              <blockquote
                :ref="(el) => { quoteEls[testimonial.name] = el }"
                :class="{
                  'is-clamped': !expanded.has(testimonial.name),
                  'is-faded': !expanded.has(testimonial.name) && overflowing.has(testimonial.name)
                }"
              >
                <p v-for="(paragraph, line) in testimonial.quote" :key="line">
                  <template v-if="line === 0">“</template>{{ paragraph }}<template v-if="line === testimonial.quote.length - 1">”</template>
                </p>
              </blockquote>
              <button
                v-if="overflowing.has(testimonial.name) || expanded.has(testimonial.name)"
                type="button"
                class="toggle"
                :aria-expanded="expanded.has(testimonial.name)"
                @click="toggle(testimonial.name)"
              >
                {{ expanded.has(testimonial.name) ? 'Read less' : 'Read more' }}
              </button>
            </div>
            <figcaption>
              <span class="avatar" aria-hidden="true">{{ initials(testimonial.name) }}</span>
              <span>
                <a v-if="testimonial.linkedin" :href="testimonial.linkedin" target="_blank" rel="noopener">{{ testimonial.name }}</a>
                <span v-else class="person-name">{{ testimonial.name }}</span>
                <span class="person-title">{{ testimonial.title }}</span>
                <span class="person-title">{{ testimonial.relation }}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  testimonials: Array
})

const quoteEls = {}
const expanded = ref(new Set())
const overflowing = ref(new Set())

const initials = (name) => name.split(' ').slice(0, 2).map((part) => part[0]).join('')

const shuffle = (items) => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// One-line recommendations are too short to fill the large featured card
const canFeature = (testimonial) => testimonial.quote.length > 1

const readLastFeatured = () => {
  try {
    return localStorage.getItem('featuredTestimonial')
  } catch (error) {
    return null
  }
}

const saveFeatured = (name) => {
  try {
    localStorage.setItem('featuredTestimonial', name)
  } catch (error) {
    // Storage can be blocked; a quote may then repeat on the next visit
  }
}

const moveToFront = (items, chosen) => [chosen, ...items.filter((item) => item !== chosen)]

// A random order for each visit, never opening with the same quote as last time
const pickInitialOrder = () => {
  const shuffled = shuffle(props.testimonials)
  const lastFeatured = readLastFeatured()
  const featured = shuffled.find((item) => canFeature(item) && item.name !== lastFeatured)
    || shuffled.find(canFeature)
    || shuffled[0]
  saveFeatured(featured.name)
  return moveToFront(shuffled, featured)
}

const ordered = pickInitialOrder()

const toggle = (name) => {
  if (expanded.value.has(name)) {
    expanded.value.delete(name)
  } else {
    expanded.value.add(name)
  }
}

// Whether text is too long depends on the screen width, so measure it instead of counting words
const measure = () => {
  ordered.forEach(({ name }) => {
    const el = quoteEls[name]
    if (el && !expanded.value.has(name)) {
      if (el.scrollHeight > el.clientHeight + 2) {
        overflowing.value.add(name)
      } else {
        overflowing.value.delete(name)
      }
    }
  })
}

onMounted(() => {
  measure()
  document.fonts.ready.then(measure)
  window.addEventListener('resize', measure)
})

onUnmounted(() => window.removeEventListener('resize', measure))
</script>

<style scoped>
.quotes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  margin-top: 2.5rem;
}

.quote-slot--lead,
.quote-slot:last-child:nth-child(even) {
  grid-column: 1 / -1;
}

.quote {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
  height: 100%;
  padding: 1.5rem;
}

.quote--lead {
  padding: clamp(1.5rem, 4vw, 2.75rem);
  border-color: var(--panel);
  background: var(--panel);
  color: var(--panel-ink);
  --accent: var(--panel-highlight);
}

blockquote p + p {
  margin-top: 0.75rem;
}

/* The full text stays in the page for screen readers and search engines */
.is-clamped {
  max-height: calc(1.6em * 5);
  overflow: hidden;
}

.is-faded {
  -webkit-mask-image: linear-gradient(#000 60%, transparent);
  mask-image: linear-gradient(#000 60%, transparent);
}

.quote--lead blockquote {
  font-size: clamp(1.25rem, 2.4vw, 1.625rem);
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.quote--lead .is-clamped {
  max-height: calc(1.4em * 5);
}

.toggle {
  margin-top: 0.625rem;
  padding: 0.25rem 0;
  border: 0;
  background: none;
  color: var(--accent);
  font: inherit;
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 0.2em;
  cursor: pointer;
}

.quote--lead .person-title {
  color: var(--panel-muted);
}

figcaption {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.35;
}

figcaption a,
.person-name {
  font-weight: 500;
}

.avatar {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--tint);
  color: var(--accent);
  font-weight: 600;
}

.quote--lead .avatar {
  background: var(--panel-highlight);
  color: #1d1503;
}

.person-title {
  display: block;
  color: var(--muted);
}

@media print {
  .is-clamped {
    max-height: none;
    -webkit-mask-image: none;
    mask-image: none;
  }

  .toggle {
    display: none;
  }
}

@media (max-width: 720px) {
  .quotes {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
