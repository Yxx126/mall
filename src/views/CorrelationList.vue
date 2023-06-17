<!-- 相关品牌...页面 -->

<script setup lang='ts'>
  import { ref, onBeforeMount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useHomeStore } from '@/stores/home';
  import { scrollEvent } from '@/hooks/scrollEvent/scrollEvent';
  import HomeBrand from '@/components/home/homeFloorItem/HomeBrand.vue';  // 首页品牌部分
  import LightningDeals from '@/components/home/homeFloorItem/LightningDeals.vue';  // 首页秒杀专区部分
  import DemoView from '@/components/demo/DemoView.vue';  //上拉加载更多

  const route = useRoute()
  const router = useRouter()
  const homeStore = useHomeStore()

  const onClickLeft = () => {
    router.go(-1)
  }
  onBeforeMount(() => {
    homeStore.scrollFlag = false
    homeStore.demoFlag = true
  })
  const box1Ref = ref()
  const boxRef = ref()

  const scroll = () => {
    if(route.query.name === '品牌制造商直达') scrollEvent(boxRef, box1Ref, 'brand', true)
    if(route.query.name === '新鲜好物') scrollEvent(boxRef, box1Ref, 'lightning', true)
    if(route.query.name === '人气推荐') scrollEvent(boxRef, box1Ref, 'toplike', true)
  }
</script>

<template>
  <div class="correlation-container" ref="box1Ref" @scroll="scroll">
    <van-nav-bar
      :title="route.query.name"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />

    <img src="../assets/images/01.png" v-if="route.query.name === '品牌制造商直达'">
    <img src="../assets/images/02.png" v-if="route.query.name === '新鲜好物'">
    <img src="../assets/images/03.png" v-if="route.query.name === '人气推荐'">

    <div class="correlation-name" v-if="route.query.name === '品牌制造商直达'">相关品牌</div>
    <div class="correlation-name" v-if="route.query.name === '新鲜好物'">相关商品</div>
    <div class="correlation-name" v-if="route.query.name === '人气推荐'">相关商品</div>

    <home-brand :list="homeStore.brand" v-if="route.query.name === '品牌制造商直达'" />
    <lightning-deals :list="homeStore.lightning" v-if="route.query.name === '新鲜好物'" />
    <lightning-deals :list="homeStore.toplike" v-if="route.query.name === '人气推荐'" />

    <demo-view ref="boxRef" :flag="homeStore.demoFlag" />
  </div>
</template>

<style lang='less' scoped>
  .correlation-container {
    height: 100vh;
    margin-top: 46px;
    overflow: scroll;

    img {
      width: 100%;
      height: 240px;
    }
    .correlation-name {
      line-height: 20px;
      padding: 10px 0;
      margin-top: 10px;
      background-color: #fff;
      font-size: 15px;
      text-align: center;
      color: #303133;
    }
  }

  :deep(.van-icon) {
    color: #000;
  }
</style>