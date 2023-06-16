<!-- 首页导航栏模块 -->

<script setup lang='ts'>
  import { onBeforeMount } from 'vue';
  // pinia
  import { useHomeStore } from '@/stores/home';

  const homeStore = useHomeStore()

  onBeforeMount(() => {
    homeStore.getHomeNav()
  })
</script>

<template>
  <div class="home-nav">
    <div class="home-nav-item" v-for="item in homeStore.homeNav" :key="item.id">
      <img :src="item.url">
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<style lang='less' scoped>
  .home-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
    background-color: #fff;
    .home-nav-item {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      img {
        width: 44px;
        height: 44px;
        margin-bottom: 7px;
      }
      p {
        font-size: 13px;
      }
    }
  }
</style>