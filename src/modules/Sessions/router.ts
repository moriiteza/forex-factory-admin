import AppLayout from '@/layout/AppLayout.vue'

export default [
  {
    path: '/sessions',
    name: 'sessions',
    component: () => import('./pages/Sessions.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
]
