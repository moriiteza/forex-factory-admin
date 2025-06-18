import AppLayout from '@/layout/AppLayout.vue'

export default [
  {
    path: '/story',
    name: 'story',
    component: () => import('./pages/Story.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
]
