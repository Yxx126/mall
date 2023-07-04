<!-- 收货地址页面 -->

<script setup lang='ts'>
  import { useRouter } from 'vue-router';
  import { useShopStore } from '@/stores/shop';

  const router = useRouter()
  const shopStore = useShopStore()

  const onClickLeft = () => {
    router.go(-1)
  }
  const onAdd = () => {
    router.push({name: 'address'})
  }
  type address = {
    id: string,
    name: string,
    tel: string,
    address: string,
    isDefault: boolean,
  }
  const onEdit = (item:address, index:number) => {
    router.push({name: 'address', query: {index: index}})
  }
</script>

<template>
  <van-nav-bar
    :title="'收货地址'"
    left-arrow
    fixed
    @click-left="onClickLeft"
  />
  <div class="adress-container">
    <van-address-list
      v-model="shopStore.chosenAddressId"
      :list="shopStore.addresslist"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    >
      <template #top>
        <div style="font-size: 13px; color: #606266; text-align: center;" v-if="shopStore.addresslist.length===0">暂无收货地址，请添加收货地址！</div>
      </template>
    </van-address-list>
  </div>
</template>

<style lang='less' scoped>
  .adress-container {
    padding-top: 46px;
  }
</style>
