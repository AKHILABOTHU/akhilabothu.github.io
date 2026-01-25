<template>
  <div class="kids-theme-container">
    <!-- Background Moving Elements -->
    <div class="bg-pattern"></div>
    
    <div class="cards-scroll-snap">
      
      <!-- CARD 1: FUN ANIMATION & TITLE (70/30 Split) -->
      <section class="card-section playful-front">
        <!-- Top 70%: Animation Zone -->
        <div class="animation-zone">
          <div class="sky-bg"></div>
          
          <!-- Clouds -->
          <div class="cloud c1"></div>
          <div class="cloud c2"></div>
          <div class="cloud c3"></div>

          <!-- Hanging Decorations -->
          <div class="bunting-string">
            <div v-for="n in 12" :key="'flag'+n" class="flag" :style="flagStyle(n)"></div>
          </div>

          <!-- Floating Balloons -->
          <div class="balloons-group">
            <div v-for="n in 6" :key="'balloon'+n" class="balloon" :class="'b'+n">
              <div class="string"></div>
            </div>
          </div>

          <!-- Central Cake -->
          <div class="cake-stage">
            <div class="cake-stand"></div>
            <div class="cake-body">
              <div class="layer-bottom"></div>
              <div class="layer-middle"></div>
              <div class="layer-top"></div>
              <div class="frosting-drips"></div>
              <div class="candle-one">
                <div class="flame"></div>
              </div>
            </div>
            <div class="party-popper left">🎉</div>
            <div class="party-popper right">🎉</div>
          </div>

          <!-- Falling Confetti -->
          <div class="confetti-rain">
            <div v-for="n in 20" :key="'confetti'+n" class="confetti-piece" :style="confettiStyle(n)"></div>
          </div>

          <!-- Celestial System -->
          <div class="celestial-system">
            <div class="sun">☀️</div>
            <div class="orbit-earth">
              <div class="earth-container">
                <span class="earth">🌍</span>
                <div class="orbit-moon">
                  <div class="moon full-moon"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Trip Text Below Cake -->
          <div class="trip-text-container">
            <p class="trip-text">"First trip around the sun"</p>
          </div>

          <!-- Left Side Space Elements -->
          <div class="left-space-elements">
            <div class="planet-ringed">
              <div class="ring"></div>
            </div>
            <div class="astronaut-mini">🧑‍🚀</div>
            <div class="rocket-mini">🚀</div>
          </div>
        </div>

        <!-- Bottom 30%: Title & Invite -->
        <div class="title-zone">
          <div class="wave-divider">
            <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="#ffffff" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          
          <div class="content-text">
            <h3 class="subtitle">You are invited to</h3>
            <h1 class="kid-name-pop">Dhanvik's</h1>
            <div class="badge-1st">
              <span>1st</span>
            </div>
            <h2 class="heading-pop">Birthday Party!</h2>
            
            <div class="bounce-arrow">
              <p>Join the Celebration!</p>
              <i class="fas fa-arrow-down"></i>
            </div>
          </div>
        </div>
      </section>

      <!-- CARD 2: MESSAGE (Playful Style) -->
      <section class="card-section message-section">
        <div class="card-box playful-border">
          <div class="sticker-decor top-right">🎈</div>
          <div class="sticker-decor bottom-left">🧸</div>

          <div class="lang-tabs">
            <button v-for="lang in Object.keys(messages)" 
                    :key="lang" 
                    @click="currentLang = lang"
                    :class="{ active: currentLang === lang }">
              {{ lang }}
            </button>
          </div>
          
          <div ref="msgScrollRef" class="msg-scroll-area custom-scroll" @scroll="checkScroll">
             <p class="sweet-msg" style="white-space: pre-wrap;">{{ messages[currentLang] }}</p>
          </div>

          <div v-if="reachedBottom" class="next-hint" @click="scrollToNext">
            <small>Next</small>
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
      </section>

      <!-- CARD 3: DETAILS & MAP (Fun Icons) -->
      <section class="card-section details-section">
        <div class="card-box details-box">
          <h2 class="fun-header">Party Details 🎂</h2>
          
          <div class="fun-grid">
            <div class="fun-item">
              <div class="fun-icon calendar-sheet">
                <span class="cal-month">JAN</span>
                <span class="cal-day">28</span>
              </div>
              <div class="item-text">
                <label>When?</label>
                <strong>Jan 28, 2026</strong>
                <span>Wednesday</span>
              </div>
            </div>

            <div class="fun-item">
              <div class="fun-icon icon-time">⏰</div>
              <div class="item-text">
                <label>Time?</label>
                <strong>11:00 AM</strong>
                <span>Lunch Follows</span>
              </div>
            </div>

            <div class="fun-item full">
              <div class="fun-icon icon-loc">📍</div>
              <div class="item-text">
                <label>Where?</label>
                <strong>Nacharam (Village)</strong>
                <span>Dammepeta, Bhadradri-Kothagudem<br/></span>
                <span>Telangana - 507306</span>
              </div>
            </div>
          </div>

          <!-- Calendar Invite Button -->
          <div class="calendar-action" @click="saveToCalendar">
            <div class="cal-btn">
              <i class="fas fa-calendar-plus"></i>
              <span>Add to Calendar</span>
            </div>
          </div>

          <div class="map-rounded">
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.281881745494!2d80.87603754162598!3d17.233339832712034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3693246eb57529%3A0x6b4fb9b5d27eb7b9!2sNacharam%2C%20Telangana%20507306!5e0!3m2!1sen!2sin!4v1706118000000!5m2!1sen!2sin" 
               width="100%" 
               height="250" 
               style="border:0; display: block;" 
               allowfullscreen="" 
               loading="lazy"
             ></iframe>
          </div>

          <div class="signature-wrap">
            <div class="heart-pulse">❤️</div>
            <div class="signature">
               With Love...
               <h3 class="family-name">The Abothu Family</h3>
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- Music FAB -->
    <div class="music-btn" @click="toggleMusic" :class="{ playing: isPlaying }">
      🎵
    </div>
    <audio ref="audioRef" loop>
      <source src="/audio/hbd.mp3" type="audio/mpeg">
    </audio>

  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'

