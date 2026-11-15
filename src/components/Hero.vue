<template>
  <section id="home" class="hero">
    <div class="wrap hero__inner">
      <div class="hero__head">
        <h1>Hi, I'm {{ firstName }}.</h1>
        <p class="role">
          <span class="sr-only">{{ roles.join(', ') }}</span>
          <Transition name="roll" mode="out-in">
            <span :key="roleIndex" class="role__text" aria-hidden="true">{{ roles[roleIndex] }}</span>
          </Transition>
        </p>
      </div>

      <div class="portrait">
        <img :src="profileImage" :alt="`Portrait of ${fullName}`" width="288" height="288">
      </div>

      <div class="hero__body">
        <p class="summary">{{ profileSummary }}</p>
        <p class="currently"><span class="dot" aria-hidden="true"></span>{{ currently }}</p>
        <div class="actions">
          <!-- Bootstrap Icons: briefcase, envelope, file-earmark-text (MIT) -->
          <a class="button" href="#experience">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5" />
            </svg>
            See my work
          </a>
          <a class="button button--ghost" href="#contact">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>
            Contact me
          </a>
          <a class="text-link" :href="resumeUrl" target="_blank" rel="noopener">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
              <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
            </svg>
            View Resume
          </a>
        </div>
      </div>
    </div>

    <div class="wrap">
      <dl class="stats">
        <div v-for="stat in stats" :key="stat.label" class="stat">
          <dt>{{ stat.label }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  roles: Array,
  profileSummary: String,
  currently: String,
  fullName: String,
  profileImage: String,
  resumeUrl: String,
  stats: Array
})

const firstName = computed(() => props.fullName.split(' ')[0])

const roleIndex = ref(0)

let timer = null

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    timer = setInterval(() => {
      roleIndex.value = (roleIndex.value + 1) % props.roles.length
    }, 3200)
  }
})

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.hero {
  position: relative;
  /* The stats card straddles the bottom edge of the green area */
  background: linear-gradient(var(--panel), var(--panel)) top / 100% calc(100% - 2.75rem) no-repeat;
  color: var(--panel-ink);
  --accent: var(--panel-ink);
}

.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 14rem;
  grid-template-areas:
    'head portrait'
    'body portrait';
  grid-template-rows: auto 1fr;
  column-gap: 4rem;
  padding-block: clamp(2.25rem, 5vw, 3.5rem);
}

.hero__head {
  grid-area: head;
}

.hero__body {
  grid-area: body;
}

.hero h1 {
  font-size: clamp(2.25rem, 4.4vw, 3.5rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.025em;
}

.hero .role {
  min-height: 1.6em;
  margin-top: 0.5rem;
  color: var(--panel-highlight);
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  font-weight: 500;
}

.role__text {
  display: inline-block;
}

.roll-enter-active,
.roll-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.roll-enter-from {
  opacity: 0;
  transform: translateY(0.5em);
}

.roll-leave-to {
  opacity: 0;
  transform: translateY(-0.5em);
}

.hero .summary {
  max-width: 38rem;
  margin-top: 1.125rem;
  font-size: 1.125rem;
}

.hero .currently {
  display: flex;
  gap: 0.625rem;
  max-width: 38rem;
  margin-top: 0.875rem;
  color: var(--panel-muted);
  font-size: 0.9375rem;
}

.dot {
  flex: none;
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 50%;
  background: var(--panel-accent);
  animation: pulse 2.4s ease-in-out infinite;
}

@keyframes pulse {
  50% {
    box-shadow: 0 0 0 5px rgba(159, 220, 201, 0.2);
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.site .button,
.site .text-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.site .button {
  padding: 0.625rem 1.25rem;
  border: 1px solid var(--panel-highlight);
  border-radius: 6px;
  background: var(--panel-highlight);
  color: #1d1503;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

.site .button--ghost {
  border-color: var(--panel-field);
  background: transparent;
  color: var(--panel-ink);
  font-weight: 500;
}

.site .button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.site .button--ghost:hover {
  border-color: var(--panel-ink);
  background: rgba(255, 255, 255, 0.08);
}

.site .text-link {
  padding-inline: 0.25rem;
  color: var(--panel-ink);
  font-weight: 500;
}



.portrait {
  position: relative;
  grid-area: portrait;
  align-self: center;
  justify-self: end;
  width: 100%;
  margin-right: 0.75rem;
}

/* Offset block behind the photo */
.portrait::before {
  content: '';
  position: absolute;
  inset: 0.75rem -0.75rem -0.75rem 0.75rem;
  border-radius: 10px;
  background: var(--panel-highlight);
}

.portrait img {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid var(--rule);
  border-radius: 10px;
  background: var(--surface);
  color: var(--ink);
  box-shadow: var(--shadow-hover);
}

.stat {
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
}

.stat + .stat {
  border-left: 1px solid var(--rule);
}

.stat dd {
  color: var(--highlight);
  font-size: clamp(1.625rem, 3vw, 2.25rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.stat dt {
  margin-top: 0.25rem;
  color: var(--muted);
  font-size: 0.9375rem;
  line-height: 1.3;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

.hero__head,
.hero__body,
.portrait,
.stats {
  animation: rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
}

.portrait { animation-delay: 0.1s; }
.hero__body { animation-delay: 0.14s; }
.stats { animation-delay: 0.26s; }

/* Text and photo stay side by side on phones too */
@media (max-width: 760px) {
  .hero__inner {
    grid-template-columns: minmax(0, 1fr) 6.5rem;
    grid-template-rows: auto auto;
    grid-template-areas:
      'head portrait'
      'body body';
    align-items: center;
    column-gap: 1.25rem;
    padding-block: 2rem 1.75rem;
  }

  .portrait {
    margin-right: 0.5rem;
  }

  .portrait::before {
    inset: 0.5rem -0.5rem -0.5rem 0.5rem;
  }

  .hero .summary {
    margin-top: 1.5rem;
    font-size: 1.0625rem;
  }

  .stat {
    padding: 0.875rem;
  }

  .stat dt {
    font-size: 0.8125rem;
  }
}
</style>
