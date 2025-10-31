<template>
  <section id="experience" class="py-5" :class="darkMode ? 'bg-dark' : 'bg-light'">
    <div class="container">
      <div class="text-center mb-5" :class="darkMode ? 'text-white' : 'text-dark'">
        <h2 class="display-4 fw-bold mb-3">
          Work <span class="gradient-text">Experience</span>
        </h2>
        <div class="mx-auto mb-4"
            style="width: 60px; height: 4px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 2px;">
        </div>
        <p class="lead" :class="darkMode ? 'text-white' : 'text-dark'">My professional journey and key achievements</p>
      </div>

      <div class="timeline">
        <div class="row" v-for="(pair, index) in experiencePairs" :key="index">
          <div class="col-lg-6 timeline-item" v-if="pair.left">
            <div class="timeline-content">
              <div class="card-body p-4" :class="darkMode ? 'text-light' : ''">
                <div class="d-flex align-items-center mb-3">
                  <div
                      class="rounded-circle d-flex align-items-center justify-content-center me-3 experience-icon">
                    <i :class="pair.left.icon" class="text-white fs-4"></i>
                  </div>
                  <div>
                    <h5 class="fw-bold mb-1" :class="darkMode ? 'text-white' : ''">{{ pair.left.position }}</h5>
                    <h6 class="company-name mb-0 fw-semibold">{{ pair.left.company }}</h6>
                    <small :class="darkMode ? 'text-light' : 'text-muted'" v-if="pair.left.client">Client: {{ pair.left.client }}</small>
                    <small :class="darkMode ? 'text-light' : 'text-muted'" class="d-block" v-if="pair.left.project">Project: {{ pair.left.project }}</small>
                  </div>
                </div>

                <div class="mb-3">
                  <small :class="darkMode ? 'text-light' : 'text-muted'">
                    <i class="fas fa-calendar me-1"></i> {{ pair.left.duration }}
                  </small>
                  <small :class="darkMode ? 'text-light' : 'text-muted'" class="ms-3">
                    <i class="fas fa-map-marker-alt me-1"></i> {{ pair.left.location }}
                  </small>
                </div>

                <p :class="darkMode ? 'text-light' : 'text-muted'" class="mb-3">{{ pair.left.description }}</p>

                <div class="mb-3">
                  <h6 class="fw-semibold mb-2" :class="darkMode ? 'text-white' : ''">Key Achievements:</h6>
                  <ul class="list-unstyled mb-0">
                    <li v-for="achievement in pair.left.achievements" :key="achievement">
                      <i class="fas fa-check-circle text-success me-2"></i>
                      <small :class="darkMode ? 'text-light' : ''">{{ achievement }}</small>
                    </li>
                  </ul>
                </div>

                <div>
                  <h6 class="fw-semibold mb-2 small" :class="darkMode ? 'text-white' : ''">Technologies Used:</h6>
                  <div class="d-flex flex-wrap gap-1">
                    <span v-for="tech in pair.left.technologies" :key="tech"
                        class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1 small">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 timeline-item right" v-if="pair.right">
            <div class="timeline-content">
              <div class="card-body p-4" :class="darkMode ? 'text-light' : ''">
                <div class="d-flex align-items-center mb-3">
                  <div
                      class="rounded-circle d-flex align-items-center justify-content-center me-3 experience-icon">
                    <i :class="pair.right.icon" class="text-white fs-4"></i>
                  </div>
                  <div>
                    <h5 class="fw-bold mb-1" :class="darkMode ? 'text-white' : ''">{{ pair.right.position }}</h5>
                    <h6 class="company-name mb-0 fw-semibold">{{ pair.right.company }}</h6>
                    <small :class="darkMode ? 'text-light' : 'text-muted'" v-if="pair.right.client">Client: {{ pair.right.client }}</small>
                    <small :class="darkMode ? 'text-light' : 'text-muted'" class="d-block" v-if="pair.right.project">Project: {{ pair.right.project }}</small>
                  </div>
                </div>

                <div class="mb-3">
                  <small :class="darkMode ? 'text-light' : 'text-muted'">
                    <i class="fas fa-calendar me-1"></i> {{ pair.right.duration }}
                  </small>
                  <small :class="darkMode ? 'text-light' : 'text-muted'" class="ms-3">
                    <i class="fas fa-map-marker-alt me-1"></i> {{ pair.right.location }}
                  </small>
                </div>

                <p :class="darkMode ? 'text-light' : 'text-muted'" class="mb-3">{{ pair.right.description }}</p>

                <div class="mb-3">
                  <h6 class="fw-semibold mb-2" :class="darkMode ? 'text-white' : ''">Key Achievements:</h6>
                  <ul class="list-unstyled mb-0">
                    <li v-for="achievement in pair.right.achievements" :key="achievement">
                      <i class="fas fa-check-circle text-success me-2"></i>
                      <small :class="darkMode ? 'text-light' : ''">{{ achievement }}</small>
                    </li>
                  </ul>
                </div>

                <div>
                  <h6 class="fw-semibold mb-2 small" :class="darkMode ? 'text-white' : ''">Technologies Used:</h6>
                  <div class="d-flex flex-wrap gap-1">
                    <span v-for="tech in pair.right.technologies" :key="tech"
                        class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-1 small">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  darkMode: Boolean,
  experiences: Array
})

const experiencePairs = computed(() => {
  const pairs = []
  for (let i = 0; i < props.experiences.length; i += 2) {
    pairs.push({
      left: props.experiences[i],
      right: props.experiences[i + 1] || null
    })
  }
  return pairs
})
</script>

<style scoped>
.timeline-item {
  animation: fadeInUp 0.6s ease-out forwards;
}

.dark-theme .timeline-content {
  background: #2d2d2d !important;
  color: #ffffff;
}

.dark-theme .timeline-content .fw-bold,
.dark-theme .timeline-content .fw-semibold,
.dark-theme .timeline-content h5,
.dark-theme .timeline-content h6 {
  color: #ffffff !important;
}

.dark-theme .timeline-content small {
  color: #cccccc !important;
}
</style>

