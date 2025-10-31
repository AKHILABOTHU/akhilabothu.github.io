<script setup>
import { ref, computed, onMounted } from 'vue'
import Navigation from './components/Navigation.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Skills from './components/Skills.vue'
import Experience from './components/Experience.vue'
import Testimonials from './components/Testimonials.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import Loader from './components/Loader.vue'
import profileImage from './assets/images/me.jpg'
import portfolioData from './assets/data/data.json'

const loading = ref(true)
const darkMode = ref(false)
const animateSkills = ref(false)
const data = ref(portfolioData)

// Initialize on mount
onMounted(async () => {
  try {
    data.value = portfolioData
    
    // Remove hash from URL if present on page load
    if (window.location.hash) {
      const hash = window.location.hash.substring(1)
      history.replaceState(null, '', window.location.pathname + window.location.search)
      
      // Scroll to the section after a short delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
    
    // Prevent hash routing on page navigation
    window.addEventListener('hashchange', (e) => {
      e.preventDefault()
      const hash = window.location.hash.substring(1)
      if (hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search)
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    })
    
    // Initialize dark mode based on preference
    darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Listen for dark mode preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      darkMode.value = e.matches
    })

    // Initialize EmailJS
    if (window.emailjs) {
      window.emailjs.init("lmtctuRbX4cLaf5JL")
    }

    // Set up skills animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkills.value = true
        }
      })
    })

    setTimeout(() => {
      const skillsSection = document.getElementById('skills')
      if (skillsSection) {
        observer.observe(skillsSection)
      }
      loading.value = false
    }, 500)
  } catch (error) {
    console.error('Failed to initialize:', error)
    loading.value = false
  }
})

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    // Remove hash from URL first
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Detect if we're in development
const isDevelopment = computed(() => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname === ''
})

const sendMessage = async (formData) => {
  // Skip reCAPTCHA validation in development, or validate if available
  if (!isDevelopment.value) {
    if (!window.grecaptcha) {
      await Swal.fire({
        icon: 'warning',
        title: 'Please verify',
        text: 'Please confirm you are not a robot.',
        confirmButtonColor: '#f0ad4e'
      })
      return
    }

    try {
      const recaptchaResponse = window.grecaptcha.getResponse()
      if (!recaptchaResponse || recaptchaResponse === '') {
        await Swal.fire({
          icon: 'warning',
          title: 'Please verify',
          text: 'Please confirm you are not a robot.',
          confirmButtonColor: '#f0ad4e'
        })
        return
      }
    } catch (error) {
      console.warn('reCAPTCHA error:', error)
      // Continue without validation if reCAPTCHA fails
    }
  }

  const { name, email, subject, message } = formData

  if (!name || !email || !subject || !message) {
    await Swal.fire({
      icon: 'warning',
      title: 'All fields are required!',
      text: 'Please fill out every field before submitting.',
      confirmButtonColor: '#f0ad4e'
    })
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    await Swal.fire({
      icon: 'error',
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
      confirmButtonColor: '#d33'
    })
    return
  }

  const templateParams = { name, email, subject, message }

  try {
    if (window.emailjs) {
      await window.emailjs.send("service_mg3q0ne", "template_929eyue", templateParams)
      await Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for reaching out. I will get back to you soon.',
        confirmButtonColor: '#3085d6'
      })
      // Emit form reset to Contact component
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        const resetEvent = new CustomEvent('reset-form')
        contactSection.dispatchEvent(resetEvent)
      }
    }
  } catch (error) {
    console.error("EmailJS error:", error)
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong while sending the message.',
      confirmButtonColor: '#d33'
    })
  }
}

const experienceYears = computed(() => {
  if (!data.value) return 0
  const startDate = new Date("2017-10-13")
  const today = new Date()
  const diffYears = today.getFullYear() - startDate.getFullYear()
  const monthDiff = today.getMonth() - startDate.getMonth()
  return monthDiff < 0 ? diffYears - 1 : diffYears
})

const firstName = computed(() => {
  if (!data.value) return ''
  return data.value.fullName.split(' ')[0]
})

const resumeHtml = '/assets/pages/akhil_abothu.html'
const resumePdf = '/assets/pages/akhil_abothu.pdf'
</script>

<template>
  <div :class="{ 'dark-theme': darkMode }">
    <Loader :loading="loading" />
    
    <div v-if="data">
      <Navigation 
        :full-name="data.fullName" 
        :dark-mode="darkMode"
        @toggle-dark-mode="toggleDarkMode"
        @scroll-to="scrollToSection"
      />
      
      <Hero
        :first-name="firstName"
        :location="data.location"
        :email="data.email"
        :phone="data.phone"
        :profile-summary="data.profileSummary"
        :profile-image="profileImage"
        :resume-html="resumeHtml"
        :resume-pdf="resumePdf"
        @scroll-to-section="scrollToSection"
      />
      
      <About
        :dark-mode="darkMode"
        :experience-years="experienceYears"
        :projects-completed="data.projectsCompleted"
        :certifications-count="data.certificationsCount"
        :role="data.role"
      />
      
      <Skills
        :backend-skills="data.backendSkills"
        :frontend-skills="data.frontendSkills"
        :database-a-i-skills="data.databaseAISkills"
        :animate-skills="animateSkills"
      />
      
      <Experience
        :dark-mode="darkMode"
        :experiences="data.experiences"
      />
      
      <Testimonials
        :testimonials="data.testimonials"
      />
      
      <Contact
        :location="data.location"
        :email="data.email"
        :phone="data.phone"
        @send-message="sendMessage"
      />
      
      <Footer
        :dark-mode="darkMode"
        :full-name="data.fullName"
      />
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
</style>
