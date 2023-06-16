<!-- 分类页面 -->

<script setup lang='ts'>
  import { onBeforeMount } from 'vue';
  import { useClassifyStore } from '@/stores/classify';
  import TitleView from '@/components/title/TitleView.vue'; // 页面头部模块
  import ClassifyLeft from '@/components/classify/ClassifyLeft.vue'; // 分类页面一级标签模块
  import ClassifyRight from '@/components/classify/ClassifyRight.vue'; // 分类页面二级标签模块

  const classifyStore = useClassifyStore()

  onBeforeMount(() => {
    classifyStore.getclassifyOne()
    classifyStore.getclassifyTwo(1)
  })
</script>

<template>
  <title-view :title="'分类'" />
  <div class="classify-main">
    <classify-left />
    <classify-right />
  </div>
</template>

<style lang='less' scoped>
  .classify-main {
    display: flex;
  }
</style>