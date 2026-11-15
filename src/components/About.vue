<template>
  <section id="about" class="section">
    <div class="wrap">
      <div class="intro">
        <h2 v-reveal class="section__title">From my first API to enterprise modernization</h2>
        <div v-reveal class="story">
          <p v-for="paragraph in story" :key="paragraph">{{ paragraph }}</p>
        </div>
      </div>

      <!-- One panel split into three, so the row stays short and even -->
      <ul v-reveal class="card principles">
        <li v-for="principle in principles" :key="principle.title" class="principle">
          <span class="principle__icon">
            <svg :class="`bi bi-${principle.icon}`" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path v-for="d in icons[principle.icon]" :key="d" :d="d" />
            </svg>
          </span>
          <div>
            <h3>{{ principle.title }}</h3>
            <p>{{ principle.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
defineProps({
  story: Array,
  principles: Array
})

// Bootstrap Icons (MIT), named by each principle's "icon" in data.json
const icons = {
  layers: ['M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0zM8 9.433 1.562 6 8 2.567 14.438 6z'],
  'shield-check': [
    'M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56',
    'M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0'
  ],
  people: ['M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4']
}
</script>

<style scoped>
.intro {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 2rem clamp(2rem, 5vw, 4.5rem);
}

.story {
  display: grid;
  gap: 1rem;
  font-size: 1.0625rem;
}

.principles {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 3rem 0 0;
  padding: 0;
  list-style: none;
}

.principle {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1.375rem 1.5rem;
}

.principle + .principle {
  border-left: 1px solid var(--rule);
}

.principle__icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background: var(--tint);
  color: var(--accent);
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.2, 0.7, 0.2, 1);
}

@media (hover: hover) {
  .principle:hover .principle__icon {
    background: var(--accent);
    color: var(--bg);
    transform: translateY(-2px);
  }
}

h3 {
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.3;
}

.principle p {
  margin-top: 0.25rem !important;
  color: var(--muted);
  font-size: 0.9375rem;
  line-height: 1.5;
}

@media (max-width: 960px) {
  .intro,
  .principles {
    grid-template-columns: minmax(0, 1fr);
  }

  .principle + .principle {
    border-left: 0;
    border-top: 1px solid var(--rule);
  }
}
</style>
