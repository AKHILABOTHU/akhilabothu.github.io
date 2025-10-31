<template>
  <section id="about" class="py-5" :class="darkMode ? 'bg-dark' : 'bg-light'">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="display-4 fw-bold mb-3" :class="darkMode ? 'text-white' : 'text-dark'">
          About <span class="gradient-text">Me</span>
        </h2>
        <div class="mx-auto mb-4"
            style="width: 6rem; height: 0.25rem; background: linear-gradient(135deg, #667eea, #764ba2);">
        </div>
      </div>

      <div class="row">
        <!-- Main About Content -->
        <div class="col-lg-8">
          <div class="card card-hover h-100 border-0 shadow-sm">
            <div class="card-body p-4">
              <h4 class="card-title mb-4">
                <i class="fas fa-user-tie text-primary me-3"></i>
                Professional Journey
              </h4>
              <div class="fs-6 text-muted">
                <p class="mb-3">
                  With <strong>{{ experienceYears }}+ years</strong> of experience in software
                  development, I've evolved from a curious computer science graduate to a seasoned
                  full-stack developer with a passion for cutting-edge technologies.
                </p>
                <p class="mb-3">
                  My expertise spans across <strong>Java Spring Boot</strong> for robust backend
                  architectures and <strong>Vue.js</strong> for dynamic frontend experiences.
                  Recently, I've been diving deep into the world of <strong>Generative
                      AI</strong>, exploring how artificial intelligence can transform business
                  solutions.
                </p>
                <p class="mb-0">
                  I believe in writing clean, scalable code and building applications that not
                  only meet business requirements but also provide exceptional user experiences.
                  My goal is to bridge the gap between traditional development and AI-powered
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Side Stats & Skills -->
        <div class="col-lg-4">
          <div class="row g-3">
            <!-- Quick Stats -->
            <div class="col-12">
              <div class="card card-hover border-0 shadow-sm">
                <div class="card-body p-4">
                  <h5 class="card-title mb-3">
                    <i class="fas fa-chart-line text-success me-2"></i>
                    Quick Stats
                  </h5>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Experience</span>
                    <span class="fw-bold text-primary">{{ experienceYears }}+ Years</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Projects</span>
                    <span class="fw-bold text-success">{{ projectsCompleted }}+</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="text-muted">Certifications</span>
                    <span class="fw-bold" style="color: #a55eea;">{{ certificationsCount }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted">Current Role</span>
                    <span class="fw-bold text-success">{{ role }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Work Focus -->
            <div class="col-12">
              <div class="card card-hover border-0 shadow-sm">
                <div class="card-body p-4">
                  <h5 class="card-title mb-3">
                    <i class="fas fa-bullseye text-danger me-2"></i>
                    Work Focus
                  </h5>
                  <div class="mb-2">
                    <div class="d-flex align-items-center">
                      <div class="bg-primary rounded-circle me-3"
                          style="width: 0.75rem; height: 0.75rem;"></div>
                      <span class="text-muted">Backend Development</span>
                    </div>
                  </div>
                  <div class="mb-2">
                    <div class="d-flex align-items-center">
                      <div class="bg-success rounded-circle me-3"
                          style="width: 0.75rem; height: 0.75rem;"></div>
                      <span class="text-muted">Frontend Development</span>
                    </div>
                  </div>
                  <div class="mb-2">
                    <div class="d-flex align-items-center">
                      <div class="rounded-circle me-3"
                          style="width: 0.75rem; height: 0.75rem; background-color: #a55eea;">
                      </div>
                      <span class="text-muted">AI Integration</span>
                    </div>
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
  experienceYears: [String, Number],
  projectsCompleted: Number,
  certificationsCount: Number,
  role: String
})
</script>

<style scoped>
.card {
  transition: all 0.3s ease;
}
</style>

