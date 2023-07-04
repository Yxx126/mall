<!-- 首页页面 -->

<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';
  import { useHomeStore } from '@/stores/home';
  import SwiperView from '@/components/swiper/SwiperView.vue';  // swiper组件
  import HomeNav from '@/components/home/homeNav/HomeNav.vue';  // 首页导航栏组件
  import HomeFloor from '@/components/home/homeFloor/HomeFloor.vue';  // 首页楼层组件
  import LightningDeals from '@/components/home/homeFloorItem/LightningDeals.vue';  // 首页秒杀专区
  import FreshGood from '@/components/home/homeFloorItem/FreshGood.vue';  // 首页新鲜好物
  import HomePopular from '@/components/home/homeFloorItem/HomePopular.vue';  // 首页人气推荐
  import DemoView from '@/components/demo/DemoView.vue';  // 上拉加载更多
  import { scrollEvent } from '@/hooks/scrollEvent/scrollEvent';

  const homeStore = useHomeStore()
  const router = useRouter()
  const routers = [true, false, true, true, false]

  onBeforeMount(() => {    
    homeStore.brand_page = 1
    homeStore.lightning_page = 1
    homeStore.fresh_page = 1
    homeStore.toplike_page = 1
    homeStore.youlike_page = 1
    homeStore.scrollFlag = false
    homeStore.demoFlag = true

    homeStore.youlike=[]
    homeStore.getBrand()
    homeStore.getHomeFloor()
    homeStore.getLightning()
    homeStore.getToplike()
    homeStore.getYoulike()
  })

  const box1Ref = ref()
  const boxRef = ref()
  const scroll = () => {
    scrollEvent(boxRef, box1Ref, 'youlike', true)
  }
  // 跳转到搜索页面
  const toSearch = () => {
    router.push({name: 'search'})
  }
</script>

<template>
  <div class="home-search" @click="toSearch">
    <div>
      <van-icon name="search" size="4.8vw" color="#969799" style="padding:0 2px 0 12px;" />
      <p style="color: #969799; font-size: 14px;">请输入搜索关键词</p>
    </div>
  </div>

  <div class="box1" @scroll="scroll" ref="box1Ref">
    <swiper-view />

    <main>
      <home-nav />
      <home-floor v-for="(item, index) in homeStore.homeFloor" :key="item.id" :obj="item" :router="routers[index]">
        <template #header>
          <div v-if="item.name === '秒杀专区'">
            <van-count-down millisecond :time="new Date('2023/08/02 14:00:00').getTime() - new Date().getTime()">
              <template #default="timeData">
                <span class="block">{{ timeData.days }}</span>
                <span class="colon">天 </span>
                <span class="block">{{ timeData.hours<10? '0' + timeData.hours: timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes<10? '0' + timeData.minutes: timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds<10? '0' + timeData.seconds: timeData.seconds }}</span>
              </template>
            </van-count-down>
          </div>
          <div v-if="item.name === '猜你喜欢'"></div>
        </template>
        <template #main>
          <lightning-deals v-if="item.name === '秒杀专区'" :list="homeStore.lightning"/>
          <fresh-good v-if="item.name === '新鲜好物'" :list="homeStore.lightning" />
          <home-popular v-if="item.name === '人气推荐'" :list="homeStore.toplike" />
          <lightning-deals v-if="item.name === '猜你喜欢'" :list="homeStore.youlike"/>
        </template>
      </home-floor>
    </main>

    <DemoView ref="boxRef" :flag="homeStore.demoFlag" />
  </div>

  <tabbar-view />
</template>

<style lang="less" scoped>
  .home-search {
    padding: 10px 12px;
    background-color: #fff;

    div {
      display: flex;
      align-items: center;
      height: 34px;
      background-color: #f7f8fa;
    }
  }
  .box1 {
    height: 100vh;
    padding-bottom: 50px;
    overflow: scroll;
    transition: padding-bottom 0.5s;
  }

  .block {
    padding: 3px;
    background-color: #fa436a;
    color: #fff;
  }
  .colon {
    margin: 0 2px;
  }
</style>
