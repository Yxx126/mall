<script setup lang='ts'>
import { useRoute } from 'vue-router';
  const route = useRoute()
  console.log(route.query);
</script>

<template>
  <div>
    商品列表
  </div>
</template>

<style lang='less' scoped>

</style>