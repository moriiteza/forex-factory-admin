import AppLayout from '@/layout/AppLayout.vue'

export default [
  {
    path: '/setting/adds',
    name: 'setting-adds',
    component: () => import('./pages/Ads.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
]
