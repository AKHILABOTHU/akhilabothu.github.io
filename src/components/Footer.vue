<template>
  <footer class="py-4" :class="darkMode ? 'bg-dark' : 'bg-light'">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="mb-0" :class="darkMode ? 'text-light' : 'text-muted'">
            © {{ currentYear }} {{ fullName }}. All rights reserved.
          </p>
        </div>
        <div class="col-md-6 text-md-end">
          <p class="mb-0" :class="darkMode ? 'text-light' : 'text-muted'">
            Built with ❤️ using Vue.js & Bootstrap
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  darkMode: Boolean,
  fullName: String
})

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.dark-theme footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>

