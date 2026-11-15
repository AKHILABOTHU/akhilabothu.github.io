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
            <div class="cf-turnstile" data-sitekey="0x4AAAAAAGBi2XlSTSJ8bZM2"></div>
            <div class="submit field--full">
              <button type="submit" :disabled="sending">{{ sending ? 'Sending…' : 'Send message' }}</button>
              <p class="status" :class="{ 'status--error': status.isError }" role="status">{{ status.text }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  location: String,
  email: String,
  phone: String,
  links: Array
})

const contactForm = ref({ name: '', email: '', subject: '', message: '' })
const sending = ref(false)
const status = ref({ text: '', isError: false })

onMounted(() => {
  if (window.emailjs) {
    window.emailjs.init('hUJLzTdVhvcFPW0_r')
  }
})

const showError = (text) => {
  status.value = { text, isError: true }
}

const sendMessage = async () => {
  status.value = { text: '', isError: false }

  const { name, email, subject, message } = contactForm.value
  if (![name, email, subject, message].every((value) => value.trim())) {
    showError('Please fill in every field.')
    return
  }

  if (!window.emailjs) {
    showError(`The message could not be sent. Please email me at ${props.email}.`)
    return
  }

  sending.value = true
  try {
    await window.emailjs.send('service_06up8g3', 'template_mkt70qk', { name, email, subject, message })
    contactForm.value = { name: '', email: '', subject: '', message: '' }
    status.value = { text: 'Thank you. Your message has been sent.', isError: false }
  } catch (error) {
    console.error('EmailJS error:', error)
    showError(`The message could not be sent. Please email me at ${props.email}.`)
  } finally {
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

.status {
  flex: 1 1 14rem;
  font-size: 0.9375rem;
}

.status--error {
  color: #ffc9b8;
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
