<script setup lang='ts'>
import TabbarView from '@/components/tabbar/TabbarView.vue';
</script>

<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>

  <tabbar-view />
</template>

<style lang='less'>
  body {
    background-color: #eee;
    padding-bottom: 50px;
  }
</style>