<!-- 首页人气推荐 -->

<script setup lang='ts'>
  type brandData = {id:number, good_name:string, good_desc:string, good_price:number, good_url:string}

  const props = defineProps({
    list: {
      type: Array<brandData>,
      default: () => {
        return []
      },
    },
  })
</script>

<template>
  <div class="popular-container">
    <router-link :to="{ name:'gooddetail', query:{good_id:item.id} }" v-for="item in props.list" :key="item.id">
      <div class="popular-item">
        <img :src="item.good_url.split(',')[0]">
        <div class="popular-item-right">
          <div class="popular-item-right-name">{{ item.good_name }}</div>
          <div class="popular-item-right-desc">{{ item.good_desc }}</div>
          <div class="popular-item-right-price">￥{{ item.good_price }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang='less' scoped>
  .popular-container {
    .popular-item {
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 0 15px 20px;

      img {
        width: 105px;
        height: 125px;
        margin-right: 20px;
      }
      .popular-item-right {
        width: 220px;
        .popular-item-right-name {
          line-height: 40px;
          font-size: 16px;
          color: #303133;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .popular-item-right-desc {
          font-size: 12px;
          color: #909399;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .popular-item-right-price {
          margin-top: 8px;
          line-height: 20px;
          font-size: 16px;
          color: #fa463f;
        }
      }
    }
  }
</style>
