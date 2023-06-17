<!-- 首页秒杀专区 -->

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
  <main>
    <router-link :to="{ name:'gooddetail', query:{good_id:item.id} }" v-for="item in props.list" :key="item.id">
      <div class="goods-item">
        <img v-lazy="item.good_url.split(',')[0]">
        <div class="main">
          <div class="name">{{ item.good_name }}</div>
          <div class="val">{{ item.good_desc }}</div>
          <div class="price">￥{{ item.good_price }}</div>
        </div>
      </div>
    </router-link>
  </main>
</template>

<style lang='less' scoped>
  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: start;
    padding: 0 15px;
    background-color: #fff;
    .goods-item {
      width: 165px;
      padding-bottom: 20px;
      background-color: #fff;

      img {
        width: 100%;
        height: 165px;
      }
      .name, .val {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .name {
        line-height: 40px;
        font-size: 16px;
        color: #303133;
      }
      .val {
        line-height: 16px;
        font-size: 12px;
        color: #909399;
      }
      .price {
        margin-top: 8px;
        font-size: 16px;
        color: #FA436A;
      }
    }
  }
</style>
