<!-- 首页品牌部分 -->

<script setup lang='ts'>
  type brandData = {id:number, name:string, count:number, url:string}

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
    <router-link :to="{ name:'branddetail', query:{name:item.name} }" v-for="item in props.list" :key="item.id">
      <div class="goods-item">
        <img v-lazy="item.url">
        <div class="main">
          <div class="name">{{ item.name }}</div>
          <div class="val">商品数量：{{ item.count }}</div>
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
      height: 135px;
      padding-bottom: 20px;
      background-color: #fff;

      img {
        object-fit: contain;
        box-sizing: border-box;
        width: 100%;
        height: 75px;
      }
      .name {
        line-height: 40px;
        font-size: 16px;
        color: #303133;
      }
      .val {
        line-height: 20px;
        font-size: 12px;
        color: #909399;
      }
    }
  }
</style>
