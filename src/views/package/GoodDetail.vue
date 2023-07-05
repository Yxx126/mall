<!-- 商品详情 -->

<script setup lang='ts'>
  import { ref, onBeforeMount } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useGoodStore } from '@/stores/good';
  import { useShopStore } from '@/stores/shop';
  import { useStarStore } from '@/stores/star';
  import { useUserinfoStore } from '@/stores/user';
  import { useRouterStore } from '@/stores/router';
  import { showImagePreview } from 'vant';
  import BrandDesc from '@/components/brand/BrandDesc.vue'; // 品牌信息组件
  import { showToast  } from 'vant'

  const router = useRouter()
  const route = useRoute()
  const goodStore = useGoodStore()
  const shopStore = useShopStore()
  const starStore = useStarStore()
  const userinfoStore = useUserinfoStore()
  const routerStore = useRouterStore()

  const onClickLeft = () => {
    router.go(-1)
    let timer:ReturnType<typeof setTimeout>
    routerStore.flag = true
    timer = setTimeout(() => {
      routerStore.flag = false
      clearTimeout(timer)
    }, 2000)
  }

  // 商品购买类型
  let typeKey:string[] = []
  let type:string[] = []
  // 商品参数
  let parameterKey:string[] = []
  let parameter:string[] = []

  onBeforeMount(async () => {
    const list = goodStore.good_type
    list['id'] = route.query.good_id
    // 获取商品详情
    await goodStore.getGooddetail(route.query.good_id)
    // 获取库存信息
    await goodStore.getGoodInventory(route.query.good_id)
    // 增加浏览量
    await goodStore.addViews(route.query.good_id)
    // 判断该商品是否被收藏
    const res = await starStore.selectGoodStar(route.query.good_id)
    if(res.code === 200) {
      star.icon.value = 'star'
      star.color.value = '#fa436a'
      star.text.value = '已收藏'
    }
    if(res.code === 201) {
      star.icon.value = 'star-o'
      star.color.value = '#000'
      star.text.value = '收藏'
    }

    images.value = goodStore.good.good_url.split(',')
    goodStore.getGoodInv(typeKey)
    goodStore.good_addprice = 0

    // 商品购买类型
    for(let key in goodStore.good.type) {
      if(goodStore.good.type[key] && key!=='id') {
        typeKey.push(key)
        type.push(goodStore.good.type[key])
      }
    }
    // 商品参数
    for(let key in goodStore.good.parameter) {
      if(goodStore.good.parameter[key] && key!=='id') {
        parameterKey.push(key)
        parameter.push(goodStore.good.parameter[key])
      }
    }
    goodStore.good_inv = goodStore.good_invs[0]
  })

  // 轮播图区域
  const images = ref([])
  const look = () => {
    showImagePreview({
      images: images.value,
      startPosition: swipeIndex.value,
      onChange: (e) => {
        swipeIndex.value = e        
      },
    })
  }
  type swiper = {
    index:number
  }
  const swipeIndex = ref(0)
  const show = ref(false);
  const updateIndex = (e:swiper) => {
    swipeIndex.value = e.index
  }

  // 商品详情主体
  // 弹出层
  const showName = ref('')
  const show_parameter = ref(false);
  const showPopup = (name:string) => {
    showName.value = name
    show_parameter.value = true
    if(is_buy.value===true) is_buy.value=false
  }

  // 更改商品所选类型
  const updateType = (item:string, index:number) => {
    goodStore.selected_good_type[index] = item
    goodStore.getGoodInv(typeKey)    
  }  
  
  // 加入购物车
  const addshopping = async () => {
    if(goodStore.good.sales === 0) return showToast('暂无库存！')
    let str1 = ''
    for(const key in goodStore.selected_good_type) {
      str1 = str1 + goodStore.selected_good_type[key] + ' '
    }
    await shopStore.addshopping({
      sid: goodStore.good_inv.id,
      user_id: userinfoStore.userinfo.id,
      good_id: goodStore.good.id,
      good_name: goodStore.good.good_name,
      good_desc: goodStore.good.good_desc,
      good_url: goodStore.good.good_url.split(',')[0],
      good_price: goodStore.good_price + goodStore.good_addprice,
      good_count: 1,
      brand: goodStore.good.brand.name,
      inventory: goodStore.good_inv.inventory,
      disposition: str1,
    })
  }
  // 收藏样式
  const star = {
    icon: ref('star-o'),
    color: ref('#000'),
    text: ref('收藏'),
  }
  // 收藏
  const addstar = async () => {
    let str1 = ''
    for(const key in goodStore.selected_good_type) {
      str1 = str1 + goodStore.selected_good_type[key] + ' '
    }
    const res = await starStore.addstar({
      user_id: userinfoStore.userinfo.id,
      good_id: goodStore.good.id,
      good_name: goodStore.good.good_name,
      good_desc: goodStore.good.good_desc,
      good_url: goodStore.good.good_url.split(',')[0],
      good_price: goodStore.good_price,
      good_count: 1,
      inventory: goodStore.good_inv.inventory,
      disposition: str1,
    })
    if(res.message === '收藏成功！') {
      star.icon.value = 'star'
      star.color.value = '#fa436a'
      star.text.value = '已收藏'
    }
    if(res.message === '取消收藏！') {
      star.icon.value = 'star-o'
      star.color.value = '#000'
      star.text.value = '收藏'
    }
    await starStore.getstar()
  }

  // 跳转到品牌详情
  const toBrand = (name:string) => {
    router.push({
      name: 'branddetail',
      query: {
        name: name,
      }
    })
  }
  // 立即购买
  const is_buy = ref(false)
  const buy = () => {
    if(goodStore.good_inv.inventory === 0) {
      return showToast ('暂无库存！')
    }
    showPopup('type')
    is_buy.value = true
  }
  const toOrder = () => {
    if(shopStore.addresslist.length === 0) {
      return router.push({name: 'addresslist'})
    }
    router.push({
      name: 'order',
      query: {
        type: 'buy',
      },
    })
  }
