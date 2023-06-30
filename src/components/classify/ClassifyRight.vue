<!-- 分类页面二级标签模块 -->

<script setup lang='ts'>
  import { useClassifyStore } from '@/stores/classify';
  import { useRouter } from 'vue-router';
  import { ref, watchEffect } from 'vue';

  const classifyStore = useClassifyStore()
  const router = useRouter()

  const toGoodlistHandler = (id:number) => {
    router.push({
      name: 'goodlist',
      query: {
        uid: id
      }
    })
  }

  const rightRef = ref()
  watchEffect(() => {
    if(rightRef.value?.clientWidth/3===undefined) return false
    const aaa = rightRef.value?.clientWidth/3
    classifyStore.RightItemHeight = aaa
  })
</script>

<template>
  <div ref="rightRef" class="classify-right-container" :style="{ height: `${classifyStore.RightHeight/667*100}vh`}">
    <div class="classify-right-item" v-for="item in classifyStore.twoList[classifyStore.activeIndex-1]" :key="item.id" @click="toGoodlistHandler(item.id)">
      <img v-lazy="item.url">
      <div class="classify-right-item">{{ item.name }}</div>
    </div>
  </div>
</template>

<style lang='less' scoped>
  .classify-right-container {
    display: flex;
    flex-wrap: wrap;
    margin-left: 10px;
    margin-top: 10px;
    padding: 10px 0;
    background-color: #fff;
    .classify-right-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 88px;

      img {
        width: 70px;
        height: 70px;
      }
      .classify-right-item {
        height: 16px;
        margin: 2px 0;
        font-size: 13px;
        color: #666;
      }
    }
  }
</style>