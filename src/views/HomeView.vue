<!-- 首页页面 -->

<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue';
  import { useHomeStore } from '@/stores/home';
  import SwiperView from '@/components/swiper/SwiperView.vue';  // swiper组件
  import HomeNav from '@/components/home/homeNav/HomeNav.vue';  // 首页导航栏组件
  import HomeFloor from '@/components/home/homeFloor/HomeFloor.vue';  // 首页楼层组件
  import LightningDeals from '@/components/home/homeFloorItem/LightningDeals.vue';  // 首页秒杀专区
  import FreshGood from '@/components/home/homeFloorItem/FreshGood.vue';  // 首页新鲜好物
  import HomePopular from '@/components/home/homeFloorItem/HomePopular.vue';  // 首页人气推荐
  import DemoView from '@/components/demo/DemoView.vue';  // 上拉加载更多


  const homeStore = useHomeStore()
  const router = [true, false, true, true, false]

  onBeforeMount(() => {
    homeStore.page = 1
    homeStore.youlike=[]
    homeStore.getBrand()
    homeStore.getHomeFloor()
    homeStore.getLightning()
    homeStore.getYoulike()
  })

  // 滚动事件
  const box1Ref = ref()
  const boxRef = ref()
  const demoVal = ref('上拉加载更多')
  let flag = false
  let timer
  const scrollEvent = () => {
    if(Math.round(boxRef.value.$el.offsetTop - box1Ref.value.scrollTop - 50) < box1Ref.value.offsetHeight) {      
      if(flag) return false
      flag = true
      clearTimeout(timer)
      timer = setTimeout(async () => {
          const res = await homeStore.getYoulike(4)
          console.log(res);
          if(res === '已全部加载完毕！') {
            demoVal.value = '已全部加载完成！'
            // flag = true
            return console.log('flag', flag);
            
          }
          return flag = false
      }, 1000)
    }
  }
</script>

<template>
  <div class="box1" @scroll="scrollEvent" ref="box1Ref">
    <swiper-view />

    <main>
      <home-nav />
      <home-floor v-for="(item, index) in homeStore.homeFloor" :key="item.id" :obj="item" :router="router[index]">
        <template #header>
          <div v-if="item.name === '秒杀专区'">123</div>
          <div v-if="item.name === '猜你喜欢'"></div>
        </template>
        <template #main>
          <lightning-deals v-if="item.name === '秒杀专区'" :list="homeStore.lightning"/>
          <fresh-good v-if="item.name === '新鲜好物'" :list="homeStore.lightning" />
          <home-popular v-if="item.name === '人气推荐'" :list="homeStore.lightning" />
          <lightning-deals v-if="item.name === '猜你喜欢'" :list="homeStore.youlike"/>
        </template>
      </home-floor>
    </main>

    <DemoView ref="boxRef" :value="demoVal" />
  </div>
</template>

<style lang="less" scoped>
  .box1 {
    height: 100vh;
    overflow: scroll;
    transition: padding-bottom 0.5s;
  }
</style>
