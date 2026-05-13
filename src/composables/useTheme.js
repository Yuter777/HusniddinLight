import { reactive, computed, watch } from 'vue'

const state = reactive({
  theme: localStorage.getItem('theme') || 'dark'
})

watch(() => state.theme, (val) => {
  document.documentElement.setAttribute('data-theme', val)
  localStorage.setItem('theme', val)
}, { immediate: true })

export function useTheme() {
  const isDark = computed(() => state.theme === 'dark')

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark'
  }

  function setTheme(val) {
    state.theme = val
  }

  return { theme: computed(() => state.theme), isDark, toggleTheme, setTheme }
}
