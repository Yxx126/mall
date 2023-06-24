<!-- 新增收货地址页面 -->

<script setup lang='ts'>
  import { ref } from 'vue';
  import type { Ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useShopStore } from '@/stores/shop';
  import { areaList } from '@vant/area-data'

  const router = useRouter()
  const route = useRoute()
  const shopStore = useShopStore()

  const onClickLeft = () => {
    router.go(-1)
  }

  const isDefault = ref(false)
  const searchResult:Ref<{name:string, address:string}[]> = ref([]);
  type saveRess = {
    addressDetail:string,
    areaCode:string,
    city:string,
    country:string,
    county:string,
    isDefault:boolean,
    name:string,
    province:string,
    tel:string,
  }

  // 保存按钮
  const onSave = (e:saveRess) => {
    const address = e.province + e.city + e.county + e.addressDetail
    // 新增地址
    if(!route.query.index) {
      // 首次新增地址
      if(shopStore.addresslist.length===0) {
        const ress = {
          id: '1',
          name: e.name,
          tel: e.tel,
          address: address,
          isDefault: true
        }
        shopStore.addresslist.push(ress)
        shopStore.addressViewList.push(e)
        return router.go(-1)
      }
      // 新增地址
      if(shopStore.addresslist.length!==0) {
        const ress = {
          id: (Number(shopStore.addresslist[shopStore.addresslist.length-1].id)+1).toString(),
          name: e.name,
          tel: e.tel,
          address: address,
          isDefault: e.isDefault
        }
        // 选中默认地址
        if(e.isDefault) shopStore.addresslist.forEach(item => item.isDefault=false)
        shopStore.addresslist.push(ress)
        shopStore.addressViewList.push(e)
        return router.go(-1)
      }
    }

    // 修改地址
    if(route.query.index) {
      const ress = {
        id: shopStore.addresslist[route.query.index].id,
        name: e.name,
        tel: e.tel,
        address: address,
        isDefault: e.isDefault,
      }
      const addressView = {
        name: e.name,
        tel: e.tel,
        province: e.province,
        city: e.city,
        county: e.county,
        addressDetail: e.addressDetail,
        areaCode: e.areaCode,
        isDefault: e.isDefault,
      }
      // 选中默认地址
      if(e.isDefault) shopStore.addresslist.forEach(item => item.isDefault=false)      
      shopStore.addresslist[route.query.index] = ress
      shopStore.addressViewList[route.query.index] = addressView
      return router.go(-1)
    }
  }
  // 删除按钮
  const onDelete = () => {
    if(!route.query.index) {
      return router.go(-1)
    }
    if(route.query.index) {
      shopStore.addresslist.splice(route.query.index, 1)
      shopStore.addressViewList.splice(route.query.index, 1)
      // 判断删除后地址数组是否为空
      if(shopStore.addresslist.length===0) return router.go(-1)
      // 判断删除的是否为默认地址
      const list = shopStore.addresslist.filter(item => item.isDefault)
      if(list.length===0) {
        shopStore.addresslist[0].isDefault = true
        shopStore.addressViewList[0].isDefault = true
      }
      return router.go(-1)
    }
  }
  // 修改详情按钮
  const onChangeDetail = (val:string) => {
    if(val) {
      searchResult.value = [
        {
          name: '黄龙万科中心',
          address: '杭州市西湖区',
        },
      ]
    } else {
      searchResult.value = [];
    }
  }
  const onChangeDefault = (e:boolean) => {
    isDefault.value  = e
  }
</script>

<template>
  <van-nav-bar
    :title="'收货地址'"
    left-arrow
    fixed
    @click-left="onClickLeft"
  />
  <div class="address-container">
    <van-address-edit
      :area-list="areaList"
      :address-info="shopStore.addressViewList[route.query.index]"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      @change-default="onChangeDefault"
    />
  </div>
</template>

<style lang='less' scoped>
  .address-container {
    padding-top: 46px;
  }
</style>
