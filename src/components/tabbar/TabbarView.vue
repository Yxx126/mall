<!-- tabbar菜单栏组件 -->

<script setup lang='ts'>
  import { ref } from 'vue';

  const active = ref(0);
</script>

<template>
  <van-tabbar v-model="active" active-color="#ee0a24">
    <router-link to="/" class="van-tabbar-item"><van-tabbar-item icon="home-o">首页</van-tabbar-item></router-link>
    <router-link to="/classift" class="van-tabbar-item"><van-tabbar-item icon="apps-o">分类</van-tabbar-item></router-link>
    <router-link to="/shoppingcart" class="van-tabbar-item"><van-tabbar-item icon="cart-o">购物车</van-tabbar-item></router-link>
    <router-link to="/my" class="van-tabbar-item"><van-tabbar-item icon="contact">我的</van-tabbar-item></router-link>
  </van-tabbar>
</template>

<style lang='less' scoped>
  van-tabbar {
    a {
      display: block;
    }
  }
</style>