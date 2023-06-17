<!-- 首页新鲜好物 -->

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
  <div class="fresh-contariner">
    <router-link :to="{ name:'gooddetail', query:{good_id:item.id} }" v-for="item in props.list" :key="item.id">
      <div class="fresh-item">
        <img v-lazy="item.good_url.split(',')[0]">
        <div class="fresh-item-name">{{ item.good_name }}</div>
        <div class="fresh-item-desc">{{ item.good_desc }}</div>
        <div class="fresh-item-price">￥{{ item.good_price }}</div>
      </div>
    </router-link>
  </div>
</template>

<style lang='less' scoped>
  .fresh-contariner {
    display: flex;
    flex-wrap: nowrap;
    padding: 2px 15px 12px;
    overflow-x: auto;

    .fresh-item {
      width: 150px;
      margin-right: 10px;

      &:nth-last-child(1) {
        margin-right: 0;
      }

      img {
        width: 150px;
        height: 150px;
      }
      .fresh-item-name, .fresh-item-desc {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .fresh-item-name {
        line-height: 24px;
        font-size: 13px;
        color: #303133;
      }
      .fresh-item-desc {
        line-height: 16px;
        font-size: 12px;
        color: #909399;
      }
      .fresh-item-price {
        margin-top: 4px;
        font-size: 13px;
        color: #fa436f;
      }
    }
  }
</style>