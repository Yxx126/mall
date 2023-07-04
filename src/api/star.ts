// 收藏api

import $http from './index';

// 收藏商品
export const addStarApi = (data:addshopping) => $http.get('/my/star/addstar', {params:data, headers:{Authorization:localStorage.getItem('token')}})
// 获取收藏商品数据
export const getStarApi = () => $http.get('/my/star/getstar', {headers:{Authorization:localStorage.getItem('token')}})
// 删除收藏商品数据
export const delStarApi = (data:delshopping) => $http.get('/my/star/delstar', {params:data, headers:{Authorization:localStorage.getItem('token')}})
// 判断是否已收藏该商品
export const selectGoodStarApi = (data:selectStar) => $http.get('/my/star/select', {params:data, headers:{Authorization:localStorage.getItem('token')}})

// 收藏品牌
export const addBrandApi = (data:addBrand) => $http.get('/my/star/addbrand', {params:data, headers:{Authorization:localStorage.getItem('token')}})
// 获取收藏品牌数据
export const brandStarApi = () => $http.get('/my/star/brandstar', {headers:{Authorization:localStorage.getItem('userinfo')}})
// 判断是否已收藏该品牌
export const selectBrandStarApi = (data:brandStar) => $http.get('/my/star/selectbrand', {params:data, headers:{Authorization:localStorage.getItem('token')}})

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
type selectStar = {
  good_id: number,
}
type addBrand = {
  brand: string,
  url: string,
  letter: string,
}
type brandStar = {
  brand: string,
}
