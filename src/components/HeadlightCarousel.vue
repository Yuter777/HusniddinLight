<template>
  <section id="showcase" class="relative overflow-hidden py-24" style="background: #000;">

    <!-- Section heading -->
    <div ref="headingRef" class="px-10 md:px-20 mb-16 opacity-0">
      <p class="text-white/25 font-mono text-xs tracking-ultra uppercase mb-3">{{ t.showcase.label }}</p>
      <h2 class="font-display font-black leading-none text-white"
          style="font-size: clamp(2.5rem, 7vw, 6rem); letter-spacing: -0.03em;">
        {{ t.showcase.heading1 }}<br/>
        <span class="text-gradient-white">{{ t.showcase.heading2 }}</span>
      </h2>
    </div>

    <!-- Carousel track -->
    <div class="relative overflow-hidden" style="mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);">
      <div ref="trackRef" class="flex gap-8 px-8" style="width: max-content; will-change: transform;">
        <div
          v-for="(light, i) in [...headlights, ...headlights]"
          :key="`hl-${i}`"
          class="headlight-card relative flex-shrink-0 cursor-pointer"
          :style="{ width: '260px', height: '180px' }"
          @mouseenter="onCardEnter(i, $event)"
          @mouseleave="onCardLeave(i, $event)"
          @mousemove="onCardMove(i, $event)"
        >
          <div class="absolute inset-0 rounded-xl overflow-hidden border border-white/10">
            <!-- Real headlight image -->
            <img :src="light.img" :alt="light.name"
                 class="w-full h-full object-cover" style="filter: brightness(0.9) contrast(1.05);"/>

            <!-- Ambient glow overlay -->
            <div
              class="headlight-ambient absolute inset-0 opacity-30 transition-opacity duration-700"
              :style="{ background: `radial-gradient(ellipse at 50% 80%, ${light.glowColor} 0%, transparent 65%)` }"
            ></div>

            <!-- Info overlay on bottom -->
            <div class="absolute bottom-0 left-0 right-0 p-4"
                 style="background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);">
              <p class="text-white/90 text-xs font-mono tracking-widest uppercase">{{ light.name }}</p>
              <p class="text-white/40 text-xs mt-0.5">{{ light.type }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Second row (opposite direction) -->
    <div class="relative overflow-hidden mt-6" style="mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%); -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);">
      <div ref="track2Ref" class="flex gap-8 px-8" style="width: max-content; will-change: transform;">
        <div
          v-for="(light, i) in [...headlights2, ...headlights2]"
          :key="`hl2-${i}`"
          class="headlight-card relative flex-shrink-0"
          :style="{ width: '200px', height: '140px' }"
        >
          <div class="absolute inset-0 rounded-xl overflow-hidden border border-white/10">
            <img :src="light.img" :alt="light.name"
                 class="w-full h-full object-cover" style="filter: brightness(0.85) contrast(1.05);"/>
            <div
              class="absolute inset-0 opacity-25"
              :style="{ background: `radial-gradient(ellipse at 50% 80%, ${light.glowColor} 0%, transparent 65%)` }"
            ></div>
            <div class="absolute bottom-0 left-0 right-0 p-3"
                 style="background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 60%, transparent 100%);">
              <p class="text-white/80 text-xs font-mono tracking-widest uppercase">{{ light.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '@/composables/useI18n'

import imgBMW        from '@/assets/CarsLights/BMW.webp'
import imgMerc       from '@/assets/CarsLights/Merc.webp'
import imgKiaK3      from '@/assets/CarsLights/Kia K3.png'
import imgCamry      from '@/assets/CarsLights/Toyota capmry.jpg'
import imgCobalt     from '@/assets/CarsLights/cobalt.jpg'
import imgMalibu     from '@/assets/CarsLights/Malibu.avif'
import imgDamas      from '@/assets/CarsLights/Dmas.webp'
import imgEpica      from '@/assets/CarsLights/Epica.webp'
import imgNexia      from '@/assets/CarsLights/Nexia.jpg'
import imgLacetti    from '@/assets/CarsLights/Lacetti.jpg'
import imgGentra     from '@/assets/CarsLights/Gentra.webp'
import imgSpark      from '@/assets/CarsLights/Spark.jpeg'
import imgTracker    from '@/assets/CarsLights/Tracker.webp'

const { t } = useI18n()

const headingRef = ref(null)
const trackRef   = ref(null)
const track2Ref  = ref(null)

let tween1, tween2

// ─── Row 1: Xorijiy brendlar ─────────────────────────────────────────────────
const headlights = [
  { name: 'BMW E-Series',   type: 'Angel Eye · Bi-Xenon',    glowColor: 'rgba(220,240,255,0.7)', img: imgBMW   },
  { name: 'Mercedes AMG',   type: 'Multibeam LED',            glowColor: 'rgba(255,255,255,0.6)', img: imgMerc  },
  { name: 'Kia K3',         type: 'LED DRL · Projector',      glowColor: 'rgba(160,200,255,0.6)', img: imgKiaK3 },
  { name: 'Toyota Camry',   type: 'Sequential Turn · LED',    glowColor: 'rgba(255,230,180,0.5)', img: imgCamry },
]

// ─── Row 2: GM / UzAuto brendlari ────────────────────────────────────────────
const headlights2 = [
  { name: 'Cobalt',   glowColor: 'rgba(180,210,255,0.6)', img: imgCobalt  },
  { name: 'Malibu',   glowColor: 'rgba(200,220,255,0.6)', img: imgMalibu  },
  { name: 'Damas',    glowColor: 'rgba(255,220,150,0.5)', img: imgDamas   },
  { name: 'Epica',    glowColor: 'rgba(180,200,255,0.5)', img: imgEpica   },
  { name: 'Nexia',    glowColor: 'rgba(255,240,200,0.5)', img: imgNexia   },
  { name: 'Lacetti',  glowColor: 'rgba(200,220,255,0.5)', img: imgLacetti },
  { name: 'Gentra',   glowColor: 'rgba(220,230,255,0.5)', img: imgGentra  },
  { name: 'Spark',    glowColor: 'rgba(200,255,220,0.4)', img: imgSpark   },
  { name: 'Tracker',  glowColor: 'rgba(180,220,255,0.5)', img: imgTracker },
]

function onCardEnter(i, e) {
  const card = e.currentTarget
  gsap.to(card.querySelector('.headlight-ambient'), { opacity: 0.7, scale: 1.2, duration: 0.5, ease: 'power2.out' })
  gsap.to(card, { y: -6, duration: 0.4, ease: 'power2.out' })
}

function onCardLeave(i, e) {
  const card = e.currentTarget
  gsap.to(card.querySelector('.headlight-ambient'), { opacity: 0.4, scale: 1, duration: 0.5 })
  gsap.to(card, { y: 0, rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
}

function onCardMove(i, e) {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -12
  const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 12
  gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.3, ease: 'power1.out', transformPerspective: 800 })
}

onMounted(() => {
  // Reveal heading
  ScrollTrigger.create({
    trigger: headingRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(headingRef.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
    }
  })

  // Infinite scroll row 1 (left to right — seamless duplicate trick)
  const totalW1 = trackRef.value.scrollWidth / 2
  tween1 = gsap.fromTo(trackRef.value,
    { x: 0 },
    { x: -totalW1, duration: 38, ease: 'none', repeat: -1 }
  )

  // Infinite scroll row 2 (right to left)
  const totalW2 = track2Ref.value.scrollWidth / 2
  tween2 = gsap.fromTo(track2Ref.value,
    { x: -totalW2 },
    { x: 0, duration: 30, ease: 'none', repeat: -1 }
  )
})

onUnmounted(() => {
  if (tween1) tween1.kill()
  if (tween2) tween2.kill()
})
</script>

<style scoped>
.headlight-card {
  perspective: 600px;
  will-change: transform;
  transition: none;
}
</style>