const currentLang = ref('telugu')
const isPlaying = ref(false)
const audioRef = ref(null)
const manualPause = ref(false)
const reachedBottom = ref(false)
const msgScrollRef = ref(null)

const messages = {
  english: `🧸✨ My First Birthday Invitation ✨🧸

Hello Everyone... 👶
I am your "Dhanvik Vijay Krishna Datta". This Wednesday, January 28, 2026, is my first birthday. This is my invitation to you all.

In this one year,
With a little smile,
I filled our home with light...
With tiny steps,
I changed my mom and dad's world 💕
Along with that, I did a lot of mischief 😄

In this year, I smiled a little,
Cried a little,
But every day
I wholeheartedly felt the love around me 💕

I turned every small milestone of mine
Into a sweet memory for my family.

In this beautiful journey,
My first birthday is a special day 🎂
I want to celebrate this day
Together with all of you 💙

Please come and
Bless me,
That would be the biggest gift I could receive 🎁✨

Yours,
With Love... 💕
Dhanvik Vijay Krishna Datta
(s/o Abothu Akhil & Tejaswi)`,
  telugu: `🧸✨ నా తొలి పుట్టినరోజు ఆహ్వానం ✨🧸

అందరికీ నమస్కారం … 👶
నేను మీ "ధన్విక్ విజయ్ కృష్ణ దత్త" ను , ఈ బుధవారం అనగా జనవరి 28, 2026 నా మొదటి పుట్టిన రోజు,  మీ అందరికీ ఇదే నా ఆహ్వానం. 

ఈ ఒక సంవత్సరంలో
ఒక చిన్న చిరునవ్వుతో
మా ఇంటిని మొత్తం వెలుగులతో నింపాను…
చిన్న అడుగులతో
నా అమ్మా నాన్నల ప్రపంచాన్ని మార్చేశాను 💕 దానితో పాటు 
చాలా అల్లరి కూడా చేసాను 😄

ఈ సంవత్సర కాలం  లో నేను చిన్నగా నవ్వాను,
చిన్నగా ఏడ్చాను,
కానీ ప్రతి రోజు
నా చుట్టూ ఉన్న ప్రేమను
మనస్ఫూర్తిగా అనుభవించాను 💕

నా ప్రతి చిన్న మైలురాయి
మా కుటుంబానికి  ఒక మధురమైన జ్ఞాపకంగా మార్చాను. 


ఈ మధురమైన ప్రయాణంలో
నా తొలి పుట్టినరోజు ఒక ప్రత్యేకమైన రోజు 🎂
ఈ రోజును
మీ అందరితో కలిసి జరుపుకోవాలని ఉంది 💙

దయచేసి మీరు వచ్చి
నన్ను ఆశీర్వదిస్తే
అదే నాకు దొరికే అతి పెద్ద గిఫ్ట్ 🎁✨

ఇట్లు 
ప్రేమతో … 💕
మీ ధన్విక్ విజయ్ కృష్ణ దత్త 
(s/o ఆబోతు అఖిల్ & తేజస్వి)`
}

