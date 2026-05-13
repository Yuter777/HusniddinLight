<template>
  <footer id="contact" class="relative overflow-hidden"
          style="background: #000; border-top: 1px solid rgba(255,255,255,0.05);">

    <!-- Ambient top line -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
         style="width: 400px; height: 1px;
                background: linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent);
                box-shadow: 0 0 60px 30px rgba(100,150,255,0.04);">
    </div>

    <div class="max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-32">

      <!-- Heading + contact cards -->
      <div ref="topRef" class="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-24 opacity-0">
        <div>
          <p class="font-mono text-xs tracking-ultra uppercase mb-4"
             style="color: rgba(255,255,255,0.18)">{{ t.contact.label }}</p>
          <h2 class="font-display font-black leading-none text-white"
              style="font-size: clamp(2.5rem, 7vw, 5.5rem); letter-spacing: -0.03em;">
            {{ t.contact.heading1 }}<br/>
            <span class="text-gradient-white">{{ t.contact.heading2 }}</span>
          </h2>
        </div>

        <div class="flex flex-col gap-4 min-w-60">
          <!-- Phone -->
          <a :href="'tel:' + phone"
             class="flex items-center gap-4 rounded-xl px-6 py-4 transition-all duration-300
                    border border-white/8 hover:border-white/20 hover:bg-white/[0.02]">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                 style="background: rgba(255,255,255,0.04);">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3h3.5l1.5 4-2 1.2c1 2.1 2.3 3.4 4.3 4.3L11.5 10.5l4 1.5V15a1 1 0 01-1 1C6.7 16 2 11.3 2 4a1 1 0 011-1z"
                      stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
              </svg>
            </div>
            <div>
              <p class="text-xs font-mono tracking-widest uppercase mb-0.5"
                 style="color: rgba(255,255,255,0.25)">{{ t.contact.callLabel }}</p>
              <p class="text-white font-mono text-sm">{{ phone }}</p>
            </div>
          </a>

          <!-- Telegram -->
          <a :href="telegramLink" target="_blank" rel="noopener"
             class="flex items-center gap-4 rounded-xl px-6 py-4 transition-all duration-300
                    border border-white/8 hover:border-blue-400/25 hover:bg-blue-950/10">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                 style="background: rgba(100,150,255,0.07);">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M16 2L1 7.6l5 2.1 2 5.3 2.5-3 4.5 3.5L16 2z"
                      stroke="rgba(100,150,255,0.8)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 9.7L12.5 5" stroke="rgba(100,150,255,0.6)" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </div>
            <div>
              <p class="text-xs font-mono tracking-widest uppercase mb-0.5"
                 style="color: rgba(255,255,255,0.25)">Telegram</p>
              <p class="text-blue-400/80 font-mono text-sm">{{ telegramHandle }}</p>
            </div>
          </a>

          <!-- Instagram -->
          <a :href="instagramLink" target="_blank" rel="noopener"
             class="flex items-center gap-4 rounded-xl px-6 py-4 transition-all duration-300
                    border border-white/8 hover:border-pink-400/25 hover:bg-pink-950/10">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                 style="background: rgba(255,100,150,0.05);">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="14" height="14" rx="4"
                      stroke="rgba(255,100,150,0.65)" stroke-width="1.2"/>
                <circle cx="9" cy="9" r="3.5" stroke="rgba(255,100,150,0.65)" stroke-width="1.2"/>
                <circle cx="13" cy="5" r="0.8" fill="rgba(255,100,150,0.65)"/>
              </svg>
            </div>
            <div>
              <p class="text-xs font-mono tracking-widest uppercase mb-0.5"
                 style="color: rgba(255,255,255,0.25)">Instagram</p>
              <p class="text-pink-400/80 font-mono text-sm">{{ instagramHandle }}</p>
            </div>
          </a>
        </div>
      </div>

      <!-- Location -->
      <div ref="locationRef" class="mb-24 opacity-0">
        <div class="flex flex-col md:flex-row gap-8 items-start">
          <div class="flex-1">
            <p class="font-mono text-xs tracking-ultra uppercase mb-3"
               style="color: rgba(255,255,255,0.18)">{{ t.contact.locationLabel }}</p>
            <p class="font-display font-semibold text-2xl mb-2 text-white">{{ t.contact.locationName }}</p>
            <p class="font-light text-sm leading-relaxed" style="color: rgba(255,255,255,0.38)">
              {{ t.contact.locationAddress }}<br/>
              {{ t.contact.locationHours }}
            </p>
          </div>

          <!-- Yandex Map -->
          <a href="https://yandex.uz/maps/-/CPg5JV4~" target="_blank" rel="noopener"
             class="w-full md:w-96 h-48 rounded-xl overflow-hidden relative block"
             style="border: 1px solid rgba(255,255,255,0.06);">
            <iframe
              src="https://yandex.uz/map-widget/v1/?ll=69.211522%2C41.232038&z=16&pt=69.211522%2C41.232038%2Cpm2rdm"
              width="100%" height="100%"
              frameborder="0"
              allowfullscreen
              style="display:block; filter: grayscale(1) invert(1) brightness(0.75) contrast(0.85);"
            ></iframe>
          </a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div ref="bottomRef" class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 opacity-0"
           style="border-top: 1px solid rgba(255,255,255,0.05);">
        <div class="flex items-center gap-3">
          <svg viewBox="0 0 20 20" fill="none" class="w-4 h-4">
            <rect x="2"   y="2" width="3" height="16" fill="white" opacity="0.35"/>
            <rect x="8.5" y="8" width="3" height="4"  fill="white" opacity="0.35"/>
            <rect x="15"  y="2" width="3" height="16" fill="white" opacity="0.35"/>
          </svg>
          <span class="font-mono text-xs" style="color: rgba(255,255,255,0.18)">
            HUSNIDDIN · Light Mastery
          </span>
        </div>
        <div class="flex items-center gap-6">
          <span class="font-mono text-xs" style="color: rgba(255,255,255,0.15)">
            {{ t.contact.copyright }}
          </span>
          <div class="w-px h-3 bg-white/10"></div>
          <span class="font-mono text-xs" style="color: rgba(255,255,255,0.15)">
            Sergeli, Toshkent
          </span>
        </div>
      </div>

    </div>

    <div class="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
         style="background: linear-gradient(to right, transparent, rgba(100,130,255,0.08), transparent);">
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const topRef      = ref(null)
const locationRef = ref(null)
const bottomRef   = ref(null)

const phone           = '+998 94 320 11 61'
const telegramHandle  = 'husniddin'
const instagramHandle = 'husniddin'
const telegramLink    = 'https://t.me/@hussn1dd1n__'
const instagramLink   = 'https://www.instagram.com/hussn1dd1n__/'

onMounted(() => {
  ScrollTrigger.create({
    trigger: topRef.value,
    start: 'top 85%',
    onEnter() {
      gsap.to(topRef.value,      { opacity: 1, y: 0, duration: 1,   ease: 'power3.out' })
      gsap.to(locationRef.value, { opacity: 1, y: 0, duration: 1,   ease: 'power3.out', delay: 0.2 })
      gsap.to(bottomRef.value,   { opacity: 1,        duration: 0.8, ease: 'power2.out', delay: 0.4 })
    }
  })
  gsap.set([topRef.value, locationRef.value], { y: 30 })
})
</script>
