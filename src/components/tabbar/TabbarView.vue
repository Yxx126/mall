<!-- tabbar菜单栏组件 -->

<script setup lang='ts'>
  import { ref } from 'vue';

  const active = ref(0);
</script>

<template>
  <van-tabbar v-model="active" active-color="#ee0a24" route>
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/classift" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item replace to="/shoppingcart" icon="cart-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/my" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style lang='less' scoped>

</style>