const toggleMusic = (event) => {
  if (event) event.stopPropagation()
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
    manualPause.value = true // User explicitly paused
  } else {
    audioRef.value.volume = 0.5
    audioRef.value.play().then(() => {
      isPlaying.value = true
      manualPause.value = false // User explicitly played
    }).catch(e => console.log("Blocked:", e))
  }
}

const flagStyle = (n) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F1C', '#95A5A6'];
  return {
    backgroundColor: colors[n % colors.length],
    animationDelay: `${n * 0.1}s`
  }
}

const confettiStyle = (n) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D'];
  return {
    backgroundColor: colors[n % colors.length],
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    animationDelay: `${Math.random() * 5}s`
  }
}

const checkScroll = () => {
  const el = msgScrollRef.value
  if (!el) return
  
  // If content is not scrollable, it's already at bottom
  if (el.scrollHeight <= el.clientHeight + 20) {
    reachedBottom.value = true
    return
  }

  // Check if scrolled to bottom with 20px tolerance
  const isBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 20
  if (isBottom) {
    reachedBottom.value = true
  }
}

// Reset scroll check when language changes
watch(currentLang, () => {
  reachedBottom.value = false
  nextTick(() => {
    if (msgScrollRef.value) {
      msgScrollRef.value.scrollTop = 0
      checkScroll()
    }
  })
})

onMounted(() => {
  // Check initial scroll state
  nextTick(() => {
    checkScroll()
  })

  const audio = audioRef.value
  if (!audio) return

  audio.volume = 0.5
  
  // 1. Attempt immediate play
  audio.play().then(() => {
    isPlaying.value = true
  }).catch(() => {
    // Expected to fail on most browsers without interaction
    console.log("Autoplay waiting for interaction")
  })

  // 2. Add global capture listeners for any FIRST interaction to start audio
  const events = ['click', 'touchstart', 'scroll', 'keydown', 'mousedown', 'pointerdown']
  
  const unlockAudio = () => {
    // Only try interactions if user hasn't manually paused
    if (manualPause.value) return

    if (audio.paused && !isPlaying.value) {
       audio.play().then(() => {
        isPlaying.value = true
        // Cleanup once playing
        events.forEach(e => document.removeEventListener(e, unlockAudio, true))
      }).catch(() => {})
    } else if (isPlaying.value) {
       // Already playing, cleanup
       events.forEach(e => document.removeEventListener(e, unlockAudio, true))
    }
  }

  events.forEach(e => document.addEventListener(e, unlockAudio, true))
})

const scrollToNext = () => {
  const container = document.querySelector('.cards-scroll-snap')
  const height = window.innerHeight
  container.scrollBy({ top: height, behavior: 'smooth' })
}