</script>

<template>
  <van-nav-bar
    :title="'商品详情'"
    left-arrow
    fixed
    @click-left="onClickLeft"
  />
  <div class="gooddetail-container">
    <header>
      <van-swipe lazy-render style="width: 100vw;" indicator-color="#000" :swipeTo="swipeIndex" @drag-end="updateIndex" :initial-swipe="swipeIndex">
        <van-swipe-item v-for="image in images" :key="image">
          <img style="width: 100vw;" :src="image" @click="look" />
        </van-swipe-item>
      </van-swipe>
      <van-image-preview v-model:show="show" :images="images">
      </van-image-preview>
    </header>

    <main>
      <div class="gooddetail-main-desc">
        <div>{{ goodStore.good.good_name }}</div>
        <div>{{ goodStore.good.good_desc }}</div>
        <div><span>￥</span>{{ goodStore.good_price + goodStore.good_addprice }}<p style="text-decoration: line-through;">￥{{ goodStore.good_price + goodStore.good_addprice }}</p></div>
        <div>
          <ul>
            <li>销量: {{ goodStore.good.sales }}</li>
            <li>库存: {{ goodStore.good_inv.inventory }}</li>
            <li>浏览量: {{ goodStore.good.views }}</li>
          </ul>
        </div>
      </div>

      <div class="gooddetail-main-share">
        <van-icon name="gold-coin-o" color="#fa436a" />
        <span>该商品分享可领49减10红包</span>
        <span>立即分享<van-icon name="arrow" color="#fa436a" size="12" /></span>
      </div>
      
      <div class="gooddetail-main-parameter">
        <ul>
          <li is-link @click="showPopup('type')">
            <p>购买类型</p>
            <div class="gooddetail-main-parameter-main">
              <div>
                <span v-for="(item, index) in goodStore.selected_good_type" :key="index">{{ item }}</span>
              </div>
              <van-icon name="arrow" color="#888" size="15" />
            </div>
          </li>
          <li is-link @click="showPopup('parameter')">
            <p>商品参数</p>
            <div><span>查看</span><van-icon name="arrow" color="#888" size="15" /></div>
          </li>
          <li>
            <p>优惠券</p>
            <div><span>使用优惠券</span><van-icon name="arrow" color="#888" size="15" /></div>
          </li>
        </ul>
      </div>
      <van-popup
        v-model:show="show_parameter"
        position="bottom"
        style="padding-bottom: 15px;"
        :overlay-style="{backgroundColor:'rgba(0,0,0,.4)'}"
      >
        <div v-if="showName==='type'">
          <div class="show-type">
            <div class="show-type-header">
              <img style="width: 85px; height: 85px; margin-right: 5px;" :src="images[0]">
              <div class="show-type-header-right">
                <p style="font-size: 16px; color: #fa436a;">￥{{ goodStore.good_price + goodStore.good_addprice }}</p>
                <p style="font-size: 13px; color: #606266;">库存: {{ goodStore.good_inv.inventory }}</p>
                <p style="font-size: 13px; color: #606266;">已选: <span style="margin-right: 5px;" v-for="(item, index) in goodStore.selected_good_type" :key="index">{{ item }}</span></p>
              </div>
            </div>
            <div class="show-type-main">
              <div v-for="(item,  index) in typeKey" :key="index">
                <div>{{ item }}</div>
                <div><span v-for="(it, i) in type[index].split(',')" :key="i" :class="it===goodStore.selected_good_type[index]? 'active': ''" @click="updateType(it, index)">{{ it }}</span></div>
              </div>
            </div>
          </div>
          <!-- 支付按钮 -->
          <div v-if="is_buy" class="buy-btns">
            <van-button block round @click="show_parameter = false">取消</van-button>
            <van-button block round @click="toOrder" type="danger">去支付</van-button>
          </div>
        </div>
        <div v-if="showName==='parameter'">
          <div class="show-parameter" v-for="(item, index) in parameterKey" :key="index"><p>{{ item }}:</p><span>{{ parameter[index] }}</span></div>
        </div>
      </van-popup>

      <!-- 品牌信息组件 -->
      <brand-desc :show_icon="false" :obj="goodStore.good.brand" />
    </main>

    <footer>
      <div class="gooddetail-footer-name">图文详情</div>
      <div class="gooddetail-footer-main">
        <img v-lazy="item.url" v-for="item in goodStore.good.urls" :key="item.id" style="width: 375px; display: block;">
      </div>
    </footer>

    <van-action-bar style="height: 50px;">
      <van-action-bar-icon icon="shop-o" text="品牌" @click.stop="toBrand(goodStore.good.brand.name)" />
      <van-action-bar-icon :icon="star.icon.value" :text="star.text.value" @click.stop="addstar" :color="star.color.value" />
      <van-action-bar-button type="warning" text="加入购物车" @click.stop="addshopping" />
      <van-action-bar-button type="danger" text="立即购买" @click="buy" />
    </van-action-bar>
  </div>
