import $http from './index';
import Cookies from 'js-cookie';

// 加入购物车
export const addShoppingApi = (data:addshopping) => $http('/my/shopping/addshopping', {params:data, headers:{Authorization:Cookies.get('token')}})
// 获取购物车数据
export const getShoppingApi = () => $http('/my/shopping/getshopping', {headers:{Authorization:Cookies.get('token')}})
// 删除购物车数据
export const delShoppingApi = (data:delshopping) => $http('/my/shopping/delshopping', {params:data, headers:{Authorization:Cookies.get('token')}})

type addshopping = {
  user_id: number,
  good_id: number,
  good_name: string,
  good_desc: string,
  good_url: string,
  good_price: number,
  good_count: number,
  inventory: number,
  disposition: string,
}
type delshopping = {
  id: number,
}
