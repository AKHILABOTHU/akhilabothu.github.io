<template>
  <section id="contact" class="contact">
    <div class="wrap section">
      <h2 v-reveal class="section__title">Let's talk.</h2>
      <div>
        <p v-reveal class="lede">
          Have a role or a project in mind? Email me directly, or send a message here.
        </p>

        <div class="columns">
          <dl class="details">
            <div>
              <dt>Email</dt>
              <dd><a :href="`mailto:${email}`">{{ email }}</a></dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a :href="`tel:${phone.replace(/\s/g, '')}`">{{ phone }}</a></dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{{ location }}</dd>
            </div>
            <div>
              <dt>Elsewhere</dt>
              <dd v-for="link in links" :key="link.url">
                <a :href="link.url" target="_blank" rel="noopener">{{ link.label }}</a>
              </dd>
            </div>
          </dl>

          <form class="form" @submit.prevent="sendMessage">
            <div class="field">
              <label for="contact-name">Name</label>
              <input id="contact-name" v-model="contactForm.name" type="text" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="contact-email">Email</label>
              <input id="contact-email" v-model="contactForm.email" type="email" autocomplete="email" required>
            </div>
            <div class="field field--full">
              <label for="contact-subject">Subject</label>
              <input id="contact-subject" v-model="contactForm.subject" type="text" required>
            </div>
            <div class="field field--full">
              <label for="contact-message">Message</label>
              <textarea id="contact-message" v-model="contactForm.message" rows="5" required></textarea>
            </div>

            <div ref="recaptchaEl" class="recaptcha field--full"></div>

            <div class="submit field--full">
              <button type="submit" :disabled="sending">{{ sending ? 'Sending…' : 'Send message' }}</button>
            </div>

            <!-- Always present, so screen readers announce new messages -->
            <div class="notice-region field--full" aria-live="polite">
              <Transition name="notice">
                <div v-if="status.type" :key="status.type + status.text" class="notice" :class="`notice--${status.type}`">
                  <span class="notice__icon" aria-hidden="true">
                    <svg v-if="status.type === 'success'" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path class="notice__check" d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                    <svg v-else-if="status.type === 'warning'" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M10.3 3.9L2.4 17.6A2 2 0 0 0 4.1 20.6h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                      <path d="M12 9.5v4" />
                      <path d="M12 17h.01" />
                    </svg>
                    <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 7l10 10" />
                      <path d="M17 7L7 17" />
                    </svg>
                  </span>
                  <div>
                    <p class="notice__title">{{ status.title }}</p>
                    <p class="notice__text">{{ status.text }}</p>
                  </div>
                </div>
              </Transition>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  location: String,
  email: String,
  phone: String,
  links: Array
})

const contactForm = ref({ name: '', email: '', subject: '', message: '' })
const sending = ref(false)
// type is 'success', 'warning' (something to fix in the form) or 'error' (sending failed)
const status = ref({ type: '', title: '', text: '' })
const recaptchaEl = ref(null)

// reCAPTCHA v2 checkbox. EmailJS verifies the token with the secret key in the template settings.
// Google's test key always passes on localhost, but EmailJS will reject its tokens.
const isDevelopment = ['localhost', '127.0.0.1', ''].includes(window.location.hostname)
const recaptchaSiteKey = isDevelopment
  ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  : '6LdZnoUrAAAAANwP2oXJ0X5mNINaARMipJDReelZ'

let recaptchaWidget = null
let recaptchaTimer = null
let recaptchaObserver = null

const loadRecaptcha = () => {
  const script = document.createElement('script')
  script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
  script.async = true
  document.head.append(script)

  // The script loads asynchronously, so wait until it can render
  recaptchaTimer = setInterval(() => {
    if (window.grecaptcha?.render) {
      clearInterval(recaptchaTimer)
      recaptchaWidget = window.grecaptcha.render(recaptchaEl.value, {
        sitekey: recaptchaSiteKey,
        theme: 'dark'
      })
    }
  }, 200)
}

onMounted(() => {
  if (window.emailjs) {
    window.emailjs.init('hUJLzTdVhvcFPW0_r')
  }

  // Only visitors who reach the form need reCAPTCHA, so don't slow down the page for everyone
  recaptchaObserver = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      recaptchaObserver.disconnect()
      loadRecaptcha()
    }
  }, { rootMargin: '300px 0px' })
  recaptchaObserver.observe(recaptchaEl.value)
})

onUnmounted(() => {
  clearInterval(recaptchaTimer)
  recaptchaObserver.disconnect()
})

const setStatus = (type, title, text) => {
  status.value = { type, title, text }
}

const showError = (text) => {
  setStatus('error', 'Your message wasn’t sent', text)
}

const showWarning = (text) => {
  setStatus('warning', 'One more step', text)
}

