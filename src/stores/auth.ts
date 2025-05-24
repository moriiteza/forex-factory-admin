import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/composables/axios.ts'

interface User {
  id: number
  name: string
  username: string
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)

    const isAuthenticated = computed(() => !!token.value)

    async function login(username: string, password: string) {
      try {
        const response: { data: { user: User; token: string } } = await api.post('/users/login', {
          username,
          password,
        })
        user.value = response.data.user
        token.value = response.data.token
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    }

    function logout() {
      user.value = null
      token.value = null
    }

    return { user, token, isAuthenticated, login, logout }
  },
  { persist: true },
)
