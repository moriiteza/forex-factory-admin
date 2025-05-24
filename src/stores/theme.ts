import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const darkMode = ref<boolean>(localStorage.getItem('darkMode') === 'true')

    const isDark = computed(() => darkMode.value)

    function applyTheme() {
      if (darkMode.value) {
        document.documentElement.setAttribute('data-theme', 'dark')
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
        document.documentElement.classList.remove('dark')
      }

      localStorage.setItem('darkMode', darkMode.value.toString())
    }

    function toggleTheme() {
      darkMode.value = !darkMode.value
    }

    // Apply theme whenever darkMode changes
    watch(darkMode, applyTheme, { immediate: true })

    return { darkMode, isDark, toggleTheme }
  },
  {
    persist: true,
  },
)
