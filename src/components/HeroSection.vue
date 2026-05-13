<template>
  <section
    class="relative w-full overflow-hidden"
    style="height: 100vh; background: #000"
  >
    <!-- Car image -->
    <div
      ref="imgWrapRef"
      class="hero-img-wrap absolute pointer-events-none"
      style="z-index: 1"
    >
      <!-- Gradient mask: left edge (desktop only) -->
      <div class="hero-grad-left absolute inset-y-0 left-0 z-10"
           style="width: 45%; background: linear-gradient(to right, #000 0%, transparent 65%);"></div>
      <!-- Gradient mask: top edge (mobile only) -->
      <div class="hero-grad-top absolute inset-x-0 top-0 z-10"
           style="height: 45%; background: linear-gradient(to bottom, #000 0%, transparent 100%);"></div>
      <!-- Gradient mask: bottom -->
      <div class="absolute inset-x-0 bottom-0 z-10"
           style="height: 30%; background: linear-gradient(to top, #000 0%, transparent 100%);"></div>
      <img
        :src="heroImage"
        class="hero-img w-full h-full"
        style="transform: translateZ(0); will-change: transform; opacity: 0.88;"
      />
    </div>

    <!-- Cinematic vignette overlay -->
    <div
      class="absolute inset-0 pointer-events-none"
      style="
        background: radial-gradient(
          ellipse at 70% 50%,
          transparent 30%,
          rgba(0, 0, 0, 0.55) 100%
        );
        z-index: 2;
      "
    />

    <!-- Left: hero text -->
    <div
      class="hero-text absolute left-0 z-10 flex flex-col justify-center px-8 md:px-20"
    >
      <div ref="taglineRef" style="opacity: 0">
        <span
          class="text-xs font-mono tracking-ultra uppercase"
          style="color: rgba(255, 255, 255, 0.3)"
        >
          {{ t.hero.tagline }}
        </span>
      </div>

      <div ref="headlineRef" class="mt-5" style="opacity: 0">
        <h1
          class="font-display font-black leading-none text-white"
          style="font-size: clamp(3rem, 6vw, 7rem); letter-spacing: -0.03em"
        >
          {{ t.hero.headline1 }}<br />
          <span class="text-gradient-white">{{ t.hero.headline2 }}</span
          ><br />
          {{ t.hero.headline3 }}
        </h1>
      </div>

      <div ref="subRef" class="mt-8 flex items-center gap-6" style="opacity: 0">
        <div
          class="w-10 h-px"
          style="background: rgba(255, 255, 255, 0.2)"
        ></div>
        <p
          class="font-light tracking-widest text-xs uppercase"
          style="color: rgba(255, 255, 255, 0.4)"
        >
          {{ t.hero.sub }}
        </p>
      </div>

      <div ref="ctaRef" class="mt-10" style="opacity: 0">
        <a
          href="#services"
          class="inline-flex items-center gap-3 border border-white/15 hover:border-white/35 px-7 py-3 text-xs font-mono tracking-widest uppercase text-white/50 hover:text-white transition-all duration-300 rounded-sm"
        >
          <span
            class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
          ></span>
          {{ t.nav.services }}
        </a>
      </div>
    </div>

    <!-- Scroll cue -->
    <div
      ref="scrollCueRef"
      class="absolute bottom-44 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-3"
      style="opacity: 0"
    >
      <span
        class="text-xs font-mono tracking-ultra uppercase"
        style="color: rgba(255, 255, 255, 0.2)"
        >{{ t.hero.scroll }}</span
      >
      <div
        class="w-px h-10 bg-gradient-to-b from-white/20 to-transparent animate-pulse"
      ></div>
    </div>

    <!-- Car name badge -->
    <div
      class="absolute bottom-44 right-10 z-10 pointer-events-none hidden md:block"
      ref="badgeRef"
      style="opacity: 0"
    >
      <span class="text-white/20 text-xs font-mono tracking-widest uppercase">{{
        carName
      }}</span>
    </div>

    <!-- Services pillar strip -->
    <div
      ref="pillarsRef"
      class="absolute bottom-0 left-0 right-0 z-10"
      style="opacity: 0; border-top: 1px solid rgba(255,255,255,0.06); background: rgba(0,0,0,0.55); backdrop-filter: blur(12px);"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-3 divide-x divide-white/[0.06]">
        <a
          v-for="(pillar, i) in t.hero.pillars"
          :key="i"
          href="#services"
          class="group flex flex-col gap-1 py-5 px-6 transition-colors duration-300 hover:bg-white/[0.025]"
        >
          <span class="font-display font-bold text-sm md:text-base text-white/80 group-hover:text-white transition-colors duration-300">
            {{ pillar.label }}
          </span>
          <span class="text-xs font-mono tracking-widest" style="color: rgba(255,255,255,0.25)">
            {{ pillar.desc }}
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "../composables/useI18n.js";

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();

