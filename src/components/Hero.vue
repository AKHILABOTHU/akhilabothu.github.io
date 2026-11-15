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
          <a class="button" href="#experience">
            See my work
          </a>
          <a class="button button--ghost" href="#contact">Contact me</a>
          <a class="text-link" :href="resumeUrl" target="_blank" rel="noopener">View Resume</a>
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

.site .button {
  display: inline-block;
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
