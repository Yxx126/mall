import $http from './index';

// 获取商品详情
export const getGooddetailApi = (data:Date):Promise<resData<gooddetail>> => $http.get('/api/gooddetail', {params: data})
// 获取商品库存
export const getGoodInventorylApi = (data:Date):Promise<resData<inventory>> => $http.get('/api/goodprice', {params: data})
// 增加浏览量
export const addViewsApi = (data:Date):Promise<resData<''>> => $http.get('/api/addviews', {params: data})

type Date = {
  id: number,
}
interface resData<T> {
  data: {
    code: number,
    data: T,
    message: string,
  }
}
type gooddetail = {
  id:number,
  good_name:string,
  good_desc:string, good_price:number,
  order:number,
  good_url:string,
  uid:number,
  sales:number,
  views:number,
  brand:{id:number, count:number, letter:string, name:string, url:string},
  parameter:{id:number, 屏幕尺寸:string, 电池容量:string, 系统:string, 网络:string},
  type:{id:number, 颜色:string, 容量:string},
  urls:{id:number, url:string}[],
 }

 type inventory = {
  id:number,
  颜色:string,
  容量:string,
  inventory:number,
  price:number,
 }
