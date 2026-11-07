<template>
  <section id="experience" class="section">
    <div class="wrap">
      <h2 v-reveal class="section__title">Experience</h2>

      <ol class="positions">
        <li v-for="position in positions" :key="position.company" v-reveal class="position-slot">
          <div class="card card--lift position" :class="{ 'position--current': position.current }">
            <div class="position__head">
              <LogoTile :src="position.logo" :monogram="position.monogram" />
              <span v-if="position.current" class="tag">Current</span>
            </div>
            <p class="position__period">{{ position.period }}</p>
            <h3 class="position__company">{{ position.company }}</h3>
            <p class="position__role">{{ position.role }}</p>
            <p class="position__detail">{{ position.detail }}</p>
          </div>
        </li>
      </ol>

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
        <a :href="resumeUrl" target="_blank" rel="noopener">Read my résumé</a>
      </p>
    </div>
  </section>
</template>

<script setup>
import LogoTile from './LogoTile.vue'

defineProps({
  positions: Array,
  caseStudies: Array,
  moreWork: Array,
  resumeUrl: String
})
</script>

<style scoped>
.positions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
  margin: 2.5rem 0 0;
  padding: 0;
  list-style: none;
}

.position {
  height: 100%;
  padding: 1.5rem;
}

.position--current {
  border-top: 3px solid var(--accent);
}

.position__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.position__period {
  margin-top: 0.875rem;
  color: var(--muted);
  font-size: 0.875rem;
}

.position__company {
  margin-top: 0.125rem;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
}

.position__role {
  margin-top: 0.125rem;
  font-weight: 500;
}

.position__detail {
  margin-top: 0.375rem;
  color: var(--muted);
  font-size: 0.9375rem;
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

/* Connector that draws itself when the card fades in */
.line {
  position: relative;
  flex: 1 1 1rem;
  min-width: 1rem;
  max-width: 3rem;
  height: 2px;
  background: var(--panel-highlight);
  transform-origin: left;
}

.line::after {
  content: '';
  position: absolute;
  right: 0;
  top: -3px;
  width: 8px;
  height: 8px;
  border-top: 2px solid var(--panel-highlight);
  border-right: 2px solid var(--panel-highlight);
  transform: rotate(45deg);
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

@media (max-width: 860px) {
  .positions,
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
