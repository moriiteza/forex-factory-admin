import AppLayout from '@/layout/AppLayout.vue'

export default [
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('./pages/EventsList.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
]
