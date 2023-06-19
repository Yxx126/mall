<!-- 分类页面二级标签模块 -->

<script setup lang='ts'>
  import { useClassifyStore } from '@/stores/classify';
  import { useRouter } from 'vue-router';

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

  type classifyTwoData = { id:number, uid:number, name:string, url:string }

  let list = Array<classifyTwoData>()
  classifyStore.twoList = []
  for(let i=1; i<=classifyStore.classifyOne.length; i++) {
    list = []
    classifyStore.classifyTwo.forEach(item => {
      if(item.uid === i) {
        list.push(item)
      }
    })
    classifyStore.twoList.push(list)
  }
</script>

<template>
  <div class="classify-right-container" :style="{ height: `${classifyStore.RightHeight}px`}">
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
    height: 200px;
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