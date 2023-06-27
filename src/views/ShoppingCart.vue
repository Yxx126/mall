<!-- 购物车页面 -->

<script setup lang='ts'>
  import { ref, onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';
  import { useShopStore } from '@/stores/shop';
  import { showFailToast } from 'vant';
  import Cookies from 'js-cookie';
  import TabbarView from '@/components/tabbar/TabbarView.vue';

  const router = useRouter()
  const shopStore = useShopStore()

  const toLogin = () => {
    router.push({ name: 'login' })
  }

  onBeforeMount(() => {
    checked.value = shopStore.shopCart.every(item => item.checkout)
  })

  // 是否全选
  const checked = ref(false)
  // 购买按钮
  const onSubmit = () => {
    const buyarr = shopStore.shopCart.filter(item => item.checkout)
    // 判断是否选中了商品
    if(buyarr.length === 0) return showFailToast('请选择要购买的商品！')
    // 收货地址为空
    if(shopStore.addresslist.length === 0) return router.push({name: 'addresslist'})
    // 跳转支付页面
    console.log('跳转支付页面');
  }
  // 删除购物车数据
  const delItem = async (id:number) => {
    await shopStore.delshopping(id)
    await shopStore.getshopping()
  }
  // 跳转到商品详情页
  const toGooddetail = (id:number) => {
    router.push({
      name: 'gooddetail',
      query: {
        good_id: id
      }
    })
  }
  // 商品复选框
  const updateChk = async () => {
    const flag = shopStore.shopCart.every(item => item.checkout)
    checked.value = flag
  }
  // 全选按钮
  const allChk = () => {
    const flag = checked.value
    shopStore.shopCart.forEach(item => item.checkout=flag)
  }
</script>

<template>
  <div class="shopping-container">
    <div v-if="!Cookies.get('token')">
      <van-nav-bar
        title="购物车"
        fixed
      />
      <div style="font-size: 15px; color: #606266; text-align: center; margin-top: 96px; margin-bottom: 20px;">暂未登录，请点击登录</div>
      <van-button @click.stop="toLogin" round block style="width: 90%; margin: 0 auto;" type="primary">点击登录</van-button>
    </div>

    <div v-else class="show-shopping">
      <van-nav-bar
        title="购物车"
        fixed
      />
      
      <!-- 商品卡片 -->
      <div v-if="shopStore.shopCart.length">
        <van-swipe-cell v-for="item in shopStore.shopCart" :key="item.id">
          <div class="goods-item">
            <van-checkbox style="width: 40px;" v-model="item.checkout" @click="updateChk"></van-checkbox>
            <img :src="item.good_url" @click.stop="toGooddetail(item.good_id)">
            <div class="goods-item-main">
              <div class="item-main" @click.stop="toGooddetail(item.good_id)">
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
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="delItem(item.id as number)" />
          </template>
        </van-swipe-cell>
      </div>
      
      <div style="margin-top: 10px; font-size: 13px; color: #606266; text-align: center;" v-else>购物车为空，请添加商品！</div>

      <!-- 立即购买模块 -->
      <van-submit-bar style="margin-bottom: 50px; border-bottom: 1px solid #ccc;" :price="shopStore.addPrice" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="allChk">全选</van-checkbox>
      </van-submit-bar>

      <tabbar-view />
    </div>
  </div>
  
  <tabbar-view />
</template>

<style lang='less' scoped>
  .shopping-container {
    .show-shopping {
      padding-top: 46px;
      padding-bottom: 100px;

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
          }
        }
      }

      .delete-button {
        height: 100%;
      }
    }
  }
</style>