const sendMessage = async () => {
  setStatus('', '', '')

  const { name, email, subject, message } = contactForm.value
  if (![name, email, subject, message].every((value) => value.trim())) {
    showWarning('Please fill in every field.')
    return
  }

  if (recaptchaWidget === null) {
    showError(`The verification check did not load. Please email me at ${props.email}.`)
    return
  }

  const token = window.grecaptcha.getResponse(recaptchaWidget)
  if (!token) {
    showWarning('Please tick “I’m not a robot” before sending.')
    return
  }

  if (!window.emailjs) {
    showError(`The message could not be sent. Please email me at ${props.email}.`)
    return
  }

  sending.value = true
  try {
    await window.emailjs.send('service_06up8g3', 'template_mkt70qk', {
      name,
      email,
      subject,
      message,
      'g-recaptcha-response': token
    })
    contactForm.value = { name: '', email: '', subject: '', message: '' }
    setStatus('success', `Thanks, ${name.trim().split(' ')[0]}! Your message is on its way.`, `I’ll get back to you at ${email.trim()} as soon as I can.`)
  } catch (error) {
    console.error('EmailJS error:', error)
    showError(`Something went wrong on my side. Please try again, or email me at ${props.email}.`)
  } finally {
    // Each token can only be used once
    window.grecaptcha.reset(recaptchaWidget)
    sending.value = false
  }
}
</script>

<style scoped>
.contact {
  background: var(--panel);
  color: var(--panel-ink);
  --accent: var(--panel-ink);
}

.lede {
  max-width: 34rem;
  margin-top: 0.75rem !important;
  color: var(--panel-muted);
  font-size: 1.125rem;
}

.columns {
  display: grid;
  grid-template-columns: 14rem minmax(0, 1fr);
  gap: 3rem;
  margin-top: 2.75rem;
}

.details {
  display: grid;
  align-content: start;
  gap: 1.25rem;
}

dt,
label {
  color: var(--panel-muted);
  font-size: 0.875rem;
}

dd {
  overflow-wrap: anywhere;
}

.form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.field--full {
  grid-column: 1 / -1;
}

.recaptcha {
  min-height: 78px;
}

/* The reCAPTCHA checkbox has a fixed 304px width */
@media (max-width: 340px) {
  .recaptcha {
    transform: scale(0.92);
    transform-origin: left top;
  }
}

label {
  display: block;
  margin-bottom: 0.25rem;
}

input,
textarea {
  display: block;
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--panel-field);
  border-radius: 3px;
  background: transparent;
  color: var(--panel-ink);
  font: inherit;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

input:hover,
textarea:hover {
  border-color: var(--panel-ink);
}

input:focus,
textarea:focus {
  background: rgba(255, 255, 255, 0.05);
}

textarea {
  resize: vertical;
}

input:focus,
textarea:focus {
  border-color: var(--panel-ink);
  outline: 1px solid var(--panel-ink);
  outline-offset: 0;
}

.submit {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.25rem;
}

button {
  padding: 0.6875rem 1.25rem;
  border: 0;
  border-radius: 3px;
  background: var(--panel-highlight);
  color: #1d1503;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.28);
}

button:disabled {
  opacity: 0.7;
  cursor: default;
}

button:focus-visible {
  outline-color: var(--panel-ink);
}

.notice-region:empty {
  display: none;
}

.notice {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1rem 1.125rem;
  border: 1px solid;
  border-radius: 8px;
}

.notice--success {
  border-color: rgba(159, 220, 201, 0.45);
  background: rgba(159, 220, 201, 0.1);
}

.notice--warning {
  border-color: rgba(242, 182, 84, 0.5);
  background: rgba(242, 182, 84, 0.1);
}

.notice--error {
  border-color: rgba(255, 201, 184, 0.5);
  background: rgba(255, 201, 184, 0.1);
}

.notice__icon {
  display: grid;
  flex: none;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  color: #0b211e;
}

.notice--success .notice__icon {
  background: var(--panel-accent);
}

.notice--warning .notice__icon {
  background: var(--panel-highlight);
}

.notice--error .notice__icon {
  background: #ffc9b8;
}

.notice__title {
  font-weight: 600;
  line-height: 1.35;
}

.notice__text {
  margin-top: 0.125rem;
  color: var(--panel-muted);
  font-size: 0.9375rem;
  overflow-wrap: anywhere;
}

.notice-enter-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.notice-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

/* The tick draws itself once the card appears */
.notice__check {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  animation: draw-check 0.45s ease 0.2s forwards;
}

@keyframes draw-check {
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .notice__check {
    stroke-dashoffset: 0;
    animation: none;
  }
}

@media (max-width: 860px) {
  .columns {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 560px) {
  .form {
    grid-template-columns: minmax(0, 1fr);
  }
}

</style>
