<script setup lang='ts'>
import { ref } from 'vue';

const flag = ref(false)

const showLoading = () => {
  flag.value = true
}
const hideLoading = () => {
  flag.value = false
}
defineExpose({
  show: showLoading,
  hide: hideLoading,
})
</script>

<template>
  <van-loading size="24px" vertical v-if="flag">加载中...</van-loading>
</template>

<style lang='less' scoped>
  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
</style>