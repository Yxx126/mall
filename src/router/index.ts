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
      component: () => import('../views/package/GoodList.vue')
    },
    {
      path: '/gooddetail',
      name: 'gooddetail',
      component: () => import('../views/package/GoodDetail.vue')
    },
    {
      path: '/branddetail',
      name: 'branddetail',
      component: () => import('../views/package/BrandDetail.vue')
    },
    {
      path: '/correlationlist',
      name: 'correlationlist',
      component: () => import('../views/package/CorrelationList.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/package/LoginView.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/package/SearchView.vue')
    },
    {
      path: '/addresslist',
      name: 'addresslist',
      component: () => import('../views/package/AddressList.vue')
    },
    {
      path: '/address',
      name: 'address',
      component: () => import('../views/package/AddressView.vue')
    },
    {
      path: '/star',
      name: 'star',
      component: () => import('../views/package/StarView.vue')
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('../views/package/SetUp.vue')
    },
    {
      path: '/updatepwd',
      name: 'updatepwd',
      component: () => import('../views/package/UpdatePwd.vue')
    },
    {
      path: '/userimg',
      name: 'userimg',
      component: () => import('../views/package/UserImg.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/package/OrderView.vue')
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: () => import('../views/package/OrderList.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  // window.scrollTo(0, 0)
  next()
})

export default router
