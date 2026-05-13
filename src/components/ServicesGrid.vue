<template>
  <section id="services" class="relative py-32 px-6 md:px-16 overflow-hidden" :style="{ background: '#000' }">

    <!-- Ambient light blob -->
    <div class="absolute pointer-events-none" style="width: 600px; height: 600px; left: -200px; top: 50%; transform: translateY(-50%); background: radial-gradient(circle, rgba(100,130,255,0.04) 0%, transparent 70%); filter: blur(40px);"></div>

    <!-- Heading -->
    <div ref="headingRef" class="mb-20 opacity-0">
      <p class="font-mono text-xs tracking-ultra uppercase mb-4" style="color: rgba(255,255,255,0.20)">{{ t.services.label }}</p>
      <h2 class="font-display font-black leading-none" style="font-size: clamp(2.5rem, 7vw, 6rem); letter-spacing: -0.03em; max-width: 700px; color: var(--text)">
        {{ t.services.heading1 }}<br/>
        <span class="text-gradient-white">{{ t.services.heading2 }}</span>
      </h2>
    </div>

    <!-- Services grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(service, i) in services"
        :key="service.id"
        :ref="el => serviceRefs[i] = el"
        class="service-panel relative rounded-xl overflow-hidden cursor-pointer opacity-0"
        :style="{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          minHeight: i === 0 || i === 3 ? '320px' : '260px',
        }"
        @mouseenter="onEnter(i, $event)"
        @mouseleave="onLeave(i, $event)"
        @mousemove="onMove(i, $event)"
      >
        <!-- Hover glow overlay -->
        <div
          class="service-glow absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none rounded-xl"
          :style="{ background: `radial-gradient(ellipse at var(--mx, 50%) var(--my, 50%), ${service.glowColor} 0%, transparent 60%)` }"
        ></div>

        <!-- Glow border on hover -->
        <div
          class="service-border absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 pointer-events-none"
          :style="{ boxShadow: `inset 0 0 0 1px ${service.accentColor}30` }"
        ></div>

        <!-- Content -->
        <div class="relative z-10 p-8 flex flex-col h-full">
          <!-- Icon -->
          <div class="mb-8">
            <div
              class="service-icon w-12 h-12 flex items-center justify-center rounded-lg"
              :style="{ background: `${service.accentColor}10`, border: `1px solid ${service.accentColor}20` }"
            >
              <div v-html="service.icon" :style="{ color: service.accentColor }"></div>
            </div>
          </div>

          <!-- Text -->
          <div class="flex-1">
            <h3 class="font-display font-bold text-xl mb-3 tracking-tight" style="color: #fff">{{ t.services.items[service.idx].name }}</h3>
            <p class="text-sm leading-relaxed font-light" style="color: rgba(255,255,255,0.40)">{{ t.services.items[service.idx].desc }}</p>
          </div>

          <!-- Feature list -->
          <div class="mt-6 space-y-2">
            <div v-for="feat in t.services.items[service.idx].features" :key="feat" class="flex items-center gap-2">
              <div class="w-1 h-1 rounded-full" :style="{ background: service.accentColor, opacity: 0.7 }"></div>
              <span class="text-xs font-mono" style="color: rgba(255,255,255,0.20)">{{ feat }}</span>
            </div>
          </div>

          <!-- Bottom arrow -->
          <div class="mt-6 flex items-center gap-2 transition-colors duration-300">
            <span class="text-xs font-mono tracking-widest uppercase" :style="{ color: service.accentColor + '60' }">{{ t.services.learnMore }}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" :style="{ color: service.accentColor }">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats row -->
    <div ref="statsRef" class="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-0">
      <div v-for="stat in t.services.stats" :key="stat.value" class="flex flex-col">
        <span class="font-display font-black text-5xl mb-2 tracking-tighter" style="color: #fff">{{ stat.value }}</span>
        <span class="text-xs font-mono tracking-widest uppercase" style="color: rgba(255,255,255,0.20)">{{ stat.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const headingRef = ref(null)
const serviceRefs = ref([])
const statsRef = ref(null)

const services = [
  {
    id: 'lens', idx: 0,
    glowColor: 'rgba(100, 150, 255, 0.08)',
    accentColor: '#6699ff',
    icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="11" cy="11" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="11" cy="11" r="2" fill="currentColor"/>
    </svg>`,
  },
  {
    id: 'led', idx: 1,
    glowColor: 'rgba(255, 255, 255, 0.06)',
    accentColor: '#ffffff',
    icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="7" y="8" width="8" height="6" rx="1" stroke="currentColor" stroke-width="1.5"/>
      <line x1="11" y1="4" x2="11" y2="6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="6" y1="5.5" x2="7.5" y2="7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="16" y1="5.5" x2="14.5" y2="7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="9" y1="14" x2="9" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="13" y1="14" x2="13" y2="18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 'drl', idx: 2,
    glowColor: 'rgba(100, 200, 255, 0.07)',
    accentColor: '#66ccff',
    icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="9" width="16" height="4" rx="2" stroke="currentColor" stroke-width="1.5"/>
      ${[0,1,2,3,4].map(i => `<rect x="${4.5 + i * 3}" y="10.2" width="1.8" height="1.6" rx="0.5" fill="currentColor" opacity="${0.5 + i * 0.1}"/>`).join('')}
    </svg>`,
  },
  {
    id: 'restore', idx: 3,
    glowColor: 'rgba(255, 200, 100, 0.07)',
    accentColor: '#ffcc66',
    icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 11 Q11 4 18 11 Q11 18 4 11Z" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="11" cy="11" r="2.5" fill="currentColor" opacity="0.5"/>
      <path d="M14 8 L18 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M16 4 L18 4 L18 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    id: 'polish', idx: 4,
    glowColor: 'rgba(200, 200, 200, 0.06)',
    accentColor: '#aaaaaa',
    icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5"/>
      <path d="M8 11 Q11 8 14 11" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <circle cx="9" cy="9.5" r="1" fill="currentColor" opacity="0.6"/>
    </svg>`,
  },
  {
    id: 'premium', idx: 5,
    glowColor: 'rgba(150, 100, 255, 0.08)',
    accentColor: '#aa77ff',
    icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 3 L13.5 9 L20 9 L14.8 13 L16.9 19.5 L11 16 L5.1 19.5 L7.2 13 L2 9 L8.5 9 Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,
  }
]

function onEnter(i, e) {
  const el = serviceRefs.value[i]
  gsap.to(el.querySelector('.service-glow'), { opacity: 1, duration: 0.4 })
  gsap.to(el.querySelector('.service-border'), { opacity: 1, duration: 0.4 })
  gsap.to(el.querySelector('.service-icon'), { scale: 1.1, duration: 0.4, ease: 'back.out(2)' })
}

function onLeave(i, e) {
  const el = serviceRefs.value[i]
  gsap.to(el.querySelector('.service-glow'), { opacity: 0, duration: 0.5 })
  gsap.to(el.querySelector('.service-border'), { opacity: 0, duration: 0.5 })
  gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
  gsap.to(el.querySelector('.service-icon'), { scale: 1, duration: 0.4 })
}

function onMove(i, e) {
  const el = serviceRefs.value[i]
  const rect = el.getBoundingClientRect()
  const mx = ((e.clientX - rect.left) / rect.width) * 100
  const my = ((e.clientY - rect.top) / rect.height) * 100
  el.querySelector('.service-glow').style.setProperty('--mx', mx + '%')
  el.querySelector('.service-glow').style.setProperty('--my', my + '%')

  const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8
  const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8
  gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.3, ease: 'power1.out', transformPerspective: 800 })
}

onMounted(() => {
  // Heading reveal
  ScrollTrigger.create({
    trigger: headingRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(headingRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    }
  })

  // Service cards staggered reveal
  ScrollTrigger.create({
    trigger: serviceRefs.value[0],
    start: 'top 80%',
    onEnter: () => {
      gsap.to(serviceRefs.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      })
    }
  })

  // Set initial state for reveal
  gsap.set(serviceRefs.value, { y: 30 })

  // Stats
  ScrollTrigger.create({
    trigger: statsRef.value,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(statsRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    }
  })
})
</script>

<style scoped>
.service-panel {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
