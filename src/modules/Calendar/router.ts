import AppLayout from '@/layout/AppLayout.vue'

export default [
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('./pages/Calendar.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
  {
    path: '/calendar/event',
    name: 'calendar-event',
    component: () => import('./pages/Event.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
]
