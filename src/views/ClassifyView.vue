<!-- 分类页面 -->

<script setup lang='ts'>
  import { onBeforeMount } from 'vue';
  import { useClassifyStore } from '@/stores/classify';
  import ClassifyLeft from '@/components/classify/ClassifyLeft.vue'; // 分类页面一级标签模块
  import ClassifyRight from '@/components/classify/ClassifyRight.vue'; // 分类页面二级标签模块

  const classifyStore = useClassifyStore()

  onBeforeMount(() => {
    classifyStore.getclassifyOne()
    classifyStore.getclassifyTwo()
  })
</script>

<template>
  <div class="classify-container">
    <van-nav-bar
      title="分类"
      fixed
    />
    <div class="classify-main">
      <classify-left />
      <classify-right />
    </div>
  </div>
</template>

<style lang='less' scoped>
  .classify-container {
    padding-top: 46px;
  }
  .classify-main {
    display: flex;
  }
</style>