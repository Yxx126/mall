// 购物车store

import { defineStore } from 'pinia'
import { addShoppingApi, getShoppingApi, delShoppingApi } from '@/api/shopping';
import { showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style'

export const useShopStore = defineStore('shop', {
  state:():shopData => {
    return {
      // 购物车数据
      shopCart: [],
      chosenAddressId: '1',
      // 收货地址列表
      addresslist: [],
      // 修改地址的默认喧染的列表
      addressViewList: [],
    }
  },
  getters: {
    addPrice() {
      const arr = this.shopCart.filter(item => item.checkout)
      const price:number = arr.reduce((amt, item) => {
        return amt += item.good_count*item.good_price
      }, 0)
      return price*100
    }
  },
  actions: {
    // 加入购物车
    async addshopping(params:addshopping) {
      const { data: res } = await addShoppingApi(params)
      if(res.code !== 200) return showFailToast(res.message)
      return showSuccessToast(res.message)
    },
    // 获取购物车数据
    async getshopping() {
      const { data: res } = await getShoppingApi()
      if(res.code !== 200) return showFailToast(res.message)
      this.shopCart = res.data
    },
    // 删除购物车数据
    async delshopping(id:number) {
      const { data: res } = await delShoppingApi({id:id})
      if(res.code !== 200) return showFailToast(res.message)
    },
  }
})

type addshopping = {
  id?: number,
  user_id: number,
  good_id: number,
  good_name: string,
  good_desc: string,
  good_url: string,
  good_price: number,
  good_count: number,
  inventory: number,
  disposition: string,
  checkout?: number|boolean,
}
type address = {
  id: string,
  name: string,
  tel: string,
  address: string,
  isDefault: boolean,
}
type addressView = {
  name: string,
  tel: string,
  province: string,
  city: string,
  county: string,
  addressDetail: string,
  areaCode: string,
  isDefault: boolean,
}
type shopData = {
  shopCart: addshopping[],
  chosenAddressId: string,
  addresslist: address[],
  addressViewList: addressView[],
}
