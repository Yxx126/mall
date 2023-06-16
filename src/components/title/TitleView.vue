<!-- 页面头部模块 -->

<script setup lang='ts'>
  const props = defineProps({
    title: {
      type: String,
      default: '标题'
    }
  })
</script>

<template>
  <div class="title-container">{{ props.title }}</div>
</template>

<style lang='less' scoped>
  .title-container {
    height: 30px;
    line-height: 30px;
    padding: 7px 3px;
    text-align: center;
    background-color: #fff;
  }
</style>