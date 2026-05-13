<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14"
    style="height: 72px; color: #fff;"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3">
      <div class="w-5 h-5 relative">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <rect x="2" y="2" width="3" height="16" fill="white" opacity="0.9"/>
          <rect x="8.5" y="8" width="3" height="4" fill="white" opacity="0.9"/>
          <rect x="15" y="2" width="3" height="16" fill="white" opacity="0.9"/>
          <line x1="10" y1="0" x2="10" y2="3" stroke="white" stroke-width="0.5" opacity="0.4"/>
          <line x1="10" y1="17" x2="10" y2="20" stroke="white" stroke-width="0.5" opacity="0.4"/>
        </svg>
      </div>
      <span class="text-white font-display font-semibold tracking-widest text-sm uppercase">Husniddin</span>
    </div>

    <!-- Nav links (desktop) -->
    <div class="hidden md:flex items-center gap-10">
      <a v-for="link in navLinks" :key="link.label"
         :href="link.href"
         class="text-white/40 hover:text-white text-xs font-mono tracking-ultra uppercase transition-colors duration-300"
      >{{ link.label }}</a>
    </div>

    <!-- Right controls -->
    <div class="flex items-center gap-3">

      <!-- Language switcher -->
      <div class="hidden md:flex items-center rounded-md overflow-hidden"
           style="border: 1px solid rgba(255,255,255,0.10);">
        <button
          @click="setLang('uz')"
          class="px-3 py-1.5 text-xs font-mono tracking-widest uppercase transition-all duration-200"
          :style="lang === 'uz'
            ? 'background: #fff; color: #000;'
            : 'background: transparent; color: rgba(255,255,255,0.35);'"
        >UZ</button>
        <div style="width: 1px; height: 16px; background: rgba(255,255,255,0.10);"></div>
        <button
          @click="setLang('ru')"
          class="px-3 py-1.5 text-xs font-mono tracking-widest uppercase transition-all duration-200"
          :style="lang === 'ru'
            ? 'background: #fff; color: #000;'
            : 'background: transparent; color: rgba(255,255,255,0.35);'"
        >RU</button>
      </div>

      <!-- CTA -->
      <a href="#contact"
         class="hidden md:flex items-center gap-2 border border-white/15 hover:border-white/40
                px-5 py-2 text-xs font-mono tracking-widest uppercase
                text-white/60 hover:text-white transition-all duration-300 rounded-sm"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
        {{ t.nav.contact }}
      </a>

      <!-- Mobile hamburger -->
      <button @click="mobileOpen = !mobileOpen" class="md:hidden text-white/60 hover:text-white">
        <div class="flex flex-col gap-1.5 w-6">
          <span class="block h-px bg-current transition-all duration-300"
                :class="mobileOpen ? 'rotate-45 translate-y-2' : ''"></span>
          <span class="block h-px bg-current transition-all duration-300"
                :class="mobileOpen ? 'opacity-0' : ''"></span>
          <span class="block h-px bg-current transition-all duration-300"
                :class="mobileOpen ? '-rotate-45 -translate-y-2.5' : ''"></span>
        </div>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <div v-if="mobileOpen"
           class="absolute top-full left-0 right-0 py-6 px-8 flex flex-col gap-4"
           style="background: rgba(0,0,0,0.92); backdrop-filter: blur(20px);
                  border-top: 1px solid rgba(255,255,255,0.06);">
        <a v-for="link in navLinks" :key="link.label"
           :href="link.href"
           @click="mobileOpen = false"
           class="text-white/60 hover:text-white text-sm font-mono tracking-widest uppercase
                  transition-colors duration-300"
        >{{ link.label }}</a>

        <!-- Mobile lang switcher -->
        <div class="flex items-center gap-3 pt-3"
             style="border-top: 1px solid rgba(255,255,255,0.06);">
          <div class="flex items-center rounded-md overflow-hidden"
               style="border: 1px solid rgba(255,255,255,0.10);">
            <button @click="setLang('uz')" class="px-3 py-1.5 text-xs font-mono tracking-widest uppercase transition-all duration-200"
              :style="lang === 'uz' ? 'background:#fff;color:#000;' : 'background:transparent;color:rgba(255,255,255,0.35);'">UZ</button>
            <div style="width:1px;height:16px;background:rgba(255,255,255,0.10);"></div>
            <button @click="setLang('ru')" class="px-3 py-1.5 text-xs font-mono tracking-widest uppercase transition-all duration-200"
              :style="lang === 'ru' ? 'background:#fff;color:#000;' : 'background:transparent;color:rgba(255,255,255,0.35);'">RU</button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '../composables/useI18n.js'

const navRef = ref(null)
const mobileOpen = ref(false)

const { lang, t, setLang } = useI18n()

const navLinks = computed(() => [
  { label: t.value.nav.services,   href: '#services'    },
  { label: t.value.nav.showcase,   href: '#showcase'    },
  { label: t.value.nav.beforeAfter,href: '#before-after'},
  { label: t.value.nav.location,   href: '#contact'     },
])

onMounted(() => {
  gsap.from(navRef.value, { y: -20, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })

  ScrollTrigger.create({
    start: 'top -80px',
    end: 99999,
    toggleClass: { targets: navRef.value, className: 'nav-scrolled' }
  })
})
</script>

<style scoped>
nav {
  background: transparent;
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
}
nav.nav-scrolled {
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