const saveToCalendar = () => {
  const event = {
    title: "Dhanvik's 1st Birthday Party",
    start: "20260128T053000Z", // Jan 28, 2026, 11:00 AM IST (UTC +5:30)
    end: "20260128T103000Z",   // Jan 28, 2026, 4:00 PM IST
    details: "🧸✨ You are cordially invited to celebrate Dhanvik's first trip around the sun! 🎂✨\n\nJoin us for lunch and celebration.",
    location: "Nacharam (Village), Dammepeta, Bhadradri-Kothagudem, Telangana - 507306"
  }
  
  const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${event.details}&location=${encodeURIComponent(event.location)}`
  
  window.open(googleUrl, '_blank')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Chewy&family=Fredoka:wght@400;600&family=Nunito:wght@400;700&display=swap');

.kids-theme-container {
  height: 100vh;
  width: 100vw;
  background-color: #f7f9fc;
  font-family: 'Nunito', sans-serif;
  overflow: hidden;
  position: relative;
}

.bg-pattern {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-image: radial-gradient(#FF9F1C 1px, transparent 1px), radial-gradient(#4ECDC4 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: 0 0, 20px 20px;
  opacity: 0.1;
  pointer-events: none;
}

.cards-scroll-snap {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  position: relative;
  z-index: 10;
}

.card-section {
  height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden;
  background: transparent;
}

/* === CARD 1: PLAYFUL FRONT === */
.playful-front {
  display: flex;
  flex-direction: column;
}

/* TOP 70% ANIMATION ZONE */
.animation-zone {
  flex: 7; /* 70% */
  background: linear-gradient(to bottom, #87CEEB 0%, #E0F7FA 100%);
  position: relative;
  overflow: hidden;
}

/* Clouds */
.cloud {
  position: absolute;
  background: white;
  border-radius: 50px;
  opacity: 0.9;
  animation: floatCloud linear infinite;
}
.cloud::after, .cloud::before {
  content: ''; position: absolute; background: white; border-radius: 50%;
}
.c1 { width: 120px; height: 40px; top: 10%; left: 10%; animation-duration: 25s; }
.c1::after { width: 50px; height: 50px; top: -25px; left: 20px; }
.c1::before { width: 40px; height: 40px; top: -15px; left: 60px; }

.c2 { width: 100px; height: 35px; top: 20%; right: 10%; animation-duration: 35s; animation-direction: reverse; }
.c2::after { width: 40px; height: 40px; top: -20px; left: 15px; }

.c3 { width: 80px; height: 30px; top: 40%; left: 40%; animation-duration: 40s; opacity: 0.7; }

@keyframes floatCloud { from { transform: translateX(-100px); } to { transform: translateX(calc(100vw + 100px)); } }

/* Bunting */
.bunting-string {
  position: absolute; top: -10px; left: 0; width: 120%; margin-left: -10%;
  border-top: 2px dashed #555;
  height: 50px;
  transform: rotate(5deg);
  display: flex; justify-content: space-around;
}
.flag {
  width: 20px; height: 30px;
  border-radius: 0 0 100px 100px;
  transform-origin: top center;
  animation: swayFlag 3s ease-in-out infinite alternate;
}
@keyframes swayFlag { from { transform: rotate(-5deg); } to { transform: rotate(5deg); } }

/* Balloons */
.balloons-group {
  position: absolute; width: 100%; height: 100%;
  pointer-events: none;
}
.balloon {
  position: absolute;
  width: 50px; height: 65px;
  border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
  bottom: -100px; 
  animation: riseUp linear infinite;
}
.balloon::before {
  content: ''; position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%);
  width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 8px solid currentColor;
}
.balloon .string {
  position: absolute; top: 100%; left: 50%;
  width: 1px; height: 40px; background: rgba(0,0,0,0.3);
}
.b1 { left: 10%; background-color: #FF6B6B; color: #FF6B6B; animation-duration: 15s; }
.b2 { left: 30%; background-color: #4ECDC4; color: #4ECDC4; animation-duration: 12s; animation-delay: 2s; }
.b3 { left: 70%; background-color: #FFE66D; color: #FFE66D; animation-duration: 18s; animation-delay: 1s; }
.b4 { left: 50%; background-color: #FF9F1C; color: #FF9F1C; animation-duration: 20s; animation-delay: 5s; width: 40px; height: 55px; }
.b5 { left: 85%; background-color: #FF6B6B; color: #FF6B6B; animation-duration: 14s; animation-delay: 8s; }
.b6 { left: 20%; background-color: #4ECDC4; color: #4ECDC4; animation-duration: 16s; animation-delay: 10s; }

@keyframes riseUp { 0% { bottom: -100px; transform: translateX(0); } 100% { bottom: 120%; transform: translateX(20px); } }

/* Cake */
.cake-stage {
  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
  width: 200px; height: 200px;
  display: flex; justify-content: center; align-items: flex-end;
}
.cake-stand {
  position: absolute; bottom: 0;
  width: 140px; height: 10px; background: #ddd; border-radius: 5px;
}
.cake-stand::after { content: ''; position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 10px; height: 20px; background: #bbb; }
.cake-stand::before { content: ''; position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); width: 80px; height: 5px; background: #ddd; border-radius: 5px; }

.cake-body { position: relative; bottom: 10px; }
.layer-bottom { width: 120px; height: 40px; background: #F8B195; border-radius: 5px; margin: 0 auto; border: 2px solid #C06C84; }
.layer-middle { width: 100px; height: 35px; background: #F67280; border-radius: 5px; margin: 0 auto; border: 2px solid #C06C84; }
.layer-top { width: 80px; height: 30px; background: #C06C84; border-radius: 5px; margin: 0 auto; position: relative; }

.candle-one {
  position: absolute; top: -30px; left: 50%; transform: translateX(-50%);
  width: 8px; height: 30px; background: repeating-linear-gradient(45deg, white, white 5px, blue 5px, blue 10px);
}
.flame {
  position: absolute; top: -15px; left: 50%; transform: translateX(-50%);
  width: 10px; height: 15px; background: orange; border-radius: 50% 50% 20% 20%;
  animation: flicker 0.2s infinite alternate;
  box-shadow: 0 0 10px orange;
}
@keyframes flicker { from { transform: translateX(-50%) scale(1); } to { transform: translateX(-50%) scale(1.1); } }

.party-popper { font-size: 2rem; position: absolute; bottom: 0; animation: bouncePopper 1s infinite alternate; }
.left { left: -20px; transform: rotate(-20deg); }
.right { right: -20px; transform: rotate(20deg); }
@keyframes bouncePopper { from { transform: translateY(0) rotate(var(--r)); } to { transform: translateY(-10px) rotate(var(--r)); } }

/* Confetti Rain */
.confetti-rain { position: absolute; top: 0; width: 100%; height: 100%; pointer-events: none; }
.confetti-piece { position: absolute; width: 8px; height: 8px; top: -10px; animation: confettiFall linear infinite; }
@keyframes confettiFall { to { top: 100%; transform: rotate(360deg); } }


/* BOTTOM 30% TITLE ZONE */
.title-zone {
  flex: 3; /* 30% */
  background: white;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}
.wave-divider {
  position: absolute; top: -80px; left: 0; width: 100%; height: 100px;
  overflow: hidden; line-height: 0;
}
.wave-divider svg { display: block; width: calc(100% + 1.3px); height: 100px; transform: rotateY(180deg); }

.content-text { z-index: 5; margin-top: -20px; }
.subtitle { font-family: 'Fredoka', sans-serif; color: #888; margin: 0; font-size: 1rem; }
.kid-name-pop { 
  font-family: 'Chewy', cursive; 
  font-size: 3.5rem; 
  color: #FF6B6B; 
  margin: 0; 
  text-shadow: 2px 2px 0px #FFD93D;
  transform: rotate(-2deg);
}
.badge-1st {
  display: inline-block; width: 50px; height: 50px; background: #FFD93D; border-radius: 50%;
  line-height: 50px; color: #fff; font-weight: bold; font-family: 'Fredoka', sans-serif; font-size: 1.2rem;
  box-shadow: 0 4px 0 #FF9F1C; margin: 5px 0;
  animation: badgePulse 2s infinite;
}
@keyframes badgePulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }

.heading-pop { font-family: 'Fredoka', sans-serif; color: #4ECDC4; font-size: 2rem; margin: 0; }

.bounce-arrow { margin-top: 15px; color: #95A5A6; animation: bounceArrow 1.5s infinite; }
.bounce-arrow p { font-size: 0.8rem; margin: 0; }
@keyframes bounceArrow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(5px); } }


/* === CARD 2: PLAYFUL MESSAGE === */
.message-section { display: flex; align-items: center; justify-content: center; background: #FFE66D; }
.card-box {
  width: 90%; max-width: 400px;
  background: white; border-radius: 20px;
  padding: 20px 20px 50px 20px; /* Extra bottom padding for next button */
  box-shadow: 10px 10px 0 rgba(0,0,0,0.1);
  position: relative;
  max-height: 85vh; 
  display: flex; flex-direction: column;
  overflow: visible;
}
.details-box {
  height: auto;
  max-height: 90vh;
  overflow-y: auto;
  padding-bottom: 20px;
}
.playful-border { border: 4px dashed #FF6B6B; }
.sticker-decor { position: absolute; font-size: 2.5rem; }
.top-right { top: -20px; right: -20px; transform: rotate(15deg); }
.bottom-left { bottom: -20px; left: -20px; transform: rotate(-15deg); }

.lang-tabs { display: flex; justify-content: center; gap: 10px; margin-bottom: 15px; flex-shrink: 0; }
.lang-tabs button {
  background: #f0f0f0; border: none; padding: 8px 15px; border-radius: 20px;
  font-family: 'Fredoka', sans-serif; font-weight: bold; color: #777;
  cursor: pointer; transition: 0.2s;
}
.lang-tabs button.active { background: #4ECDC4; color: white; transform: scale(1.05); }

.msg-scroll-area { 
  overflow-y: auto; 
  text-align: center; 
  flex: 1; /* Take all remaining space */
  padding: 0 5px;
}
.sweet-msg {
  font-family: 'Nunito', sans-serif; font-size: 1.1rem; line-height: 1.6; color: #555;
}

/* === CARD 3: DETAILS === */
.details-section { display: flex; align-items: center; justify-content: center; background: #4ECDC4; }
.details-box { border: 4px solid white; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
.fun-header { font-family: 'Chewy', cursive; color: #FF6B6B; text-align: center; font-size: 2.2rem; margin: 0 0 20px; }

.fun-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
.fun-item { background: #f9f9f9; padding: 10px; border-radius: 15px; text-align: center; }
.fun-item.full { grid-column: span 2; }
.fun-icon { font-size: 2rem; margin-bottom: 5px; }
.item-text label { display: block; font-size: 0.7rem; color: #999; text-transform: uppercase; font-weight: bold; }
.item-text strong { display: block; font-size: 1rem; color: #333; font-family: 'Fredoka', sans-serif; margin-bottom: 3px; }
.item-text span { 
  display: block; 
  font-size: 0.85rem; 
  color: #777; 
  line-height: 1.4;
}

.calendar-action {
  margin-bottom: 20px;
  cursor: pointer;
}
.cal-btn {
  background: #4285F4; /* Google Blue */
  color: white;
  padding: 12px 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3);
  transition: transform 0.2s;
}
.cal-btn:active { transform: scale(0.95); }
.cal-btn i { font-size: 1.2rem; }

.map-rounded { 
  border-radius: 20px; 
  overflow: hidden; 
  border: 4px solid #FFD93D; 
  margin-bottom: 15px; 
  height: 250px; 
  min-height: 250px; 
  background: #f0f0f0;
}
.signature-wrap {
  text-align: center;
  margin-top: 25px;
  position: relative;
  padding: 15px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.heart-pulse {
  font-size: 1.5rem;
  animation: heartBeat 1.5s infinite;
  margin-bottom: 5px;
}
.signature {
  color: #888;
  font-size: 0.9rem;
  font-family: 'Fredoka', sans-serif;
  font-weight: 600;
}
.family-name {
  font-family: 'Chewy', cursive;
  font-size: 1.8rem;
  color: #FF9F1C;
  margin: 5px 0 0 0;
  text-shadow: 1px 1px 0 rgba(0,0,0,0.05);
}

@keyframes heartBeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}

.next-hint {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #FF6B6B;
  cursor: pointer;
  animation: bounceHint 2s infinite;
  z-index: 10;
  width: 100%;
}
.next-hint small { display: block; font-size: 0.7rem; font-weight: bold; }
@keyframes bounceHint { 
  0%, 100% { transform: translateX(-50%) translateY(0); } 
  50% { transform: translateX(-50%) translateY(5px); } 
}

/* MUSIC BTN */
.music-btn {
  position: fixed; bottom: 20px; right: 20px;
  width: 50px; height: 50px; background: white; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  cursor: pointer; z-index: 100;
  border: 3px solid #FF6B6B;
}
.music-btn.playing { animation: spinMusic 3s linear infinite; background: #FFD93D; border-color: white; }
@keyframes spinMusic { 100% { transform: rotate(360deg); } }

/* Mobile Tweaks */
@media (max-width: 400px) {
  .kid-name-pop { font-size: 3rem; }
  .heading-pop { font-size: 1.5rem; }
}

/* Celestial System Styles */
.celestial-system {
  position: absolute;
  top: 60px;
  right: 50px;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
}
.sun {
  font-size: 2.5rem;
  z-index: 2;
  filter: drop-shadow(0 0 10px rgba(255, 200, 0, 0.5));
}
.orbit-earth {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px dashed rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  animation: rotateClockwise 20s linear infinite;
}
.earth-container {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.earth {
  font-size: 1.2rem;
}
.orbit-moon {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px dashed rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  animation: rotateClockwise 5s linear infinite;
}
.moon.full-moon {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background: #f1f5f9;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff, inset -2px -2px 0 rgba(0,0,0,0.1);
  font-size: 0; /* Remove text space */
}

@keyframes rotateClockwise {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Trip Text Styles */
.trip-text-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  z-index: 10;
}
.trip-text {
  font-family: 'Fredoka', sans-serif;
  font-size: 1rem;
  color: #FF9F1C;
  font-weight: bold;
  font-style: italic;
  margin: 0;
  text-shadow: 1px 1px 0 rgba(255,255,255,0.8);
}

/* Left Space Elements Styles */
.left-space-elements {
  position: absolute;
  top: 40px;
  left: 20px;
  width: 150px;
  height: 250px;
  z-index: 5;
  pointer-events: none;
}

.planet-ringed {
  position: absolute;
  top: 0;
  left: 10px;
  width: 50px;
  height: 50px;
  background: radial-gradient(circle at 30% 30%, #a78bfa, #7c3aed);
  border-radius: 50%;
  animation: floatHand 6s ease-in-out infinite;
}
.planet-ringed .ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 20px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(-20deg);
}

.astronaut-mini {
  position: absolute;
  top: 100px;
  left: 40px;
  font-size: 2.5rem;
  animation: floatHand 5s ease-in-out infinite alternate;
}

.rocket-mini {
  position: absolute;
  top: 180px;
  left: 0;
  font-size: 3rem;
  transform: rotate(-45deg);
  animation: rocketPulse 3s ease-in-out infinite alternate;
}

@keyframes floatHand {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes rocketPulse {
  0% { transform: translate(0, 0) rotate(-45deg); }
  100% { transform: translate(10px, -10px) rotate(-40deg); }
}

/* Add styling for the new calendar sheet icon */
.calendar-sheet {
  background: white;
  border: 2px solid #333;
  border-radius: 8px;
  width: 50px;
  height: 50px;
  display: flex !important;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
  margin: 0 auto 5px;
}
.cal-month {
  background: #FF6B6B;
  color: white;
  font-size: 0.6rem;
  font-weight: bold;
  padding: 2px 0;
  text-align: center;
  font-family: 'Fredoka', sans-serif;
}
.cal-day {
  color: #333;
  font-size: 1.2rem;
  font-weight: bold;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Fredoka', sans-serif;
  line-height: 1;
}
</style>
