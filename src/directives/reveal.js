// Fades an element in the first time it scrolls into view
const prefersMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal--in')
      observer.unobserve(entry.target)
    }
  })
}, { rootMargin: '0px 0px -6% 0px' })

export default {
  mounted(el) {
    if (prefersMotion) {
      el.classList.add('reveal')
      observer.observe(el)
    }
  },
  unmounted(el) {
    observer.unobserve(el)
  }
}
