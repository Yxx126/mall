import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
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
    {
      path: '/addresslist',
      name: 'addresslist',
      component: () => import('../views/AddressList.vue')
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('../views/AddressView.vue')
    },
    {
      path: '/star',
      name: 'star',
      component: () => import('../views/StarView.vue')
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('../views/SetUp.vue')
    },
    {
      path: '/updatepwd',
      name: 'updatepwd',
      component: () => import('../views/UpdatePwd.vue')
    },
    {
      path: '/userimg',
      name: 'userimg',
      component: () => import('../views/UserImg.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  // window.scrollTo(0, 0)
  next()
})

export default router
