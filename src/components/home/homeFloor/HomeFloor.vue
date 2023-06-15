<!-- 首页楼层 -->

<script setup lang='ts'>
  import { useHomeStore } from '@/stores/home';
  import HomeBrand from '@/components/home/homeFloorItem/HomeBrand.vue';

  const homeStore = useHomeStore()
  const props = defineProps({
    obj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    router: {
      type: Boolean,
      default: false,
    },
  })
</script>

<template>
  <div class="home-floor">
    <!-- 有跳转头部 -->
    <router-link :to="{ name: 'correlationlist', query:{name:props.obj.name} }" v-if="props.router">
      <header>
        <div class="names">
          <img :src="props.obj.url">
          <div class="desc">
            <div class="desc-name">{{ props.obj.name }}</div>
            <div class="desc-val">{{ props.obj.desc }}</div>
          </div>
        </div>
        <slot name="header">
          <van-icon name="arrow" color="#909399" />
        </slot>
    </header>
    </router-link>
    <!-- 没跳转头部 -->
    <header v-else>
      <div class="names">
        <img :src="props.obj.url">
        <div class="desc">
          <div class="desc-name">{{ props.obj.name }}</div>
          <div class="desc-val">{{ props.obj.desc }}</div>
        </div>
      </div>
      <slot name="header">
        <van-icon name="arrow" color="#909399" />
      </slot>
    </header>

    <slot name="main">
      <home-brand :list="homeStore.brand.slice(0, 6)" />
    </slot>
  </div>
</template>

<style lang='less' scoped>
  .home-floor {
    background-color: #fff;

    header {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
      padding: 3px 15px;
      margin-top: 8px;
      margin-bottom: 8px;
      border-bottom: 1px solid #ccc;

      .names {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        .desc {
          .desc-name {
            line-height: 22px;
            font-size: 17px;
            color: #000000E6;
          }
          .desc-val {
            line-height: 16px;
            font-size: 12px;
            color: #909399;
          }
        }
      }
    }
  }
</style>