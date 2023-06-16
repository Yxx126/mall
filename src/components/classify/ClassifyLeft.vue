<!-- 分类页面一级标签模块 -->

<script setup lang='ts'>
  import { ref } from 'vue';
  import { useClassifyStore } from '@/stores/classify';

  const classifyStore = useClassifyStore()

  const activeIndex = ref(1)
  const oneHandler = async (id:number) => {
    activeIndex.value = id
    await classifyStore.getclassifyTwo(id)
    const aaa = Math.ceil(classifyStore.classifyTwo.length/3)*90
    classifyStore.RightHeight = aaa
  }
</script>

<template>
  <div class="classify-left-container">
    <ul>
      <li v-for="item in classifyStore.classifyOne" :key="(item.id)" :class="activeIndex===item.id? 'active': ''" @click="oneHandler(item.id)">{{ item.name }}</li>
    </ul>
  </div>
</template>

<style lang='less' scoped>
  .classify-left-container {
    width: 100px;
    height: 573px;
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