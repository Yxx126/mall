<!-- 订单页面 -->

<template>
  <div class="order-container">
    <van-nav-bar
      title="订单"
      left-arrow
      fixed
      @click-left="goBack"
    />
    
    <!-- 商品卡片 商品立即购买 -->
    <div v-if="route.query.type === 'buy'">
      <div class="goods-item">
        <img :src="goodStore.good.good_url.split(',')[0]">
        <div class="goods-item-main">
          <div class="item-main">
            <van-text-ellipsis class="item-main-name" :content="goodStore.good.good_name" />
            <van-text-ellipsis class="item-main-desc" :content="goodStore.good.good_desc" />
          </div>

          <div style="font-size:13px">配置：{{ goodStore.selected_good_type.join(' ') }}</div>
          
          <div class="item-footer">
            <div class="item-footer-price"><span>￥</span>{{ goodStore.good.good_price + goodStore.good_addprice }}.00</div>
            <div class="item-footer-count">
              <van-stepper v-model="goodStore.good.good_count" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品卡片 稍后付款 -->
    <div v-if="route.query.type === 'nobuy'">
      <div class="goods-item">
        <img :src="orderStore.order.good_url">
        <div class="goods-item-main">
          <div class="item-main">
            <van-text-ellipsis class="item-main-name" :content="orderStore.order.good_name" />
            <van-text-ellipsis class="item-main-desc" :content="orderStore.order.good_desc" />
          </div>

          <div style="font-size:13px">配置：{{ orderStore.order.disposition }}</div>
          
          <div class="item-footer">
            <div class="item-footer-price"><span>￥</span>{{ orderStore.order.good_price/orderStore.order.good_count }}.00</div>
            <div class="item-footer-count">
              x{{ orderStore.order.good_count }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 购物车商品卡片 购物车购买 -->
    <div v-if="route.query.type === 'shopbuy'">
      <div class="goods-item" v-for="item in shopStore.shopCart.filter(item => item.checkout)" :key="item.id">
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
              <van-stepper v-model="item.good_count" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <!-- 总价 -->
      <div class="footer-one">
        <div>
          <p>商品总价</p>
          <p v-if="route.query.type === 'buy'">￥{{ price }}.00</p>
          <p v-if="route.query.type === 'nobuy'">￥{{ orderStore.order.good_price }}.00</p>
          <p v-if="route.query.type === 'shopbuy'">￥{{ addprice }}.00</p>
        </div>
        <div>
          <p>运费</p>
          <p>￥0.00</p>
        </div>
      </div>
      <!-- 收货信息 -->
      <div class="footer-two">
        <table>
          <tr>
            <th>收货人</th>
            <th>{{ address.name }}</th>
          </tr>
          <tr v-if="route.query.type === 'nobuy'">
            <th>收货地址</th>
            <th><div style="display: flex; justify-content: space-between; align-items: center;"><p>{{ address.address }}</p></div></th>
          </tr>
          <tr v-else>
            <th>收货地址</th>
            <th @click="updateAddress"><div style="display: flex; justify-content: space-between; align-items: center;"><p>{{ address.address }}</p><p>></p></div></th>
          </tr>
          <tr>
            <th>收货电话</th>
            <th>{{ address.tel }}</th>
          </tr>
        </table>
      </div>
    </footer>

    <!-- 支付按钮 未生成订单 -->
    <div class="order-btns" v-if="route.query.type==='buy' || route.query.type==='shopbuy'">
      <van-button block round @click="onClickLeft">稍后支付</van-button>
      <van-button block round type="danger" @click="buy">立即支付</van-button>
    </div>

    <!-- 支付按钮 已生成订单 -->
    <div class="order-btns" v-if="route.query.type==='nobuy' && route.query.status=='1'">
      <van-button block round @click="onClickLeft">取消订单</van-button>
      <van-button block round type="danger" @click="buy">立即支付</van-button>
    </div>

    <!-- 修改地址弹出层 -->
    <van-popup
      v-model:show="showBottom"
      position="bottom"
      :style="{ height: '70%' }"
    >
    <div class="adress-container">
      <van-address-list
        v-model="shopStore.chosenAddressId"
        :list="shopStore.addresslist"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @click-item="updateRess"
      >
        <template #top>
          <div style="font-size: 13px; color: #606266; text-align: center;" v-if="shopStore.addresslist.length===0">暂无收货地址，请添加收货地址！</div>
        </template>
      </van-address-list>
    </div>
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
  import { ref, onBeforeMount, computed } from 'vue';
  import type { Ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useGoodStore } from '@/stores/good';
  import { useShopStore } from '@/stores/shop';
  import { useOrderStore } from '@/stores/order';
  import dayjs from 'dayjs';
  import { showToast } from 'vant'

  const router = useRouter()
  const route = useRoute()
  const goodStore = useGoodStore()
  const shopStore = useShopStore()
  const orderStore = useOrderStore()      

  const price = computed(() => {
    return Number((goodStore.good.good_price + goodStore.good_addprice) * goodStore.good.good_count)
  })
  const addprice = computed(() => {
    return shopStore.shopCart.filter(item => item.checkout).reduce((amt, item) => amt += item.good_price * item.good_count, 0)
  })

  const goBack = () => {
    router.go(-1)
  }

  const params = {
    // 对应配置库存id
    sid: 0,
    good_id: goodStore.good.id,
    good_name: goodStore.good.good_name,
    good_desc: goodStore.good.good_desc,
    good_url: goodStore.good.good_url,
    good_price: 0,
    good_count: 1,
    disposition: goodStore.selected_good_type.join(' '),
    status: 1,
    time: '',
    brand: goodStore.good.brand.name,
  }  

  // 稍后支付、取消订单
  const onClickLeft = async () => {
    if(route.query.type === 'buy') {
      params.time = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      params.good_count = goodStore.good.good_count
      params.good_price = price.value
      params.status = 1
      params.sid = goodStore.good_inv.id
      params.good_url = goodStore.good.good_url.split(',')[0],
      await orderStore.addOrder(params)
    }
    if(route.query.type === 'shopbuy') {
      shopStore.shopCart.filter(item => item.checkout).forEach(async item => {
        params.good_id = item.good_id
        params.good_name = item.good_name
        params.good_desc = item.good_desc
        params.good_url = item.good_url
        params.disposition = item.disposition
        params.time = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
        params.good_count = item.good_count
        params.good_price = addprice.value
        params.brand = item.brand
        params.status = 1
        params.sid = item.sid
        await orderStore.addOrder(params)
        await shopStore.delshopping(item.id as number)
      })
    }
    if(route.query.type === 'nobuy' && route.query.status=='1') {
      const res = await orderStore.updateStatus(orderStore.order.id, orderStore.order.sid, 0)
      showToast(res)
      await orderStore.getOrder(route.query.getStatus, 6, false)
    }
    router.go(-1)
  }

  onBeforeMount(() => {
    address.value = shopStore.addresslist.filter(item => item.isDefault)[0]
  })
  // 收货地址
  type addressType = {
    id?: number|string,
    name?: string,
    address?: string,
    tel?: string,
    isDefault?: boolean,
  }
  const address:Ref<addressType> = ref({})

  // 修改收货地址
  const updateAddress = () => {
    showBottom.value = true
  }
  const updateRess = (e:addressData) => {
    address.value = e
    showBottom.value = false
  }
  // 修改地址弹出层
  const showBottom = ref(false)
  const onAdd = () => {
    router.push({name: 'address'})
  }
  type addressData = {
    id: string,
    name: string,
    tel: string,
    address: string,
    isDefault: boolean,
  }
  const onEdit = (item:addressData, index:number) => {
    router.push({name: 'address', query: {index: index}})
  }
  
  // 立即支付
  const buy = async () => {    
    if(route.query.type === 'buy') {
      params.time = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      params.good_count = goodStore.good.good_count
      params.good_price = price.value
      params.status = 2
      params.good_url = goodStore.good.good_url.split(',')[0],
      params.sid = goodStore.good_inv.id
      await orderStore.addOrder(params)
    }
    if(route.query.type === 'shopbuy') {
      shopStore.shopCart.filter(item => item.checkout).forEach(async item => {
        const time = new Date()
        params.good_id = item.good_id
        params.good_name = item.good_name
        params.good_desc = item.good_desc
        params.good_url = item.good_url
        params.disposition = item.disposition
        params.time = dayjs(time).format('YYYY-MM-DD HH:mm:ss')
        params.good_count = item.good_count
        params.good_price = addprice.value
        params.brand = item.brand
        params.status = 2
        params.sid = item.sid
        await orderStore.addOrder(params)        
        await shopStore.delshopping(item.id as number)        
      })
    }
    if(route.query.type === 'nobuy' && route.query.status == '1') {
      const res = await orderStore.updateStatus(orderStore.order.id, orderStore.order.sid, 2)
      showToast(res)
      await orderStore.getOrder(route.query.getStatus, 6, false)
    }
    router.go(-1)
  }
</script>

<style lang='less' scoped>
  .order-container {
    padding-top: 46px;
    overflow: hidden;

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

    .footer {
      background-color: #fff;

      .footer-one {
        padding: 5px 15px;
        border-bottom: 1px solid #ccc;

        div {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
          align-items: center;
          line-height: 20px;
          color: #323233;
          font-weight: 600;

          p:nth-child(1) {
            font-size: 14px;
          }
          p:nth-child(2) {
            font-size: 14px;
          }
        }
      }
      .footer-two {
        padding: 5px 15px;

        table {
          width: 345px;

          tr {
            display: flex;
            margin: 10px 0;

            th:nth-child(1) {
              flex: 1;
              margin-right: 7px;
              color: #323233;
              font-size: 14px;
              font-weight: 600;
              text-align: left;
            }
            th:nth-child(2) {
              flex: 4;
              text-align: left;
              color: #606266;
              font-size: 12px;
            }
          }
        }
      }
    }
    .order-btns {
      position: fixed;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      padding: 0 15px;

      button {
        width: 40vw;
        margin: 0 5px;
      }
    }
  }
</style>
