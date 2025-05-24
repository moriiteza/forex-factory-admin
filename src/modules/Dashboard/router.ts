import AppLayout from '@/layout/AppLayout.vue'

export default [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./pages/Dashboard.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
]
