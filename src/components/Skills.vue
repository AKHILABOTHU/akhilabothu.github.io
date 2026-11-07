<template>
  <section id="skills" class="section section--alt">
    <div class="wrap">
      <h2 v-reveal class="section__title">What I work with</h2>
      <p v-reveal class="section__lead">
        The full stack, from database to interface, plus what it takes to ship and run it.
      </p>

      <div class="groups">
        <div v-for="skill in skills" :key="skill.group" v-reveal>
          <div class="card card--lift group">
            <h3>{{ skill.group }}</h3>
            <ul class="tools">
              <li v-for="tool in skill.tools" :key="tool.name" class="tool">
                <span class="tool__logo">
                  <img :src="`${iconBase}/${tool.icon}.svg`" alt="" width="28" height="28" loading="lazy">
                </span>
                {{ tool.name }}
              </li>
            </ul>
            <p class="also">{{ skill.also }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
defineProps({
  skills: Array
})

const iconBase = 'https://cdn.jsdelivr.net/npm/devicon@2.16.0/icons'
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

.tools {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 1.125rem !important;
  padding: 0;
  list-style: none;
}

.tool {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  line-height: 1.25;
  text-align: center;
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
