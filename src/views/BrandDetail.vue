<script setup lang='ts'>
  import { ref, onBeforeMount } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useHomeStore } from '@/stores/home';
  import BrandDesc from '@/components/brand/BrandDesc.vue'; // 品牌信息组件
  import LightningDeals from '@/components/home/homeFloorItem/LightningDeals.vue'; // 相关商品组件

  const router = useRouter()
  const route = useRoute()
  const homeStore = useHomeStore()

  const onClickLeft = () => {
    router.go(-1)
  }

  onBeforeMount(() => {
    homeStore.brand_goods_page = 1,
    finished.value = false
    // 获取品牌详情
    homeStore.getBrandDetail(route.query.name)
    // 获取品牌的商品数据
    homeStore.getBrandGoodlist(route.query.name, 6, false)    
  })

  
  const loading = ref(false);
  const finished = ref(false);
  const refreshing = ref(false);
  // 上拉加载
  const onLoad = () => {    
    let timer
    let res
    clearTimeout(timer)
    timer = setTimeout(async () => {
      res = await homeStore.getBrandGoodlist(route.query.name, 6, true)
      loading.value = false
      if(res===201) finished.value = true
    }, 1000)
  }
  // 下拉刷新
  const onRefresh = () => {
    if(loading.value) return false
    finished.value = false;
    loading.value = true
    homeStore.brand_goods_page = 1
    let timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      homeStore.getBrandGoodlist(route.query.name, 6, false)
      loading.value = false;
      refreshing.value = false
    }, 1000)
  }
</script>

<template>
  <van-nav-bar
    :title="'品牌详情'"
    left-arrow
    fixed
    @click-left="onClickLeft"
  />

  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <div class="brand-container">
      <!-- 图片 -->
      <img style="width: 100vw; object-fit: cover; margin-bottom: 10px;" :src="homeStore.branddetail.top_url" />
      <!-- 品牌信息 -->
      <brand-desc :show_name="false" :tobrand="false" :obj="homeStore.branddetail" />
      <!-- 品牌故事 -->
      <div class="brand-tale">
        <div>品牌故事</div>
        <p>{{ homeStore.branddetail.tale }}</p>
      </div>
      <!-- 相关商品 -->
      <div class="brand-goods-title">相关商品</div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="50"
        @load="onLoad"
      >
        <lightning-deals :list="homeStore.brand_goodlist" />
      </van-list>
    </div>
  </van-pull-refresh>
</template>

<style lang='less' scoped>
  .brand-container {
    margin-top: 46px;

    .brand-tale {
      margin-top: 10px;
      background-color: #fff;

      div {
        line-height: 20px;
        padding: 10px ;
        border-bottom: 1px solid #eee;
        font-size: 15px;
        color: #303133;
        text-align: center;
      }
      p {
        line-height: 16px;
        padding: 15px;
        font-size: 12px;
        color: #909399;
      }
    }
    .brand-goods-title {
      padding: 10px 0;
      margin-top: 10px;
      line-height: 20px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
      font-size: 15px;
      color: #303133;
      text-align: center;
    }
  }
</style>