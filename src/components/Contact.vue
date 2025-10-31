<template>
  <section id="contact" class="py-5 gradient-bg">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="display-4 fw-bold mb-3 text-white">
          Let's <span class="text-warning">Connect</span>
        </h2>
        <div class="mx-auto mb-4"
            style="width: 6rem; height: 0.25rem; background: linear-gradient(135deg, #ffd700, #ff8c00);">
        </div>
        <p class="lead text-light">
          Ready to bring your ideas to life? Let's discuss your next project!
        </p>
      </div>

      <div class="row">
        <!-- Contact Form -->
        <div class="col-lg-8 mx-auto">
          <div class="glass-card p-4">
            <form @submit.prevent.stop="sendMessage">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label text-white fw-semibold">
                    <i class="fas fa-user me-2"></i>
                    Full Name
                  </label>
                  <input v-model="contactForm.name" type="text"
                      class="form-control form-control-lg" placeholder="Your full name" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label text-white fw-semibold">
                    <i class="fas fa-envelope me-2"></i>
                    Email Address
                  </label>
                  <input v-model="contactForm.email" type="email"
                      class="form-control form-control-lg" placeholder="your.email@example.com"
                      required>
                </div>
                <div class="col-12">
                  <label class="form-label text-white fw-semibold">
                    <i class="fas fa-tag me-2"></i>
                    Subject
                  </label>
                  <input v-model="contactForm.subject" type="text"
                      class="form-control form-control-lg" placeholder="What's this about?"
                      required>
                </div>
                <div class="col-12">
                  <label class="form-label text-white fw-semibold">
                    <i class="fas fa-comment me-2"></i>
                    Message
                  </label>
                  <textarea v-model="contactForm.message" class="form-control" rows="5"
                      placeholder="Tell me about your project or idea..." required></textarea>
                </div>
                <!-- Centered Google reCAPTCHA -->
                <div v-if="showRecaptcha" class="d-flex justify-content-center my-3">
                  <div class="g-recaptcha"
                      :key="`recaptcha-${recaptchaSiteKey}`"
                      :data-sitekey="recaptchaSiteKey"></div>
                </div>
                <div class="col-12 text-center">
                  <button type="submit" class="btn btn-gradient btn-lg px-5 py-3 rounded-pill">
                    <i class="fas fa-paper-plane me-2"></i>
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Contact Info Cards -->
      <div class="row g-4 mt-5">
        <div class="col-md-4">
          <div class="glass-card p-4 text-center">
            <div class="mb-3">
              <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                  style="width: 4rem; height: 4rem; background: linear-gradient(135deg, #ff6b6b, #ee5a24);">
                <i class="fas fa-map-marker-alt text-white fs-4"></i>
              </div>
            </div>
            <h5 class="text-white fw-bold mb-2">Location</h5>
            <p class="text-light mb-0">{{ location }}</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="glass-card p-4 text-center">
            <div class="mb-3">
              <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                  style="width: 4rem; height: 4rem; background: linear-gradient(135deg, #26d0ce, #1a9be6);">
                <i class="fas fa-envelope text-white fs-4"></i>
              </div>
            </div>
            <h5 class="text-white fw-bold mb-2">Email</h5>
            <p class="text-light mb-0">
              <a :href="`mailto:${email}`" class="text-light text-decoration-none">{{ email }}</a>
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="glass-card p-4 text-center">
            <div class="mb-3">
              <div class="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                  style="width: 4rem; height: 4rem; background: linear-gradient(135deg, #a55eea, #fd79a8);">
                <i class="fas fa-phone text-white fs-4"></i>
              </div>
            </div>
            <h5 class="text-white fw-bold mb-2">Phone</h5>
            <p class="text-light mb-0">
              <a :href="`tel:${phone}`" class="text-light text-decoration-none">{{ phone }}</a>
            </p>
          </div>
        </div>
      </div>

      <!-- Social Links -->
      <div class="text-center mt-5">
        <h5 class="text-white fw-bold mb-3">Follow Me</h5>
        <div class="d-flex justify-content-center gap-3">
          <a href="https://www.linkedin.com/in/akhil-abothu/" target="_blank"
              class="btn btn-outline-light rounded-circle" style="width: 3rem; height: 3rem;">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/AKHILABOTHU/" target="_blank"
              class="btn btn-outline-light rounded-circle" style="width: 3rem; height: 3rem;">
            <i class="fab fa-github"></i>
          </a>
          <a href="https://www.instagram.com/developerdiarieshq/" target="_blank"
              class="btn btn-outline-light rounded-circle" style="width: 3rem; height: 3rem;">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  location: String,
  email: String,
  phone: String
})

const emit = defineEmits(['send-message', 'form-reset'])

const contactForm = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const resetForm = () => {
  contactForm.value = { name: '', email: '', subject: '', message: '' }
  // Reset reCAPTCHA if available
  if (window.grecaptcha) {
    try {
      window.grecaptcha.reset()
    } catch (error) {
      // Silently fail
    }
  }
}

onMounted(() => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.addEventListener('reset-form', resetForm)
  }
})

onUnmounted(() => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.removeEventListener('reset-form', resetForm)
  }
})

// Detect if we're in development (localhost)
const isDevelopment = computed(() => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname === ''
})

// Use test key for development, production key for production
// Google test key always passes on localhost: 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI
const recaptchaSiteKey = computed(() => {
  if (isDevelopment.value) {
    // Google's test key that always passes on localhost
    return '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  }
  // Production key - replace with your actual production key
  return '6LdZnoUrAAAAANwP2oXJ0X5mNINaARMipJDReelZ'
})

const showRecaptcha = computed(() => {
  // You can also disable reCAPTCHA entirely in development by returning false
  return true
})

const sendMessage = (event) => {
  // Prevent default form submission
  if (event) {
    event.preventDefault()
    event.stopPropagation()
  }
  emit('send-message', { ...contactForm.value })
  // Don't reset form here - let parent handle success first
}
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
}
</style>

