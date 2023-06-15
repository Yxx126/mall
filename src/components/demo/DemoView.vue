<!-- 上拉加载更多 -->

<script setup lang='ts'>
  const props = defineProps({
    value: {
      type: String,
      default: '上拉加载更多',
    }
  })
</script>

<template>
  <div class="box">
    <div>{{ props.value }}</div>
  </div>
</template>

<style lang='less' scoped>
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;

    div {
      font-size: 14px;
      color: #777;
    }
  }
</style>