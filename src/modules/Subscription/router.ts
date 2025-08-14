import AppLayout from '@/layout/AppLayout.vue'

export default [
  {
    path: '/subscription/plans',
    name: 'subscription-plans',
    component: () => import('./pages/Plans.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  }
]
