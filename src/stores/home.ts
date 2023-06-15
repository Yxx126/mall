// home页面store

import { defineStore } from 'pinia'
// api
import { getBannerApi, getHomeNavApi, getHomeFloorApi, getBrandApi, getLightningApi, getYoulikeApi } from '@/api/home';

export const useHomeStore = defineStore('home', {
  state:() => {
    return {
      page: 1,
      banner: Array<loginData>(),
      homeNav: Array<homeNavData>(),
      homeFloor: Array<homeFloorData>(),
      brand: Array<brandData>(),
      lightning: Array<lightningData>(),
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
    async getBrand() {
      const { data: res } = await getBrandApi()
      if(res.code !== 200) return console.log('获取品牌数据失败！');
      this.brand = res.data
    },
    // 获取 秒杀专区/新鲜好物 数据
    async getLightning() {
      const params = { order: 1 }
      const { data: res } = await getLightningApi(params)
      if(res.code !== 200) return console.log('获取 秒杀专区/新鲜好物 数据失败！');
      this.lightning = res.data
    },
    // 获取 人气推荐 数据
    async getYoulike(count:number=4) {
      const limit = count
      const params = { page: this.page, limit: limit }
      const { data: res } = await getYoulikeApi(params)
      if(res.code === 201) {
        return res.message
      }
      if(res.code !== 200) return console.log(res.message);
      this.youlike = [...this.youlike, ...res.data]
      this.page++
    },
  }
})

type loginData = {id:number, url:string}
type homeNavData = {id:number, name:string, url:string}
type homeFloorData = {id:number, name:string, desc:string, url:string}
type brandData = {id:number, name:string, count:number, url:string}
type lightningData = {id:number, good_name:string, good_desc:string, good_price:number, good_url:string}
