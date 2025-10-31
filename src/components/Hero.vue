<template>
  <section class="hero-section d-flex align-items-center gradient-bg mesh-bg">
    <div class="hero-overlay"></div>

    <div class="container position-relative">
      <div class="row align-items-center">
        <!-- Profile Picture Section -->
        <div class="col-lg-5 d-flex justify-content-center order-1 mb-4 mb-lg-0">
          <div class="position-relative">
            <!-- Floating Profile Card -->
            <div class="floating glass-card p-4" style="max-width: 20rem;">
              <!-- Profile Image -->
              <div class="text-center mb-4">
                <div class="position-relative d-inline-block">
                  <div class="rounded-circle p-2 shadow-lg"
                      style="width: 12rem; height: 12rem; background: linear-gradient(135deg, #667eea, #764ba2);">
                    <div
                        class="w-100 h-100 rounded-circle bg-white d-flex align-items-center justify-content-center overflow-hidden">
                      <img :src="profileImage" alt="Profile" class="rounded-circle"
                          style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Tech Icons -->
            <div class="floating-icon floating-icon-1 animate-pulse-slow">
              <i class="fab fa-java fs-4"></i>
            </div>
            <div class="floating-icon floating-icon-2 animate-pulse-slow" style="animation-delay: 1s;">
              <i class="fab fa-vuejs fs-4"></i>
            </div>
            <div class="floating-icon floating-icon-3 animate-pulse-slow" style="animation-delay: 2s;">
              <i class="fas fa-robot"></i>
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="col-lg-7 text-white fade-in-up order-2 text-center text-lg-start">
          <div class="mb-4">
            <span class="badge bg-light bg-opacity-10 text-white px-3 py-2 rounded-pill">
              🚀 Available for new opportunities
            </span>
          </div>
          <h1 class="display-1 fw-bold mb-4">
            Hi, I'm <span class="text-warning">{{ firstName }}</span>
          </h1>
          <div class="display-5 mb-4 text-info text-center text-lg-start" style="height: 5rem;">
            <div class="typewriter">{{ currentRole }}</div>
          </div>
          <p class="lead mb-4 text-light">
            {{ profileSummary }}
          </p>

          <!-- Contact Info Pills -->
          <div class="d-flex flex-wrap justify-content-center justify-content-lg-start mb-4">
            <div class="contact-pill">
              <i class="fas fa-map-marker-alt text-warning"></i>
              <span>{{ location }}</span>
            </div>
            <div class="contact-pill">
              <i class="fas fa-envelope text-warning"></i>
              <span>{{ email }}</span>
            </div>
            <div class="contact-pill">
              <i class="fas fa-phone text-warning"></i>
              <span>{{ phone }}</span>
            </div>
          </div>

          <!-- Buttons -->
          <div class="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mb-5">
            <!-- Download Resume Button (Modal Trigger) -->
            <button type="button" class="btn btn-gradient px-4 py-3 rounded-pill" data-bs-toggle="modal"
                data-bs-target="#resumeModal">
              <i class="fas fa-download me-2"></i>
              Download Resume
            </button>

            <!-- Connect Button -->
            <button @click="scrollToSection('contact')"
                class="btn btn-outline-light px-4 py-3 rounded-pill">
              Let's Connect
            </button>
          </div>

          <!-- Resume Download Modal -->
          <div class="modal fade" id="resumeModal" tabindex="-1" aria-labelledby="resumeModalLabel"
              aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header border-0">
                  <h5 class="modal-title text-light" id="resumeModalLabel">Choose Resume Format</h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                      aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                  <p class="text-white-50 mb-4">Select a format to download:</p>
                  <a :href="resumeHtml" target="_blank" class="btn btn-outline-primary me-3">
                    <i class="fas fa-code me-2"></i> HTML
                  </a>
                  <button @click="downloadPDF" class="btn btn-outline-danger">
                    <i class="fas fa-file-pdf me-2"></i> PDF
                  </button>
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
import { ref, onMounted, defineProps, defineEmits } from 'vue'

const props = defineProps({
  firstName: String,
  location: String,
  email: String,
  phone: String,
  profileSummary: String,
  profileImage: String,
  resumeHtml: String,
  resumePdf: String
})

const emit = defineEmits(['scroll-to-section'])

const currentRole = ref('Full Stack Developer')

const scrollToSection = (sectionId) => {
  emit('scroll-to-section', sectionId)
}

const downloadPDF = async () => {
  try {
    // Show loading message
    if (window.Swal) {
      window.Swal.fire({
        title: 'Generating PDF...',
        html: 'Please wait while we generate your resume PDF.',
        allowOutsideClick: false,
        didOpen: () => {
          window.Swal.showLoading()
        }
      })
    }
    
    if (window.html2pdf) {
      // Open the HTML resume in a hidden iframe
      const iframe = document.createElement('iframe')
      iframe.style.position = 'fixed'
      iframe.style.right = '0'
      iframe.style.bottom = '0'
      iframe.style.width = '800px'
      iframe.style.height = '1056px' // letter size height
      iframe.style.border = 'none'
      iframe.src = props.resumeHtml
      document.body.appendChild(iframe)
      
      // Wait for iframe to load
      await new Promise((resolve) => {
        iframe.onload = resolve
        // Timeout after 5 seconds
        setTimeout(resolve, 5000)
      })
      
      try {
        // Wait a bit more for fonts and styles to load
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Get the iframe document
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
        const element = iframeDoc.body
        
        // Configure PDF options
        const opt = {
          margin: [0.2, 0.2, 0.2, 0.2],
          filename: 'Akhil_Abothu_Resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2, 
            useCORS: true, 
            letterRendering: true,
            windowWidth: 800
          },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }
        
        // Generate and download PDF
        await window.html2pdf().set(opt).from(element).save()
        
        // Clean up
        document.body.removeChild(iframe)
        
        // Show success message
        if (window.Swal) {
          await window.Swal.fire({
            icon: 'success',
            title: 'PDF Generated!',
            text: 'Your resume PDF has been downloaded successfully.',
            confirmButtonColor: '#3085d6'
          })
        }
      } catch (error) {
        // Clean up on error
        document.body.removeChild(iframe)
        throw error
      }
    } else {
      // Fallback: open HTML resume for manual print
      window.open(props.resumeHtml, '_blank')
      if (window.Swal) {
        await window.Swal.fire({
          icon: 'info',
          title: 'Opening Resume',
          html: 'The resume will open in a new tab. Use your browser\'s Print to PDF option.',
          confirmButtonColor: '#3085d6'
        })
      }
    }
  } catch (error) {
    console.error('PDF generation error:', error)
    if (window.Swal) {
      await window.Swal.fire({
        icon: 'error',
        title: 'PDF Generation Failed',
        html: 'There was an error generating the PDF. Please try:<br>1. Download the HTML version<br>2. Open it in your browser<br>3. Use Print to PDF',
        confirmButtonColor: '#d33'
      })
    }
  }
}

onMounted(() => {
  const roles = [
    'Full Stack Developer',
    'Java Spring Expert',
    'Vue.js Specialist',
    'AI Enthusiast',
    'Problem Solver'
  ]
  let currentIndex = 0
  currentRole.value = roles[currentIndex]
  setInterval(() => {
    currentIndex = (currentIndex + 1) % roles.length
    currentRole.value = roles[currentIndex]
  }, 3000)
})
</script>

<style scoped>
.badge {
  display: inline-block;
}
</style>

