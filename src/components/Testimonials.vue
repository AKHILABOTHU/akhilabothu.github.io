<template>
  <section id="testimonials" class="py-5 bg-light">
    <div class="container">
      <!-- Heading -->
      <div class="text-center mb-5">
        <h2 class="display-4 fw-bold mb-3">
          <span class="gradient-text">Testimonials</span>
        </h2>
        <div class="mx-auto mb-4"
            style="width: 6rem; height: 0.25rem; background: linear-gradient(135deg, #667eea, #764ba2);">
        </div>
        <p class="lead text-muted">What others say about working with me</p>
      </div>

      <!-- Carousel -->
      <div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item" :class="{ active: index === 0 }"
              v-for="(testimonial, index) in testimonials" :key="index">
            <div class="text-center px-4">
              <blockquote class="blockquote">
                <p class="fs-5 fst-italic">"{{ testimonial.quote }}"</p>
              </blockquote>
              <footer class="blockquote-footer">
                {{ testimonial.author }}
                <a :href="testimonial.linkedin" target="_blank" class="ms-2">
                  <i class="fab fa-linkedin fa-lg text-primary"></i>
                </a>
              </footer>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel"
            data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#testimonialCarousel"
            data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  testimonials: Array
})
</script>

<style scoped>
.carousel-inner {
  padding: 2rem 0;
  min-height: 200px;
}

.carousel-item {
  padding: 2rem 0;
}
</style>

