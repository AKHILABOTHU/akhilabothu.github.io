<template>
  <span class="logo" :class="{ 'logo--cover': fit === 'cover' && src && !failed }">
    <img v-if="src && !failed" :src="src" alt="" loading="lazy" @error="failed = true">
    <span v-else class="logo__monogram" aria-hidden="true">{{ monogram }}</span>
  </span>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  src: String,
  monogram: String,
  // 'cover' fills the tile edge to edge, for logos that come with their own background
  fit: String
})

const failed = ref(false)
</script>

<style scoped>
/* White in both themes, because some logos are dark */
.logo {
  display: grid;
  grid-template: minmax(0, 1fr) / minmax(0, 1fr);
  flex: none;
  place-items: center;
  width: 5.5rem;
  height: 2.75rem;
  padding: 0.375rem 0.5rem;
  border: 1px solid var(--rule);
  border-radius: 8px;
  background: #ffffff;
}

.logo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.logo--cover {
  padding: 0;
  overflow: hidden;
}

.logo--cover img {
  object-fit: cover;
}

.logo__monogram {
  color: #0f5b4f;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}
</style>
