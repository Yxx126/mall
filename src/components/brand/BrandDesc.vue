<!-- 品牌信息组件 -->

<script setup lang='ts'>
  import { ref, onBeforeMount } from 'vue';
  import { useRouter } from 'vue-router';
  import { useHomeStore } from '@/stores/home';
  import { useStarStore } from '@/stores/star';

  const router = useRouter()
  const homeStore = useHomeStore()
  const starStore = useStarStore()
  const props = defineProps({
    show_name: {
      type: Boolean,
      default: true,
    },
    show_icon: {
      type: Boolean,
      default: true,
    },
    tobrand: {
      type: Boolean,
      default: true,
    },
    obj: {
      type: Object,
      default: () => {
        return {
          url: String,
          brand: '品牌名称',
          name: '品牌名称',
          letter: '品牌首字母',
        }
      },
    }
  })

  // 收藏样式
  const star = {
    color: ref('#606266'),
  }
  onBeforeMount(async () => {
    // 判断该品牌是否被收藏    
    const res = await starStore.selectBrandStar(props.obj.brand||props.obj.name)
    if(res.code === 200) star.color.value = '#fa436a'
    if(res.code === 201) star.color.value = '#606266'
  })
  // 跳转到品牌详情
  const toBrand = () => {
    router.push({
      name: 'branddetail',
      query: {
        name: homeStore.branddetail.name,
      }
    })
  }
  // 点击收藏
  const updateStar = async () => {
    const res = await starStore.addBrand({
      brand: props.obj.brand||props.obj.name,
      url: props.obj.url,
      letter: props.obj.letter,
    })
    if(res.message === '收藏成功！') star.color.value = '#fa436a'
    if(res.message === '取消收藏！') star.color.value = '#606266'
    await starStore.getbrandStar()
  }
</script>

<template>
  <div class="gooddetail-main-brand">
    <div v-if="props.show_name" class="main-brand-name">品牌信息</div>
    <div class="main-brand-main">
      <img v-if="props.tobrand" style="width: 105px; height: 35px; object-fit: contain;" @click="toBrand" :src="props.obj.url">
      <img v-else style="width: 105px; height: 35px; object-fit: contain;" :src="props.obj.url">
      <div v-if="props.tobrand" class="main-brand-main-left" @click="toBrand">
        <span>{{ props.obj.brand }}</span>
        <span>品牌首字母: {{ props.obj.letter }}</span>
      </div>
      <div v-else class="main-brand-main-left">
        <span>{{ props.obj.name }}</span>
        <span>品牌首字母: {{ props.obj.letter }}</span>
      </div>
      <div v-if="props.show_icon" class="main-brand-main-right">
        <van-icon name="like" size="40" :color="star.color.value" @click.stop="updateStar" />
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
  .gooddetail-main-brand{
    background-color: #fff;
    border-bottom: 1px solid #ccc;

    .main-brand-name {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .main-brand-main {
      display: flex;
      align-items: center;
      height: 44px;
      padding: 15px 25px;

      .main-brand-main-left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        margin-left: 15px;

        span:nth-child(1) {
          margin-bottom: 5px;
          font-size: 18px;
          color: #303133;
        }
        span:nth-child(2) {
          font-size: 12px;
          color: #909399;
        }
      }
      .main-brand-main-right {
        flex: 1;
        padding-right: 20px;
        text-align: right;
      }
    }
  }
</style>
