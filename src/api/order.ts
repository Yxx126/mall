// 支付api

import $http from './index';
import qs from 'qs';

// 生成订单
export const addOrderApi = (data:addOrder):Promise<res<''>> => $http.post('/my/order/addorder', qs.stringify(data), {headers:{Authorization:localStorage.getItem('token')}})
// 获取订单数据
export const getOrderApi = (data:getOrder):Promise<res<order[]>> => $http.get('/my/order/getorder', {params:data, headers:{Authorization:localStorage.getItem('token')}})
// 改变订单状态
export const updateStatusApi = (data:{id:number, sid:number, status:number}):Promise<res<''>> => $http.get('/my/order/updatastatus', {params:data, headers:{Authorization:localStorage.getItem('token')}})
// 删除订单
export const delOrderApi = (data:{id:number}):Promise<res<{[x:string]:number}>> => $http.get('/my/order/delorder', {params:data, headers:{Authorization:localStorage.getItem('token')}})
// 获取订单 待付款 待收货 的数量
export const getTypeCountApi = ():Promise<res<{[x:string]:number}>> => $http.get('/my/order/getcount', {headers:{Authorization:localStorage.getItem('token')}})

type addOrder = {
  sid: number,
  good_id: number,
  good_name: string,
  good_desc: string,
  good_url: string,
  good_price: number,
  good_count: number,
  disposition: string,
  status: number,
  time: string,
}
type getOrder = {
  status: number,
  page?: number,
  limit?: number,
}
type order = {
  id: number,
  sid: number,
  user_id: number,
  good_id: number,
  good_name: string,
  good_desc: string,
  good_url: string,
  good_price: number,
  good_count: number,
  brand: string,
  disposition: string,
  status: number,
  time: string,
}
interface res<T> {
  data: {
    code: number,
    data: T,
    message: string,
  }
}
