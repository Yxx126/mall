<!-- 分类页面一级标签模块 -->

<script setup lang='ts'>
  import { useClassifyStore } from '@/stores/classify';

  const classifyStore = useClassifyStore()

  const oneHandler = async (id:number) => {
    classifyStore.activeIndex = id
  }
</script>

<template>
  <div class="classify-left-container">
    <ul>
      <li v-for="item in classifyStore.classifyOne" :key="(item.id)" :class="classifyStore.activeIndex===item.id? 'active': ''" @click="oneHandler(item.id)">{{ item.name }}</li>
    </ul>
  </div>
</template>

<style lang='less' scoped>
  .classify-left-container {
    @h: (574/667*100vh);
    width: 100px;
    height: @h;
    background-color: #fff;

    ul {
      li {
        width: 100px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #606266;
        font-size: 14px;

        &.active {
          color: #fa436a;
          background-color: #eee;
        }
      }
    }
  }
</style>