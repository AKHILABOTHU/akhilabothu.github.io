<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-custom">
    <div class="container">
      <a class="navbar-brand fw-bold fs-4 gradient-text" href="javascript:void(0)" @click.prevent="scrollToTop">
        {{ fullName }}
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click.prevent="scrollTo('about')">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click.prevent="scrollTo('skills')">Skills</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click.prevent="scrollTo('experience')">Experience</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click.prevent="scrollTo('contact')">Contact</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click.prevent="scrollTo('dev-diary')">DevDiary</a>
          </li>
          <li class="nav-item">
            <button @click="toggleDarkMode" class="btn btn-outline-secondary rounded-circle ms-2">
              <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  fullName: String,
  darkMode: Boolean
})

const emit = defineEmits(['toggle-dark-mode', 'scroll-to'])

const toggleDarkMode = () => {
  emit('toggle-dark-mode')
}

const scrollTo = (sectionId) => {
  emit('scroll-to', sectionId)
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style scoped>
.navbar-toggler {
  border-color: rgba(0, 0, 0, 0.1);
}

.dark-theme .navbar-toggler {
  border-color: rgba(255, 255, 255, 0.1);
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.dark-theme .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
</style>

