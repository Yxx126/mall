<!-- 我的页面 -->

<script setup lang='ts'>
  import { useRouter } from 'vue-router';
  import Cookies from 'js-cookie';

  const router = useRouter()

  const toLogin = () => {
    router.push({ name: 'login' })
  }
</script>

<template>
  <div v-if="!Cookies.get('token')">
    <button @click.stop="toLogin">点击登录</button>
  </div>

  <div v-else>
    我的页面
  </div>

  <tabbar-view />
</template>

<style lang='less' scoped>

</style>