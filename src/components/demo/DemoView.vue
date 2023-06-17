<!-- 上拉加载更多 -->

<script setup lang='ts'>
  const props = defineProps({
    flag: {
      type: Boolean,
      default: true,
    }
  })  
</script>

<template>
  <div class="box">
    <van-loading v-if="props.flag" />
    <div v-else>已全部加载完成！</div>
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