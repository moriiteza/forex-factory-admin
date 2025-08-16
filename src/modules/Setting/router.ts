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
  {
    path: '/setting/rate-monitor',
    name: 'setting-rate-monitor',
    component: () => import('./pages/RateMonitor.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
  {
    path: '/setting/tutorial/journal',
    name: 'setting-tutorial-journal',
    component: () => import('./pages/TutorialJournal.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
]
