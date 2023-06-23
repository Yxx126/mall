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
      component: () => import('../views/MyView.vue')
    },
    {
      path: '/goodlist',
      name: 'goodlist',
      component: () => import('../views/GoodList.vue')
    },
    {
      path: '/gooddetail',
      name: 'gooddetail',
      component: () => import('../views/GoodDetail.vue')
    },
    {
      path: '/branddetail',
      name: 'branddetail',
      component: () => import('../views/BrandDetail.vue')
    },
    {
      path: '/correlationlist',
      name: 'correlationlist',
      component: () => import('../views/CorrelationList.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
