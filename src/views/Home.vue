<script setup>
import { ref, computed } from 'vue'
import Navigation from '../components/Navigation.vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Skills from '../components/Skills.vue'
import Experience from '../components/Experience.vue'
import Awards from '../components/Awards.vue'
import Certifications from '../components/Certifications.vue'
import Testimonials from '../components/Testimonials.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
import profileImage from '../assets/images/me.jpg'
import data from '../assets/data/data.json'

const darkMode = ref(document.documentElement.getAttribute('data-theme') === 'dark')

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  const theme = darkMode.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem('theme', theme)
  } catch (error) {
    // Storage can be blocked; the theme still applies for this visit
  }
}

const experienceYears = computed(() => {
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000
  return Math.floor((Date.now() - new Date(data.careerStart)) / msPerYear)
})

const stats = computed(() => [
  { value: `${experienceYears.value}+`, label: 'years of experience' },
  ...data.stats
])
</script>

<template>
  <div class="site">
    <a class="skip-link" href="#main">Skip to content</a>

    <Navigation
      :full-name="data.fullName"
      :dark-mode="darkMode"
      @toggle-dark-mode="toggleDarkMode"
    />

    <main id="main">
      <Hero
        :roles="data.roles"
        :profile-summary="data.profileSummary"
        :currently="data.currently"
        :full-name="data.fullName"
        :profile-image="profileImage"
        :resume-url="data.resumeUrl"
        :stats="stats"
      />
      <About
        :story="data.story"
        :principles="data.principles"
        :journey="data.journey"
      />
      <Skills :skills="data.skills" />
      <Experience
        :positions="data.positions"
        :case-studies="data.caseStudies"
        :more-work="data.moreWork"
        :resume-url="data.resumeUrl"
      />
      <Awards :awards="data.awards" />
      <Certifications :certifications="data.certifications" />
      <Testimonials :testimonials="data.testimonials" />
      <Contact
        :location="data.location"
        :email="data.email"
        :phone="data.phone"
        :links="data.links"
      />
    </main>

    <Footer :full-name="data.fullName" />
  </div>
</template>
