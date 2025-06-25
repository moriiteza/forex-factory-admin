import AppLayout from '@/layout/AppLayout.vue'

export default [
  {
    path: '/story/stories',
    name: 'story-stories',
    component: () => import('./pages/Story.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
  {
    path: '/story/categories',
    name: 'story-categories',
    component: () => import('./pages/StoryCategory.vue'),
    meta: {
      layout: AppLayout,
      requiresAuth: true,
    },
  },
]
