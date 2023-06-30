<!-- 相关品牌...页面 -->

<script setup lang='ts'>
  import { ref, onBeforeMount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useHomeStore } from '@/stores/home';
  import HomeBrand from '@/components/home/homeFloorItem/HomeBrand.vue';  // 首页品牌部分
  import LightningDeals from '@/components/home/homeFloorItem/LightningDeals.vue';  // 首页秒杀专区部分

  const route = useRoute()
  const router = useRouter()
  const homeStore = useHomeStore()

  const onClickLeft = () => {
    router.go(-1)
  }
  onBeforeMount(() => {
    loading.value = false
    finished.value = false
  })

  const loading = ref(false)
  const finished = ref(false)
  const refreshing = ref(false)
  // 上拉加载
  const onLoad = async () => {
    if(finished.value === true ) return false
    if(loading.value === true ) return false
    loading.value = true
    let timer
    clearTimeout(timer)
    timer =setTimeout(async () => {
      let res
      if(route.query.name === '品牌制造商直达') res = await homeStore.getBrand(6, true)
      if(route.query.name === '新鲜好物') res = await homeStore.getBrand(4, true)
      if(route.query.name === '人气推荐') res = await homeStore.getBrand(4, true)
      loading.value = false
      if(res === 201) {
        finished.value = true
      }
    }, 1000);
  }
  // 下拉刷新
  const onRefresh = () => {
    if(loading.value === true ) return false
    finished.value = false;
    loading.value = true
    homeStore.brand_page = 1
    homeStore.lightning_page = 1
    homeStore.toplike_page = 1
    let timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      if(route.query.name === '品牌制造商直达') homeStore.getBrand(6, false)
      if(route.query.name === '新鲜好物') homeStore.getLightning(4, false)
      if(route.query.name === '人气推荐') homeStore.getToplike(4, false)
      loading.value = false;
      refreshing.value = false
    }, 1000)
  }
</script>

<template>
  <div class="correlation-container">
    <van-nav-bar
      :title="(route.query.name as string)"
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

    
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :loading="loading"
        :finished="finished"
        :finished-text="'已全部加载完成！'"
        :offset="50"
        @load="onLoad"
      >
      <home-brand :list="homeStore.brand" v-if="route.query.name === '品牌制造商直达'" />
      <lightning-deals :list="homeStore.lightning" v-if="route.query.name === '新鲜好物'" />
      <lightning-deals :list="homeStore.toplike" v-if="route.query.name === '人气推荐'" />
      </van-list>
    </van-pull-refresh>
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