<template>
  <section id="awards" class="section section--compact section--alt">
    <div class="wrap">
      <h2 v-reveal class="section__title">Awards</h2>

      <div class="awards">
        <div v-for="award in awards" :key="award.title" v-reveal>
          <div class="card card--lift award">
            <p class="year">{{ award.year }}</p>
            <div>
              <h3>{{ award.title }}</h3>
              <p class="organization">{{ award.organization }}</p>
              <p class="description">{{ award.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  awards: Array
})
</script>

<style scoped>
.awards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.award {
  display: flex;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;
}

.year {
  flex: none;
  color: var(--highlight);
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

h3 {
  font-size: 1.1875rem;
  font-weight: 600;
  line-height: 1.3;
}

.organization {
  margin-top: 0.125rem;
  font-size: 0.9375rem;
  font-weight: 500;
}

.description {
  margin-top: 0.5rem;
  color: var(--muted);
}

@media (max-width: 720px) {
  .awards {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
