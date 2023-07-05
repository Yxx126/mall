<!-- 订单页面 -->

<script setup lang='ts'>
  import { ref, onBeforeMount } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useOrderStore } from '@/stores/order';
  import { showToast } from 'vant'

  const router = useRouter()
  const route = useRoute()
  const orderStore = useOrderStore()

  const onClickLeft = () => {
    router.go(-1)
  }

  onBeforeMount(async () => {
    orderStore.list_page = 1
    finished.value = false    
    await orderStore.getOrder(route.query.status, 6, false)
  })

  // 付款状态
  const orderStatus = (status:number) => {
    let name
    if(status === 0)  name = '取消订单'
    if(status === 1)  name = '待付款'
    if(status === 2)  name = '待发货'
    if(status === 3)  name = '待收货'
    if(status === 4)  name = '交易成功'
    return name
  }

  // 上拉加载
  const loading = ref(false);
  const finished = ref(false);
  const onLoad = () => {
    let timer
    clearTimeout(timer)
    timer = setTimeout(async () => {
      const res = await orderStore.getOrder(route.query.status, 6, true)
      if(res === 201) finished.value = true 
      loading.value = false
    }, 1000)
  }
  // 下拉刷新
  const refreshing = ref(false);
  const onRefresh = async () => {
    orderStore.list_page = 1
    loading.value = true
    finished.value = false
    let timer
    clearTimeout(timer)
    timer = setTimeout(async () => {
    await orderStore.getOrder(route.query.status, 6, false)
    refreshing.value = false
    loading.value = false
    }, 1000)
  }

  const toBrand = (name: string) => {
    router.push({
      name: 'branddetail',
      query: {
        name: name
      }
    })
  }
  type order = {
    id: number,
    sid: number,
    user_id: number,
    good_id: number,
    good_name: string,
    good_desc: string,
    good_url: string,
    good_price: number,
    good_count: number,
    brand: string,
    disposition: string,
    status: number,
    time: string,
  }
  const toOrder = (list: order) => {
    orderStore.order = list
    router.push({
      name: 'order',
      query: {
        type: 'nobuy',
        status: list.status,
        getStatus: route.query.status,
      }
    })
  }
  // 删除已完成订单
  const delOrder = async (id:number, status:number) => {
    switch(status) {
      case 0:
        await orderStore.delOrder(id)
        await orderStore.getOrder(route.query.status, 6, false)
        break
      case 1:
        showToast('该订单尚未完成!')
        break
      case 2:
        showToast('该订单尚未完成!')        
        break
      case 3:
        showToast('该订单尚未完成!')        
        break
      case 4:
        await orderStore.delOrder(id)
        await orderStore.getOrder(route.query.status, 6, false)
        break
      default:
        break
    }
  }
  // 取消订单
  const notOrder = async (id:number, sid:number) => {
    await orderStore.updateStatus(id, sid, 0)
    orderStore.getOrder(route.query.status, 6, false)
  }
</script>

<template>
  <van-nav-bar
    :title="(route.query.title as string)"
    left-arrow
    fixed
    @click-left="onClickLeft"
    style="height: 6.9vh;"
  />

  <!-- 下拉刷新 -->
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <!-- 上拉加载 -->
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="50"
      :immediate-check="false"
      @load="onLoad"
    >
      <div style="margin-top: 6.9vh;">
        <!-- item -->
        <div v-for="item in orderStore.list" :key="item.id">
          <!-- 滑动单元格 -->
          <van-swipe-cell>
            <div class="goods-title">
              <div class="goods-title-main">
                <div @click="toBrand(item.brand)"><van-icon name="shop-o" /> {{ item.brand }}</div>
                <div>
                  <van-count-down v-if="item.status===1" millisecond :time="new Date(item.time).getTime() + (15 * 60 * 1000) - new Date().getTime()" format="mm:ss:SS" @finish="notOrder(item.id,item.sid)" />
                  <p :class="item.status===0? 'status-item': ''">{{ orderStatus(item.status) }}</p>
                </div>
              </div>
            </div>
            <div class="goods-item" @click="toOrder(item)">
              <img :src="item.good_url">
              <div class="goods-item-main">
                <div class="item-main">
                  <van-text-ellipsis class="item-main-name" :content="item.good_name" />
                  <van-text-ellipsis class="item-main-desc" :content="item.good_desc" />
                </div>

                <div style="font-size:13px">配置：{{ item.disposition }}</div>
                
                <div class="item-footer">
                  <div class="item-footer-price"><span>￥</span>{{ item.good_price }}.00</div>
                  <div class="item-footer-count">
                    x{{ item.good_count }}
                  </div>
                </div>
              </div>
            </div>
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" @click="delOrder(item.id, item.status)" />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<style lang='less' scoped>
  .goods-title {
    padding: 8px 16px;
    background-color: #fff;
    border-bottom: 1px solid #eee;

    .goods-title-main {
      display: flex;
      justify-content: space-between;
      align-items: center;

      div:nth-child(1) {
        font-size: 13px;
        font-weight: 600;
        color: #303133;
      }
      div:nth-child(2) {
        display: flex;
        justify-content: end;
        align-items: center;

        p {
          font-size: 13px;
          font-weight: 600;
          color: #fa436a;
          margin-left: 10px;

          &.status-item {
            color: #606266;
          }
        }
      }
    }
  }
  .goods-item{
    display: flex;
    padding: 8px 16px;
    margin: 0;
    background-color: #fff;
    border-bottom: 1px solid #ccc;

    img {
      width: 88px;
      height: 88px;
      margin-right: 8px;
      border-radius: 5px;
      object-fit: cover;
    }
    .goods-item-main {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      .item-main {
        width: 100%;
        .item-main-name {
          line-height: 16px;
          font-size: 13px;
          font-weight: 600;
          color: #323233;
        }
        .item-main-desc {
          line-height: 20px;
          font-size: 13px;
          color: #969799
        }
      }
      .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-footer-price {
          font-size: 14px;
          font-weight: 600;

          span {
            font-size: 12px;
          }
        }
        .item-footer-count {
          transform: translate(-12px,-3px);
          font-size: 13px;
          color: #606266;
        }
      }
    }
  }
  .delete-button {
    height: 100%;
  }
</style>
