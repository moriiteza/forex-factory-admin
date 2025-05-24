import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import modules from '@/modules/modules'

const routes: any[] = []

for (const module in modules) {
  //@ts-ignore
  for (const subModule in modules[module]) {
    //@ts-ignore
    const routeData = modules[module][subModule]?.router
    if (Array.isArray(routeData)) {
      routes.push(...routeData)
    }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, _, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
