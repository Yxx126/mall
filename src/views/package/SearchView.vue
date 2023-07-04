<!-- 搜索页面 -->

<script setup lang='ts'>
  import { useRouter } from 'vue-router';
  import { ref, onBeforeMount } from 'vue';
  import { useGoodStore } from '@/stores/good';

  const  goodStore = useGoodStore()
  const  router = useRouter()

  const searchVal = ref('')
  const goback = () => {
    router.go(-1)
  }

  onBeforeMount(() => {
    goodStore.searchlist = []
  })

  let timer: ReturnType<typeof setTimeout>
  const searchlist = (e:string) => {
    clearTimeout(timer)
    if(e) {
      timer = setTimeout(() => {
        goodStore.getSearchlist(e)
      }, 500) 
    } else {
      goodStore.searchlist = []
    }
  }
  // 跳转到商品详情页面
  const toGooddetail = (id:number) => {
    router.push({
      name: 'gooddetail',
      query: {
        good_id: id
      }
    })
  }
  const search = (e:string) => {
    const arr:string[] = [...goodStore.search_history]
    arr.push(e)
    arr.reverse()
    const set = new Set(arr)
    const newArr = Array.from(set)
    newArr.reverse()
    goodStore.search_history = newArr
    toGoodlist(e)
  }
  // 跳转到商品列表
  const toGoodlist = (val:string) => {
    router.push({
      name: 'goodlist',
      query: {
        val: val,
      }
    })
  }
  // 清空历史搜索
  const clearHistory = () => {
    goodStore.search_history = []
  }
</script>

<template>
  <div class="search-header">
    <van-icon name="arrow-left" class="search-header-left" @click="goback" />
    <van-search
      v-model="searchVal"
      @update:model-value="searchlist"
      @search="search"
      placeholder="请输入搜索关键词"
      autofocus
      class="search-header-right"
    />
  </div>
  <div class="sugg-container" v-if="goodStore.searchlist.length">
    <div class="sugg-item" v-for="item in goodStore.searchlist" :key="item.id" @click="toGooddetail(item.id)">
      <van-text-ellipsis class="sugg-item-name" :content="item.good_name" />
      <van-icon name="arrow" />
    </div>
  </div>
  <div class="sugg-history" v-else>
    <div><p>搜索历史：</p><van-icon name="delete-o" color="606266" size="16" @click="clearHistory" /></div>
    <div class="sugg-history-item">
      <span v-for="(item, index) in goodStore.search_history" :key="index" @click="toGoodlist(item)">{{ item }}</span>
    </div>
  </div>
</template>

<style lang='less' scoped>
  .search-header {
    display: flex;
    align-items: center;
    background-color: #fff;

    .search-header-left {
      width: 40px;
      text-align: center;
    }
    .search-header-right{
      flex: 1;
    }
  }
  .sugg-container {
    .sugg-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 0 15px;
      background-color: #f5f3f3;
      border-bottom: 1px solid #ccc;
      font-size: 14px;
      color: #303133;

      .sugg-item-name {
        width: 90vw;
      }
    }
  }
  .sugg-history {
    padding: 15px;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      p {
        font-size: 13px;
        color: #606266;
      }
    }
    .sugg-history-item {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row-reverse;
      justify-content: flex-end;
      align-items: center;

      span {
        padding: 7px 15px;
        margin: 5px;
        background-color: #fff;
        border-radius: 5px;
        font-size: 13px;
      }
    }
    
  }
</style>