<!-- 分类页面 -->

<script setup lang='ts'>
  import { onBeforeMount, watchEffect } from 'vue';
  import { useClassifyStore } from '@/stores/classify';
  import ClassifyLeft from '@/components/classify/ClassifyLeft.vue'; // 分类页面一级标签模块
  import ClassifyRight from '@/components/classify/ClassifyRight.vue'; // 分类页面二级标签模块

  const classifyStore = useClassifyStore()

  onBeforeMount(async () => {
    await classifyStore.getclassifyOne()
    await classifyStore.getclassifyTwo()

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
    classifyStore.RightHeight = 180
  })

  watchEffect(() => {
    if(classifyStore.twoList[classifyStore.activeIndex-1]===undefined) return false
    const aaa = Math.ceil(classifyStore.twoList[classifyStore.activeIndex-1].length/3)*(classifyStore.RightItemHeight)
    classifyStore.RightHeight = aaa
  })
</script>

<template>
  <div class="classify-container">
    <van-nav-bar
      title="分类"
      fixed
    />
    <div class="classify-main">
      <classify-left />
      <classify-right ref="rightRefs" />
    </div>
  </div>

  <tabbar-view />
</template>

<style lang='less' scoped>
  .classify-container {
    padding-top: 46px;
    padding-bottom: 50px;
  }
  .classify-main {
    display: flex;
  }
</style>