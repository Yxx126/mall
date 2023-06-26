<!-- 收藏页面 -->

<script setup lang='ts'>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStarStore } from '@/stores/star';
  import BrandDesc from '@/components/brand/BrandDesc.vue';

  const router = useRouter()
  const starStore = useStarStore()

  const onClickLeft = () => {
    router.go(-1)
  }
  const active = ref(0)
  // 跳转到商品详情页
  const toGooddetail = (id:number) => {
    router.push({
      name: 'gooddetail',
      query: {
        good_id: id
      }
    })
  }
  // 删除收藏数据
  const delStar = async (id:number) => {
    await starStore.delstar(id)
    await starStore.getstar()
  }
</script>

<template>
  <van-nav-bar
    title="收藏"
    left-arrow
    fixed
    @click-left="onClickLeft"
  />
  <div class="star-container">
    <van-tabs v-model:active="active" sticky animated>
    <van-tab title="商品">
      <!-- 商品卡片 -->
      <div v-if="starStore.goodStar.length">
        <van-swipe-cell v-for="item in starStore.goodStar" :key="item.id">
          <div class="goods-item">
            <img :src="item.good_url" @click.stop="toGooddetail(item.good_id)">
            <div class="goods-item-main">
              <div class="item-main" @click.stop="toGooddetail(item.good_id)">
                <div class="item-main-name">{{ item.good_name }}</div>
                <div class="item-main-desc">{{ item.good_desc }}</div>
              </div>

              <div style="font-size:13px">配置：{{ item.disposition }}</div>
              
              <div class="item-footer">
                <div class="item-footer-price"><span>￥</span>{{ item.good_price }}.00</div>
              </div>
            </div>
          </div>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="delStar(item.id as number)" />
          </template>
        </van-swipe-cell>
      </div>
      <div style="margin-top: 10px; font-size: 13px; color: #606266; text-align: center;" v-else>收藏为空！</div>
    </van-tab>
    <van-tab title="品牌">
      <!-- 品牌列表 -->
      <div v-if="starStore.brandStar.length">
        <van-swipe-cell v-for="item in starStore.brandStar" :key="item.id">
          <brand-desc :show_name="false" :obj="item" />
        </van-swipe-cell>
      </div>
      <div style="margin-top: 10px; font-size: 13px; color: #606266; text-align: center;" v-else>收藏为空！</div>
    </van-tab>
  </van-tabs>
  </div>
</template>

<style lang='less' scoped>
  .star-container {
    padding-top: 46px;

    .goods-item{
      display: flex;
      padding: 8px 16px;
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
          width: 247px;
          .item-main-name {
            line-height: 20px;
            font-size: 13px;
            font-weight: 600;
            color: #323233;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .item-main-desc {
            line-height: 20px;
            font-size: 13px;
            color: #969799;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
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

  :deep(.van-button--danger) {
    border: 1px solid #fff;
    margin: 0;
  }
</style>
