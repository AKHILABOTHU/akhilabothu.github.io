<template>
  <section id="certifications" class="section section--compact">
    <div class="wrap">
      <h2 v-reveal class="section__title">Certifications</h2>

      <ul class="certs">
        <li v-for="cert in certifications" :key="cert.title" v-reveal>
          <div class="card card--lift cert">
            <LogoTile :src="cert.logo" :monogram="cert.organization[0]" />
            <span class="cert__title">{{ cert.title }}</span>
            <span class="cert__org">{{ cert.organization }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import LogoTile from './LogoTile.vue'

defineProps({
  certifications: Array
})
</script>

<style scoped>
.certs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: start;
  gap: 1.25rem;
  margin-top: 1.5rem;
  padding: 0;
  list-style: none;
}

.cert {
  display: flex;
  flex-direction: column;
  padding: 1rem 1.25rem;
  border-top: 3px solid var(--accent);
}

.cert__title {
  margin-top: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
}

.cert__org {
  margin-top: 0.375rem;
  color: var(--muted);
  font-size: 0.875rem;
}

@media (max-width: 860px) {
  .certs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .certs {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
