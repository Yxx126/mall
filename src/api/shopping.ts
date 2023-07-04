import $http from './index';

// 加入购物车
export const addShoppingApi = (data:addshopping) => $http('/my/shopping/addshopping', {params:data, headers:{Authorization:localStorage.getItem('token')}})
// 获取购物车数据
export const getShoppingApi = () => $http('/my/shopping/getshopping', {headers:{Authorization:localStorage.getItem('token')}})
// 删除购物车数据
export const delShoppingApi = (data:delshopping) => $http('/my/shopping/delshopping', {params:data, headers:{Authorization:localStorage.getItem('token')}})

type addshopping = {
  sid: number,
  user_id: number,
  good_id: number,
  good_name: string,
  good_desc: string,
  good_url: string,
  good_price: number,
  good_count: number,
  brand: string,
  inventory: number,
  disposition: string,
}
type delshopping = {
  id: number,
}
