// home页面相关api

import $http from './index';

// 获取轮播图数据api
export const getBannerApi = ():Promise<resData<loginData>> => $http.get('/api/home/banner')
// 获取首页导航栏数据api
export const getHomeNavApi = ():Promise<resData<homeNavData>> => $http.get('/api/home/home-nav')
// 获取首页楼层头部数据api
export const getHomeFloorApi = ():Promise<resData<homeFloorData>> => $http.get('/api/home/home-floor')
// 获取品牌数据api
export const getBrandApi = (data: data):Promise<resData<brandData>> => $http.get('/api/home/brand', {params:data})
// 获取品牌详情数据api
export const getBrandDetailApi = (data: data):Promise<resData<brandData>> => $http.get('/api/home/branddetail', {params:data})
// 获取品牌的商品数据api
export const getBrandGoodlistApi = (data: data):Promise<resData<lightningData>> => $http.get('/api/home/brandgoodlist', {params:data})
// 获取 秒杀专区/新鲜好物  人气推荐  数据api
export const getLightningApi = (data: data):Promise<resData<lightningData>> => $http.get('/api/home/lightning', {params: data})
// 获取 猜你喜欢 数据api
export const getYoulikeApi = (data: data):Promise<resData<lightningData>> => $http.get('/api/home/youlike', {params: data})

interface resData<T> {
  data: {
    code: number,
    data: T,
    message: string,
  }
}
type loginData = {id:number, url:string, good_id:number}[]
type homeNavData = {id:number, name:string, url:string}[]
type homeFloorData = {id:number, name:string, desc:string, url:string}[]
type brandData = {id:number, name:string, count:number, url:string, top_url:string, sale:string}[]
type lightningData = {id:number, good_name:string, good_desc:string, good_price:number, good_url:string}[]

type data = {
  order?: string|number|0,
  page?: number,
  limit?: number,
  name?: string,
}
