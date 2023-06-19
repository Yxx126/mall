// classify分类页面的api

import $http from './index';

// 获取一级标签数据
export const getClassifyOneApi = ():Promise<resData<classifyOneData>> => $http.get('api/classify/one')
// 获取二级标签数据
export const getClassifyTwoApi = ():Promise<resData<classifyTwoData>> => $http.get('api/classify/two')
// 获取商品列表数据
export const getGoodlistApi = (data:data):Promise<resData<goodlistData>> => $http.get('api/classify/goodlist', {params:data})
// 商品列表销量降序
export const getGoodlistSalesApi = (data:data):Promise<resData<goodlistData>> => $http.get('api/classify/goodlistsales', {params:data})
// 商品列表价格排序
export const getGoodlistPriceApi = (data:data):Promise<resData<goodlistData>> => $http.get('api/classify/goodlistprice', {params:data})

type data = {
  uid?:number,
  page?: number,
  limit?: number,
  order?: number,
}
type resData<T> = {
  data: {
    code: number,
    data: T,
    message: string
  }
}
type classifyOneData = { id:number, name:string }[]
type classifyTwoData = { id:number, uid:number, name:string, url:string }[]
type goodlistData = {id:number, uid:number, good_name:string, good_desc:string, good_price:number, good_url:string}[]
