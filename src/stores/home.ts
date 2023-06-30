// home页面store

import { defineStore } from 'pinia'
import { showFailToast } from 'vant';
import 'vant/es/toast/style'
// api
import { getBannerApi, getHomeNavApi, getHomeFloorApi, getBrandApi, getBrandDetailApi, getBrandGoodlistApi, getLightningApi, getYoulikeApi } from '@/api/home';

export const useHomeStore = defineStore('home', {
  state:() => {
    return {
      brand_page: 1,
      lightning_page: 1,
      fresh_page: 1,
      toplike_page: 1,
      youlike_page: 1,
      brand_goods_page: 1,
      scrollFlag: false,
      demoFlag: true,
      banner: Array<loginData>(),
      homeNav: Array<homeNavData>(),
      homeFloor: Array<homeFloorData>(),
      branddetail: Object(),
      brand_goodlist: Array<lightningData>(),
      brand: Array<brandData>(),
      fresh: Array<lightningData>(),
      lightning: Array<lightningData>(),
      toplike: Array<lightningData>(),
      youlike: Array<lightningData>(),
    }
  },
  getters: {
    
  },
  actions: {
    // 获取轮播图数据
    async getBanner() {
      const { data: res } = await getBannerApi()
      if(res.code !== 200) return console.log('获取轮播图数据失败！');
      this.banner = res.data
    },
    // 获取首页导航栏数据
    async getHomeNav() {
      const { data: res } = await getHomeNavApi()
      if(res.code !== 200) return console.log('获取首页导航栏数据失败！');
      this.homeNav = res.data
    },
    // 获取首页楼层头部数据
    async getHomeFloor() {
      const { data: res } = await getHomeFloorApi()
      if(res.code !== 200) return console.log('获取首页楼层头部数据失败！');
      this.homeFloor = res.data
    },
    // 获取品牌数据
    async getBrand(limit:number=6, flag:boolean=false) {
      const params = { page: this.brand_page, limit: limit }
      const { data: res } = await getBrandApi(params)
      if(res.code === 201) {
        return res.code
      }
      if(res.code !== 200) return console.log('获取品牌数据失败！');      
      if(!flag) this.brand = res.data
      if(flag) this.brand = [...this.brand, ...res.data]
      this.brand_page++
    },
    // 获取品牌详情数据
    async getBrandDetail(name:string) {
      const { data: res } = await getBrandDetailApi({name: name})
      if(res.code !== 200) return showFailToast(res.message)
      this.branddetail =  res.data
    },
    // 获取品牌的商品数据
    async getBrandGoodlist(name:string, limit:number=6, flag:boolean=false) {
      const params = { name:name, page:this.brand_goods_page, limit:limit }      
      const { data: res } = await getBrandGoodlistApi(params)
      if(res.code === 201) {
        if(!flag) this.brand_goodlist = res.data
        if(flag) this.brand_goodlist = [...this.brand_goodlist, ...res.data]
        return res.code
      }
      if(res.code !== 200) return console.log('获取人气推荐数据失败！');
      if(!flag) this.brand_goodlist = res.data
      if(flag) this.brand_goodlist = [...this.brand_goodlist, ...res.data]
      return this.brand_goods_page++
    },
    // 获取秒杀专区数据
    async getLightning(count:number=4, flag:boolean=false) {
      const limit = count
      const params = { order: 1, page: this.lightning_page, limit: limit }
      const { data: res } = await getLightningApi(params)
      if(res.code === 201) {
        return res.code
      }
      if(res.code !== 200) return console.log('获取秒杀专区数据失败！');
      if(!flag) this.lightning = res.data
      if(flag) this.lightning = [...this.lightning, ...res.data]
      this.lightning_page++
    },
    // 获取新鲜好物数据
    async getFresh(count:number=4, flag:boolean=false) {
      const limit = count
      const params = { order: 4, page: this.lightning_page, limit: limit }
      const { data: res } = await getLightningApi(params)
      if(res.code === 201) {
        return res.code
      }
      if(res.code !== 200) return console.log('获取新鲜好物数据失败！');
      if(!flag) this.fresh = res.data
      if(flag) this.fresh = [...this.fresh, ...res.data]
      this.fresh_page++
    },
    // 获取 人气推荐 数据
    async getToplike(count:number=4, flag:boolean=false) {
      const limit = count
      const params = { order: 2, page: this.toplike_page, limit: limit }
      const { data: res } = await getLightningApi(params)
      if(res.code === 201) {
        return res.code
      }      
      if(res.code !== 200) return console.log('获取人气推荐数据失败！');
      if(!flag) this.toplike = res.data
      if(flag) this.toplike = [...this.toplike, ...res.data]
      this.toplike_page++
    },
    // 获取 猜你喜欢 数据
    async getYoulike(count:number=4, flag:boolean=false) {
      const limit = count
      const params = { origin: 3, page: this.youlike_page, limit: limit }
      const { data: res } = await getYoulikeApi(params)
      if(res.code === 201) {
        return res.code
      }
      if(res.code !== 200) return console.log('获取猜你喜欢数据失败！');
      if(!flag) this.youlike = res.data
      if(flag) this.youlike = [...this.youlike, ...res.data]
      this.youlike_page++
    },
  }
})

type loginData = {id:number, url:string, good_id:number}
type homeNavData = {id:number, name:string, url:string}
type homeFloorData = {id:number, name:string, desc:string, url:string}
type brandData = {id:number, name:string, count:number, url:string, top_url:string, sale:string}
type lightningData = {id:number, good_name:string, good_desc:string, good_price:number, good_url:string}
