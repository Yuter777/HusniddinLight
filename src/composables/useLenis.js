import { onMounted, onUnmounted } from 'vue'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null
let tickerFn = null

export function useLenis() {
  onMounted(() => {
    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    })

    lenisInstance.on('scroll', ScrollTrigger.update)

    tickerFn = (time) => {
      lenisInstance.raf(time * 1000)
    }
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)
  })

  onUnmounted(() => {
    if (tickerFn) {
      gsap.ticker.remove(tickerFn)
      tickerFn = null
    }
    if (lenisInstance) {
      lenisInstance.destroy()
      lenisInstance = null
    }
  })

  return {
    getLenis: () => lenisInstance
  }
}
