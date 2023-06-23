// classify分类页面的store

import { defineStore } from 'pinia'
import { getClassifyOneApi, getClassifyTwoApi, getGoodlistApi, getGoodlistSalesApi, getGoodlistPriceApi } from '@/api/classify';

export const useClassifyStore = defineStore('classify', {
  state:() => {
    return {
      activeIndex: 1,
      goodlist_page: 1,
      classifyOne: Array<classifyOneData>(),
      classifyTwo: Array<classifyTwoData>(),
      twoList: Array<classifyTwoData[]>(),
      goodlist: Array<goodlistData>(),
      RightHeight: 180,
    }
  },
  getters: {

  },
  actions: {
    // 获取一级标签数据
    async getclassifyOne() {
      const { data: res } = await getClassifyOneApi()
      if(res.code !== 200) return console.log('获取分类一级标签数据失败！');
      this.classifyOne = res.data
    },
    // 获取二级标签数据
    async getclassifyTwo() {
      const { data: res } = await getClassifyTwoApi()      
      if(res.code !== 200) return console.log('获取分类二级标签数据失败！');
      this.classifyTwo = res.data
    },
    // 获取商品列表数据
    async getGoodlist(uid:number, val:string|undefined, limit:number=4, flag:boolean=false) {
      const params = { uid:uid, val:val, page:this.goodlist_page, limit:limit }
      const { data: res } = await getGoodlistApi(params)
      if(res.code === 201) {
        if(!flag) this.goodlist = res.data
        if(flag) this.goodlist = [...this.goodlist, ...res.data]
        return res.code
      }
      if(res.code !== 200) return console.log('获取商品列表数据失败！');
      if(!flag) this.goodlist = res.data
      if(flag) this.goodlist = [...this.goodlist, ...res.data]
      this.goodlist_page++
    },
    // 商品列表销量降序
    async getGoodlistSales(uid:number, val:string|undefined, limit:number=4, flag:boolean=false) {
      const params = { uid:uid, val:val, page:this.goodlist_page, limit:limit }
      const { data: res } = await getGoodlistSalesApi(params)      
      if(res.code === 201) {
        if(!flag) this.goodlist = res.data
        if(flag) this.goodlist = [...this.goodlist, ...res.data]
        return res.code
      }
      if(res.code !== 200) return console.log('获取商品列表数据失败！');
      if(!flag) this.goodlist = res.data
      if(flag) this.goodlist = [...this.goodlist, ...res.data]
      this.goodlist_page++
    },
    // 商品列表价格排序
    async getGoodlistPrice(uid:number, val:string|undefined, limit:number=4, flag:boolean=false, order:number=1) {
      const params = { uid:uid, val:val, page:this.goodlist_page, limit:limit, order:order }
      const { data: res } = await getGoodlistPriceApi(params) 
      if(res.code === 201) {
        if(!flag) this.goodlist = res.data
        if(flag) this.goodlist = [...this.goodlist, ...res.data]
        return res.code
      }
      if(res.code !== 200) return console.log('获取商品列表数据失败！');
      if(!flag) this.goodlist = res.data
      if(flag) this.goodlist = [...this.goodlist, ...res.data]
      this.goodlist_page++
    },
  }
})

type classifyOneData = { id:number, name:string }
type classifyTwoData = { id:number, uid:number, name:string, url:string }
type goodlistData = {id:number, uid:number, good_name:string, good_desc:string, good_price:number, good_url:string}
