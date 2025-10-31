<template>
  <div id="loader" v-if="loading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  loading: Boolean
})
</script>

<style scoped>
#loader {
  position: fixed;
  inset: 0;
  background-color: white;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dark-theme #loader {
  background-color: #1a1a1a;
}
</style>

