<template>
  <section id="awards" class="py-5" :class="darkMode ? 'bg-dark' : 'bg-light'">
    <div class="container">
      <div class="text-center mb-5" :class="darkMode ? 'text-white' : 'text-dark'">
        <h2 class="display-4 fw-bold mb-3">
          Awards & <span class="gradient-text">Recognition</span>
        </h2>
        <div class="mx-auto mb-4"
            style="width: 60px; height: 4px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 2px;">
        </div>
        <p class="lead" :class="darkMode ? 'text-white-50' : 'text-muted'">
          Honors and milestones achieved during my professional career
        </p>
      </div>

      <div class="row g-4 justify-content-center">
        <div v-for="(award, index) in awards" :key="index" class="col-md-6 col-lg-5">
          <div class="card h-100 border-0 shadow-sm card-hover p-4"
               :class="darkMode ? 'bg-secondary bg-opacity-10 text-light' : 'bg-white'">
            <div class="d-flex align-items-start">
              <div class="icon-box rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                   style="width: 3.5rem; height: 3.5rem; background: linear-gradient(135deg, #f6d365, #fda085);">
                <i class="fas fa-trophy text-white fs-4"></i>
              </div>
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h5 class="fw-bold mb-0" :class="darkMode ? 'text-white' : 'text-dark'">{{ award.title }}</h5>
                  <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1 small">{{ award.year }}</span>
                </div>
                <h6 class="text-muted small mb-2">
                  <i class="fas fa-building me-1 text-primary"></i>{{ award.organization }}
                </h6>
                <p class="mb-0 small" :class="darkMode ? 'text-light' : 'text-muted'">{{ award.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  darkMode: Boolean,
  awards: Array
})
</script>

<style scoped>
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12) !important;
}

.dark-theme .card-hover:hover {
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.05) !important;
}
</style>
