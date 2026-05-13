<template>
  <section id="before-after" class="relative py-32 px-6 md:px-16 overflow-hidden" style="background: #000;">

    <!-- Heading -->
    <div ref="headingRef" class="mb-16 opacity-0">
      <p class="font-mono text-xs tracking-ultra uppercase mb-4" style="color: rgba(255,255,255,0.20)">
        {{ t.beforeAfter.label }}
      </p>
      <h2 class="font-display font-black leading-none text-white"
          style="font-size: clamp(2.5rem, 7vw, 6rem); letter-spacing: -0.03em;">
        {{ t.beforeAfter.heading1 }}<br/>
        <span class="text-gradient-white">{{ t.beforeAfter.heading2 }}</span>
      </h2>
      <p class="font-light text-sm mt-4 max-w-lg" style="color: rgba(255,255,255,0.35)">
        {{ t.beforeAfter.desc }}
      </p>
    </div>

    <!-- Comparison slider -->
    <div
      ref="compRef"
      class="relative overflow-hidden rounded-2xl opacity-0 w-full  aspect-[16/10]"
      style="height: clamp(280px, 50vw, 520px); max-width: 960px; cursor: ew-resize; user-select: none;"
      @mousedown="startDrag"
      @touchstart.prevent="startTouchDrag"
    >
      <!-- AFTER image (right, full) -->
      <div class="absolute inset-0">
        <img
          :src="pair.after"
          alt="After"
          class="w-full h-full"
          style="object-fit: cover; object-position: center;"
          draggable="false"
        />
        <!-- After label -->
        <div class="absolute top-5 right-5 flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"
               style="box-shadow: 0 0 8px #22c55e;"></div>
          <span class="text-white/70 text-xs font-mono tracking-widest uppercase">
            {{ t.beforeAfter.afterLabel }}
          </span>
        </div>
        <!-- After spec -->
        <div class="absolute bottom-5 right-5 text-right">
          <p class="text-white/70 font-mono text-xs tracking-widest">{{ t.beforeAfter.afterSpec }}</p>
          <p class="text-green-400/80 font-mono text-xs">{{ t.beforeAfter.afterStatus }}</p>
        </div>
      </div>

      <!-- BEFORE image (left, clipped by sliderX) -->
      <div
        class="absolute inset-0 overflow-hidden"
        :style="{ width: sliderX + '%' }"
      >
        <img
          :src="pair.before"
          alt="Before"
          class="h-full"
          style="width: 100vw; max-width: 960px; object-fit: cover; object-position: center;"
          draggable="false"
        />
        <!-- Before label -->
        <div class="absolute top-5 left-5 flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-yellow-500/80"></div>
          <span class="text-white/50 text-xs font-mono tracking-widest uppercase">
            {{ t.beforeAfter.beforeLabel }}
          </span>
        </div>
        <!-- Before spec -->
        <div class="absolute bottom-5 left-5">
          <p class="text-white/50 font-mono text-xs tracking-widest">{{ t.beforeAfter.beforeSpec }}</p>
          <p class="text-yellow-500/60 font-mono text-xs">{{ t.beforeAfter.beforeStatus }}</p>
        </div>
      </div>

      <!-- Divider line + handle -->
      <div
        class="absolute top-0 bottom-0 z-10 pointer-events-none"
        :style="{ left: sliderX + '%' }"
      >
        <div class="absolute inset-y-0 -translate-x-1/2 w-px" style="background: rgba(255,255,255,0.5);"></div>
        <!-- Handle circle -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-11 h-11 rounded-full flex items-center justify-center"
             style="background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.30); backdrop-filter: blur(8px);">
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M1 6h18M1 6l4-4M1 6l4 4M19 6l-4-4M19 6l-4 4"
                  stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Caption -->
    <p ref="captionRef"
       class="mt-7 text-xs font-mono tracking-widest max-w-lg opacity-0"
       style="color: rgba(255,255,255,0.18)">
      {{ t.beforeAfter.caption }}
    </p>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../composables/useI18n.js'

// Image imports
import beforeLight  from '../assets/beforeLight.png'
import afterLight   from '../assets/AfterLight.png'
import beforeLight1 from '../assets/BeforeLight1.png'
import afterLight1  from '../assets/AfterLight1.png'

const { t } = useI18n()

// ─── Random pair per session ──────────────────────────────────────────────────
const pairs = [
  { before: beforeLight,  after: afterLight  },
  { before: beforeLight1, after: afterLight1 },
]
const pair = pairs[Math.floor(Math.random() * pairs.length)]

// ─── Refs ─────────────────────────────────────────────────────────────────────
const headingRef = ref(null)
const compRef    = ref(null)
const captionRef = ref(null)

const sliderX = ref(50)
let isDragging = false

// ─── Drag handlers ────────────────────────────────────────────────────────────
function updateSlider(clientX) {
  if (!compRef.value) return
  const rect = compRef.value.getBoundingClientRect()
  sliderX.value = Math.max(3, Math.min(97, ((clientX - rect.left) / rect.width) * 100))
}

function startDrag(e)      { isDragging = true; updateSlider(e.clientX); window.addEventListener('mousemove', onDrag); window.addEventListener('mouseup', stopDrag) }
function startTouchDrag(e) { isDragging = true; updateSlider(e.touches[0].clientX); window.addEventListener('touchmove', onTouchDrag, { passive: false }); window.addEventListener('touchend', stopDrag) }
function onDrag(e)          { if (isDragging) updateSlider(e.clientX) }
function onTouchDrag(e)     { e.preventDefault(); if (isDragging) updateSlider(e.touches[0].clientX) }
function stopDrag()         { isDragging = false; window.removeEventListener('mousemove', onDrag); window.removeEventListener('mouseup', stopDrag); window.removeEventListener('touchmove', onTouchDrag); window.removeEventListener('touchend', stopDrag) }

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  ScrollTrigger.create({
    trigger: headingRef.value,
    start: 'top 80%',
    onEnter() {
      gsap.to(headingRef.value, { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' })
      gsap.to(compRef.value,    { opacity: 1, y: 0, duration: 1,   ease: 'power3.out', delay: 0.2 })
      gsap.to(captionRef.value, { opacity: 1,        duration: 0.8, ease: 'power2.out', delay: 0.5 })

      // Dramatic intro sweep
      gsap.fromTo(sliderX, { value: 82 }, {
        value: 50, duration: 1.4, delay: 0.5, ease: 'power3.inOut', onUpdate() {}
      })
    }
  })
  gsap.set([compRef.value, headingRef.value], { y: 28 })
})

onUnmounted(() => stopDrag())
</script>

<style scoped>
img { -webkit-user-drag: none; }
</style>
