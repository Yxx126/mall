<script setup lang='ts'>
  import { ref, onBeforeMount} from 'vue';
  import { Pagination, A11y, Autoplay } from 'swiper';
  import type { swiper } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  // sotre
  import { useHomeStore } from '@/stores/home';

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';

  const modules = [Pagination, A11y, Autoplay]
  const homeStore = useHomeStore()

  onBeforeMount(async() => {
    homeStore.getBanner()
  })

  const bgc = ref('#fff')
  const onSlideChange = (e: swiper) => {
    if(e.realIndex % 2 === 0) bgc.value='#fff'
    if(e.realIndex % 2 !== 0) bgc.value='red'
  }
</script>

<template>
  <swiper
    :modules="modules"
    :space-between="50"
    :pagination="{ clickable: true }"
    :autoplay="{ delay: 2000 }"
    loop
    class="swiper"
    @slideChange="onSlideChange"
    :style="{ backgroundColor: bgc }"
  >
    <swiper-slide v-for="item in homeStore.banner" :key="item.id">
      <img :src="item.url">
    </swiper-slide>
  </swiper>
</template>

<style lang='less' scoped>
  .swiper {
    height: 175px;
    transition: backgroundColor 2s;

    img {
      width: 100%;
      height: 100%;
    }
  }
  :deep(.swiper-slide) {
    box-sizing: border-box;
    width: 100%;
    padding: 5% 5% 0;
  }
</style>