</template>

<style lang='less' scoped>
  .gooddetail-container {
    padding-top: 46px;
    padding-bottom: 50px;

    .gooddetail-main-desc {
      padding: 10px 15px;
      background-color: #fff;

      div:nth-child(1) {
        font-size: 16px;
        color: #303133;
        line-height: 23px;
      }
      div:nth-child(2) {
        font-size: 14px;
        color: #909399;
        line-height: 21px;
      }
      div:nth-child(3) {
        display: flex;
        align-items: end;
        line-height: 22px;
        padding: 5px 0;
        font-size: 17px;
        color: #fa436a;
        span {
          font-size: 13px;
        }
        p {
          font-size: 13px;
          color: #909399;
        }
      }
      div:nth-child(4) {
        font-size: 12px;
        color: #909399;

        ul {
          display: flex;
          align-items: center;

          li {
            flex: 1;
            line-height: 25px;
          }
        }
      }
    }

    .gooddetail-main-share {
      padding: 6px 15px;
      line-height: 25px;

      span:nth-child(2) {
        margin-left: 5px;
        font-size: 14px;
        color: #606266;
      }
      span:nth-child(3) {
        float: right;
        font-size: 12px;
        color: #fa436a;
      }
    }

    .show-type {
      padding: 5px 15px 0;
      .show-type-header {
        display: flex;
        align-items: center;
        .show-type-header-right {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: start;
          height: 68px;
        }
      }
      .show-type-main {
        padding: 15px 0 0 5px;

        div:nth-child(1) {
          font-size: 15px;
          color: #606266;
          line-height: 20px;
          margin-bottom: 10px;
        }

        div:nth-child(2) {
          font-size: 14px;
          color: #303133;

          span {
            display: inline-block;
            line-height: 30px;
            padding: 0 10px;
            margin: 0 10px 10px 0;
            text-align: center;
            background-color: #eee;
            border-radius: 15px;

            &.active {
              color: #fa436a;
            }
          }
        }
      }
    }

    .buy-btns {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0 10px;
      padding: 5px 15px;
    }

    .show-parameter {
      display: flex;
      padding: 15px 15px;
      border-bottom: 1px solid #e4e7ed;

      p {
        width: 70px;
        font-size: 13px;
        color: #606266; 
      }
      span {
        font-size: 13px;
        color: #303133; 
      }
    }

    .gooddetail-main-parameter {
      background-color: #fff;

      ul {
        li {
          display: flex;
          align-items: center;
          padding: 15px 15px;
          border-bottom: 1px solid #e4e7ed;

          p {
            width: 70px;
            font-size: 13px;
            color: #606266; 
          }
          .gooddetail-main-parameter-main {
            flex: 1;
            display: flex;
            align-items: center;
            font-size: 13px;
            color: #303133;

            div {
              display: flex;
              justify-content: start;
              align-items: center;

              span {
                margin-right: 5px;
              }
            }
          }

          div {
            flex: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            color: #303133; 
          }
        }
      }
    }

    .gooddetail-footer-name {
      height: 40px;
      margin-top: 10px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
      font-size: 15px;
      color: #303133;
    }
    .gooddetail-footer-main {
      width: 100vw;

      img {
        width: 100%!important;
      }
    }
  }

  :deep(.van-icon) {
    color: #000;
  }
  :deep(.van-swipe__indicator) {
    background-color: #1d2026;
  }
</style>