// ─── Refs ─────────────────────────────────────────────────────────────────────
const imgWrapRef = ref(null);
const carImgRef = ref(null);
const taglineRef = ref(null);
const headlineRef = ref(null);
const subRef = ref(null);
const ctaRef = ref(null);
const scrollCueRef = ref(null);
const badgeRef = ref(null);
const pillarsRef = ref(null);

// ─── Random hero image ────────────────────────────────────────────────────────
const rawHero = import.meta.glob("../assets/HeroSectionImages/*", {
  eager: true,
});
const heroEntries = Object.entries(rawHero).sort(([a], [b]) =>
  a.localeCompare(b)
);
const picked = heroEntries[Math.floor(Math.random() * heroEntries.length)];
const heroImage = picked[1].default;
const carName = picked[0]
  .split("/")
  .pop()
  .replace(/\.(png|jpg|webp)$/i, "")
  .replace(/_/g, " ");

// ─── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  // Staggered reveal
  const tl = gsap.timeline({ delay: 0.3 });
  tl.to(
    taglineRef.value,
    { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
    0
  );
  tl.to(
    headlineRef.value,
    { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
    0.15
  );
  tl.to(
    subRef.value,
    { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
    0.35
  );
  tl.to(
    ctaRef.value,
    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    0.5
  );
  tl.to(
    scrollCueRef.value,
    { opacity: 1, duration: 1.0, ease: "power2.out" },
    0.9
  );
  tl.to(badgeRef.value, { opacity: 1, duration: 1.0, ease: "power2.out" }, 0.9);
  tl.to(pillarsRef.value, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 0.7);

  // Set initial translate for text reveal
  gsap.set([taglineRef.value, headlineRef.value, subRef.value, ctaRef.value], {
    y: 20,
  });

  // Subtle scroll parallax on the car image
  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "+=600",
    scrub: 1,
    onUpdate(self) {
      if (imgWrapRef.value) {
        imgWrapRef.value.style.transform = `translateY(${
          self.progress * 60
        }px)`;
      }
    },
  });
});
</script>

<style scoped>
/* ── Hero text panel ── */
.hero-text {
  top: 0;
  bottom: 0;
  width: min(600px, 58%);
}
@media (max-width: 767px) {
  .hero-text {
    top: 0;
    bottom: auto;
    width: 100%;
    padding-top: 100px;
    justify-content: flex-start;
  }
}

/* ── Desktop: car on the right, full height, cropped cover ── */
.hero-img-wrap {
  top: 0;
  right: 0;
  height: 100%;
  width: clamp(420px, 65vw, 900px);
}
.hero-img {
  object-fit: cover;
  object-position: left center;
}
.hero-grad-left  { display: block; }
.hero-grad-top   { display: none; }

/* ── Mobile: car at the bottom, full width, full car visible ── */
@media (max-width: 767px) {
  .hero-img-wrap {
    top: auto;
    bottom: 72px; /* above the pillar strip */
    left: 0;
    right: 0;
    width: 100%;
    height: 52vh;
  }
  .hero-img {
    object-fit: contain;
    object-position: center bottom;
  }
  .hero-grad-left { display: none; }
  .hero-grad-top  { display: block; }
}
</style>
