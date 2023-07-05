// 收藏store

import { defineStore } from 'pinia'
import { addStarApi, getStarApi, delStarApi, selectGoodStarApi, addBrandApi, brandStarApi, selectBrandStarApi } from '@/api/star';
import { showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style'

export const useStarStore = defineStore('star', {
  state:():starData => {
    return {
      // 购物车数据
      goodStar: [],
      brandStar: [],
    }
  },
  getters: {

  },
  actions: {
    // 收藏商品
    async addstar(params:addshopping) {
      const { data: res } = await addStarApi(params)
      if(res.code !== 200) return showFailToast(res.message)
      showSuccessToast(res.message)
      return res
    },
    // 获取收藏商品数据
    async getstar() {
      const { data: res } = await getStarApi()
      console.log(res);
      
      if(res.code !== 200) return showFailToast(res.message)
      this.goodStar = res.data
    },
    // 删除收藏商品数据
    async delstar(id:number) {
      const { data: res } = await delStarApi({id:id})
      if(res.code !== 200) return showFailToast(res.message)
    },
    // 判断是否已收藏该商品
    async selectGoodStar(good_id:number) {
      const params = {good_id:good_id}
      const { data: res } = await selectGoodStarApi(params)
      return res      
    },
    // 收藏品牌 取消收藏
    async addBrand(params:addBrand) {
      const { data: res} = await addBrandApi(params)
      if(res.code !== 200) return showFailToast(res.message)
      showSuccessToast(res.message)
      return res
    },
    // 获取收藏品牌数据
    async getbrandStar() {
      const { data: res} = await brandStarApi()
      if(res.code !== 200) return showFailToast(res.message)
      this.brandStar = res.data
    },
    // 判断是否已收藏该品牌
    async selectBrandStar(brand:string) {
      const { data: res} = await selectBrandStarApi({brand:brand})
      return res
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
type starData = {
  goodStar: addshopping[],
  brandStar: addBrand[],
}
type addBrand = {
  id?: number,
  brand: string,
  url: string,
  letter: string,
}
