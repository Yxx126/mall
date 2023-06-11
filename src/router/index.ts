import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/classift',
      name: 'classift',
      component: () => import('../views/ClassifyView.vue')
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import('../views/ShoppingCart.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('../views/MyVIew.vue')
    },
  ]
})

export default router
