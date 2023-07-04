<!-- 商品列表页面 -->

<script setup lang='ts'>
  import { ref, onBeforeMount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useClassifyStore } from '@/stores/classify';
  import LightningDeals from '@/components/home/homeFloorItem/LightningDeals.vue';

  const route = useRoute()
  const router = useRouter()
  const classifyStore = useClassifyStore()

  const goodlist_id = ref(route.query.uid)
  const val = ref(route.query.val)

  const loading = ref(false)
  const finished = ref(false)
  const finishedText = ref('已全部加载完成！')
  const refreshing = ref(false)

  const onClickLeft = () => {
    router.go(-1)
  }

  const uidActive = ref(goodlist_id)
  const activeName = ref('综合顺序')
  const updmIndex = ref(0)
  const active = (name:string) => {
    window.scrollTo(0, 0)
    activeName.value = name
    if(name !== '价格') updmIndex.value = 0
    if(name === '价格' && updmIndex.value !== 0) updmIndex.value===1? updmIndex.value=2: updmIndex.value=1
    if(name === '价格' && updmIndex.value === 0) updmIndex.value = 1
     
    classifyStore.goodlist_page = 1
    finished.value = false
    if(name === '综合顺序') classifyStore.getGoodlist(goodlist_id.value, val.value, 6, false)
    if(name === '销量顺序') classifyStore.getGoodlistSales(goodlist_id.value, val.value,  6, false)
    if(name === '价格') classifyStore.getGoodlistPrice(goodlist_id.value, val.value, 6, false, updmIndex.value)
  }
  
  onBeforeMount(() => {
    classifyStore.goodlist_page = 1
    finished.value = false
    classifyStore.getGoodlist(goodlist_id.value, val.value, 6, false)
  })
  
  // 上拉加载
  const onLoad = async () => {
    if(finished.value === true ) return false
    if(loading.value === true ) return false    
    loading.value = true
    let timer
    clearTimeout(timer)
    timer =setTimeout(async () => {
      let res
      if(activeName.value === '综合顺序') res = await classifyStore.getGoodlist(goodlist_id.value, val.value, 6, true)
      if(activeName.value === '销量顺序') res = await classifyStore.getGoodlistSales(goodlist_id.value, val.value, 6, true)
      if(activeName.value === '价格') res = await classifyStore.getGoodlistPrice(goodlist_id.value, val.value, 6, true, updmIndex.value)
      loading.value = false
      if(res === 201) {
        if(classifyStore.goodlist.length == 0) finishedText.value = '暂无数据！'
        if(classifyStore.goodlist.length != 0) finishedText.value = '已全部加载完成！'
        finished.value = true
      }
    }, 1000);
  }
  // 下拉刷新
  const onRefresh = () => {
    if(loading.value === true ) return false
    finished.value = false;
    loading.value = true
    classifyStore.goodlist_page = 1
    let timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      if(activeName.value === '综合顺序') classifyStore.getGoodlist(goodlist_id.value, val.value, 6, false)
      if(activeName.value === '销量顺序') classifyStore.getGoodlistSales(goodlist_id.value, val.value , 6, false)
      if(activeName.value === '价格') classifyStore.getGoodlistPrice(goodlist_id.value, val.value, 6, false, updmIndex.value)
      loading.value = false;
      refreshing.value = false
    }, 1000)
  }

  const left = ref('100%')
  const show = ref(false);
  const showMenu = () => {
    left.value = '0'
    show.value = true
  }
  const hideMenu = () => {
    left.value = '100%'
    show.value = false
  }

  const updateMain = async (uid:number) => {    
    finished.value = false
    hideMenu()
    uidActive.value = uid
    classifyStore.goodlist_page = 1
    let res
    if(activeName.value === '综合顺序') res = await classifyStore.getGoodlist(uid, undefined, 6, false)
    if(activeName.value === '销量顺序') res = await classifyStore.getGoodlistSales(uid, undefined, 6, false)
    if(activeName.value === '价格') res = await classifyStore.getGoodlistPrice(uid, undefined, 6, false, updmIndex.value)
    if(res===201) {
      if(classifyStore.goodlist.length == 0) finishedText.value = '暂无数据！'
      if(classifyStore.goodlist.length != 0) finishedText.value = '已全部加载完成！'
      finished.value = true
    }
  }
</script>

<template>
  <div class="goodlist-container">
    <van-nav-bar
      title="商品列表"
      left-arrow
      fixed
      @click-left="onClickLeft"
      class="goodlist-container-title"
      style="height: 6.9vh;"  
    />

    <div class="goodlist-menu">
      <div class="goodlist-menu-item">
        <div :class="activeName==='综合顺序'? 'active': ''" @click="active('综合顺序')">综合顺序</div>
        <div :class="activeName==='销量顺序'? 'active': ''" @click="active('销量顺序')">销量顺序</div>
        <div class="goodlist-price" :class="activeName==='价格'? 'active': ''" @click="active('价格')">
          价格
          <div class="goodlist-price-updm">
            <van-icon name="arrow-up" :class="updmIndex===1? 'updm': ''" />
            <van-icon name="arrow-down" :class="updmIndex===2? 'updm': ''" style="transform: translateY(-3px);" />
          </div>
        </div>
      </div>
      <div class="menu-item-more" @click.stop="showMenu">
        <van-icon name="bars" class="icons-bars" />
      </div>
    </div>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :loading="loading"
        :finished="finished"
        :finished-text="finishedText"
        :offset="50"
        @load="onLoad"
      >
        <lightning-deals :list="classifyStore.goodlist" />
      </van-list>
    </van-pull-refresh>
  </div>

  <div class="more-menu" @click.stop.self="hideMenu" style="height: 93.1vh;" :style="{transform: `translateX(${left})`}">
    <div class="more-menu-item" v-for="(item, index) in classifyStore.classifyOne" :key="item.id">
      <div class="more-menu-item-name" @click.prevent>{{ item.name }}</div>
      <van-cell :class="it.id==uidActive? 'active': ''" :title="it.name" v-for="it in classifyStore.twoList[index]" :key="it.id" @click.stop="updateMain(it.id)" />
    </div>
  </div>

  <!-- 笼罩层 -->
  <van-overlay :show="show" z-index="99" />
</template>

<style lang='less' scoped>
  .goodlist-container {
    padding-top: 86px;
    .goodlist-container-title {
      z-index: 999;
    }
    .goodlist-menu {
      position: fixed;
      top: 46px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 40px;
      background-color: #fff;
      z-index: 99;

      .goodlist-menu-item {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goodlist-price {
          position: relative;
          .goodlist-price-updm {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(15px);
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 20px;

            .updm {
              color: #fa436a;
            }
          }
        }

        div {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          font-size: 15px;
          color: #303133;

          &.active {
            color: #fa436a;
          }
        }
      }
      .menu-item-more {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        border-left: 1px solid #ccc;

        .icons-bars{
          font-size: 20px;
        }
      }
    }
  }
  .more-menu {
    overflow: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 621px;
    background-color: transparent;
    transition: all .5s;
    z-index: 999;
    .more-menu-item {
      width: 80vw;
      transform: translateX(20vw);
      .more-menu-item-name {
        height: 32px;
        line-height: 32px;
        padding-left: 16px;
        background-color: #f8f8f8;
        font-size: 15px;
        color: #303133;
      }

      .active {
        color: #fa436a;
      }
    }
  }

  :deep(.van-icon) {
    color: #000;
    font-size: 12px;
  }
</style>