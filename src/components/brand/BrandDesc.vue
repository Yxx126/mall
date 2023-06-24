<!-- 品牌信息组件 -->

<script setup lang='ts'>
  import { useGoodStore } from '@/stores/good';

  const goodStore = useGoodStore()
  const props = defineProps({
    show_name: {
      type: Boolean,
      default: true,
    }
  })
</script>

<template>
  <div class="gooddetail-main-brand">
    <div v-if="props.show_name" class="main-brand-name">品牌信息</div>
    <div class="main-brand-main">
      <img style="width: 105px; height: 35px;" :src="goodStore.good.brand.url">
      <div class="main-brand-main-left">
        <span>{{ goodStore.good.brand.name }}</span>
        <span>品牌首字母: {{ goodStore.good.brand.letter }}</span>
      </div>
      <div class="main-brand-main-right">
        <van-icon name="star" size="40" color="#606266" />
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
  .gooddetail-main-brand{
    margin-top: 10px;
    background-color: #fff;

    .main-brand-name {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .main-brand-main {
      display: flex;
      align-items: center;
      height: 44px;
      padding: 15px 25px;

      .main-brand-main-left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        margin-left: 15px;

        span:nth-child(1) {
          margin-bottom: 5px;
          font-size: 18px;
          color: #303133;
        }
        span:nth-child(2) {
          font-size: 12px;
          color: #909399;
        }
      }
      .main-brand-main-right {
        flex: 1;
        padding-right: 20px;
        text-align: right;
      }
    }
  }
</style>
