<template>
  <section id="skills" class="py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="display-4 fw-bold mb-3">
          Skills & <span class="gradient-text">Expertise</span>
        </h2>
        <div class="mx-auto mb-4"
            style="width: 6rem; height: 0.25rem; background: linear-gradient(135deg, #667eea, #764ba2);">
        </div>
        <p class="lead text-muted">
          A comprehensive overview of my technical skills and proficiency levels
        </p>
      </div>

      <!-- Skill Categories -->
      <div class="row g-4 mb-5">
        <!-- Backend Skills -->
        <div class="col-lg-4">
          <div class="card card-hover border-0 shadow-sm h-100">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <div class="skill-category-icon backend-icon">
                  <i class="fas fa-server"></i>
                </div>
                <h4 class="fw-bold">Backend</h4>
              </div>
              <div v-for="skill in backendSkills" :key="skill.name" class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="fw-medium">{{ skill.name }}</span>
                  <span class="small fw-bold" :class="skill.textColor">{{ skill.percentage }}%</span>
                </div>
                <div class="progress">
                  <div class="progress-bar skill-bar" :class="skill.bgColor"
                      :style="{ width: animateSkills ? skill.percentage + '%' : '0%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Frontend Skills -->
        <div class="col-lg-4">
          <div class="card card-hover border-0 shadow-sm h-100">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <div class="skill-category-icon frontend-icon">
                  <i class="fas fa-palette"></i>
                </div>
                <h4 class="fw-bold">Frontend</h4>
              </div>
              <div v-for="skill in frontendSkills" :key="skill.name" class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="fw-medium">{{ skill.name }}</span>
                  <span class="small fw-bold" :class="skill.textColor">{{ skill.percentage }}%</span>
                </div>
                <div class="progress">
                  <div class="progress-bar skill-bar" :class="skill.bgColor"
                      :style="{ width: animateSkills ? skill.percentage + '%' : '0%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Database & AI Skills -->
        <div class="col-lg-4">
          <div class="card card-hover border-0 shadow-sm h-100">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <div class="skill-category-icon database-icon">
                  <i class="fas fa-database"></i>
                </div>
                <h4 class="fw-bold">Database & AI</h4>
              </div>
              <div v-for="skill in databaseAISkills" :key="skill.name" class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <span class="fw-medium">{{ skill.name }}</span>
                  <span class="small fw-bold" :class="skill.textColor">{{ skill.percentage }}%</span>
                </div>
                <div class="progress">
                  <div class="progress-bar skill-bar" :class="skill.bgColor"
                      :style="{ width: animateSkills ? skill.percentage + '%' : '0%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Recommendation Button -->
      <div class="text-center">
        <button @click="getAIRecommendation" class="btn btn-lg px-4 py-3 rounded-pill fw-semibold"
            style="background: linear-gradient(135deg, #a55eea, #26d0ce); border: none; color: white;">
          <i class="fas fa-magic me-2"></i>
          Get AI-Powered Learning Recommendation
        </button>

        <div v-if="skillRecommendation" class="mt-4">
          <div class="ai-recommendation mx-auto" style="max-width: 48rem;">
            <div class="d-flex">
              <div class="me-3">
                <div class="rounded-circle d-flex align-items-center justify-content-center"
                    style="width: 3rem; height: 3rem; background: linear-gradient(135deg, #a55eea, #26d0ce);">
                  <i class="fas fa-robot text-white"></i>
                </div>
              </div>
              <div>
                <h5 class="fw-bold mb-2 text-primary">
                  <i class="fas fa-lightbulb me-2"></i>
                  AI Learning Recommendation
                </h5>
                <p class="mb-0">{{ skillRecommendation }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue'

const props = defineProps({
  backendSkills: Array,
  frontendSkills: Array,
  databaseAISkills: Array,
  animateSkills: Boolean
})

const skillRecommendation = ref('')

const getAIRecommendation = () => {
  const recommendations = [
    "Based on your strong Java and Vue.js skills, I recommend exploring Spring WebFlux for reactive programming and Nuxt.js for server-side rendering to enhance your full-stack capabilities.",
    "Your AI interest is promising! Consider diving deeper into LangChain for building AI applications and exploring vector databases like Pinecone for advanced RAG implementations.",
    "To complement your backend expertise, learning Docker Swarm or Kubernetes would be valuable for container orchestration, and exploring GraphQL could enhance your API development skills.",
    "Your frontend skills are solid! Consider learning TypeScript for better code maintainability and exploring modern state management solutions like Pinia for Vue.js applications.",
    "Given your database experience, learning about time-series databases like InfluxDB and exploring database optimization techniques would add significant value to your skill set."
  ]
  skillRecommendation.value = recommendations[Math.floor(Math.random() * recommendations.length)]
}
</script>

<style scoped>
.progress-bar {
  transition: width 2s ease-in-out;
}
</style>

