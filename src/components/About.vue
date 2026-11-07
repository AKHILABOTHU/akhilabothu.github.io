<template>
  <section id="about" class="section">
    <div class="wrap">
      <div class="intro">
        <h2 v-reveal class="section__title">From my first API to enterprise modernization</h2>
        <div v-reveal class="story">
          <p v-for="paragraph in story" :key="paragraph">{{ paragraph }}</p>
        </div>
      </div>

      <div class="principles">
        <div v-for="principle in principles" :key="principle.title" v-reveal>
          <div class="card card--lift principle">
            <h3>{{ principle.title }}</h3>
            <p>{{ principle.text }}</p>
          </div>
        </div>
      </div>

      <ol v-reveal class="journey" aria-label="Career milestones">
        <li v-for="step in journey" :key="step.year + step.title" class="milestone">
          <span class="milestone__year">{{ step.year }}</span>
          <span class="milestone__title">{{ step.title }}</span>
          <span class="milestone__detail">{{ step.detail }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
defineProps({
  story: Array,
  principles: Array,
  journey: Array
})
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
  gap: 1.25rem;
  margin-top: 3.5rem;
}

.principle {
  height: 100%;
  padding: 1.5rem;
  border-top: 3px solid var(--accent);
}

h3 {
  font-size: 1.1875rem;
  font-weight: 600;
  line-height: 1.3;
}

.principle p {
  margin-top: 0.5rem !important;
  color: var(--muted);
}

.journey {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1.25rem;
  margin: 4rem 0 0;
  padding: 0;
  list-style: none;
}

.milestone {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 1.25rem;
  border-top: 2px solid var(--rule);
}

/* Marker sitting on the timeline */
.milestone::before {
  content: '';
  position: absolute;
  left: 0;
  top: -7px;
  width: 12px;
  height: 12px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  background: var(--bg);
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.milestone__year {
  color: var(--highlight);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
}

.milestone__title {
  margin-top: 0.375rem;
  font-weight: 500;
  line-height: 1.3;
}

.milestone__detail {
  margin-top: 0.25rem;
  color: var(--muted);
  font-size: 0.875rem;
  line-height: 1.4;
}

@media (hover: hover) {
  .milestone:hover::before {
    background: var(--accent);
    transform: scale(1.25);
  }
}

@media (max-width: 960px) {
  .intro,
  .principles {
    grid-template-columns: minmax(0, 1fr);
  }

  .journey {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
    margin-left: 0.375rem;
  }

  .milestone {
    padding: 0 0 1.75rem 1.5rem;
    border-top: 0;
    border-left: 2px solid var(--rule);
  }

  .milestone::before {
    left: -7px;
    top: 0.25rem;
  }

  .milestone:last-child {
    padding-bottom: 0;
  }
}
</style>
