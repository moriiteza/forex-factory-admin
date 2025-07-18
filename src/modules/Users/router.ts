import AppLayout from '@/layout/AppLayout.vue'

export default [
  {
    path: '/users',
    name: 'users',
    component: () => import('./pages/Users.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
]
