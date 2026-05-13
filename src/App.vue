<template>
  <div id="root" class="relative" style="background: #000; color: #fff;">
    <!-- Film grain overlay -->
    <div class="noise" aria-hidden="true"></div>

    <!-- Navigation -->
    <AppNavigation />

    <!-- Main content -->
    <main>
      <!-- 01 · Hero -->
      <HeroSection />

      <!-- 03 · Headlight showcase carousel -->
      <HeadlightCarousel />

      <!-- 04 · Services -->
      <ServicesGrid />

      <!-- 05 · Before / After -->
      <BeforeAfter />

      <!-- 06 · Contact -->
      <ContactFooter />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import AppNavigation    from './components/AppNavigation.vue'
import HeroSection      from './components/HeroSection.vue'
import HeadlightCarousel from './components/HeadlightCarousel.vue'
import ServicesGrid     from './components/ServicesGrid.vue'
import BeforeAfter      from './components/BeforeAfter.vue'
import ContactFooter    from './components/ContactFooter.vue'
import { useLenis }     from './composables/useLenis.js'

gsap.registerPlugin(ScrollTrigger)

useLenis()

onMounted(() => {
  ScrollTrigger.refresh()
})
</script>
