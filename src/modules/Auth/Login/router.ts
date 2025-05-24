import AuthLayout from '@/layout/AuthLayout.vue'

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login.vue'),
    meta: { layout: AuthLayout }
  },
]
