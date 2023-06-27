// 用户信息api

import $http from './index';
import Cookies from 'js-cookie';
import qs from 'qs';

// 获取用户信息
export const getUserinfoApi = ():Promise<resData<userinfo>> => $http.get('/my/user/userinfo', {headers:{Authorization: Cookies.get('token')}})
// 修改密码
export const updatepwdApi = (data:updatepwd):Promise<resData<''>> => $http.post('/my/user/updatepwd', qs.stringify(data), {headers:{Authorization: Cookies.get('token')}})
// 上传头像
export const updateimgApi = (data:updateimg):Promise<resData<''>> => $http.post('/my/user/userimg', qs.stringify(data), {headers:{Authorization: Cookies.get('token')}})
// 修改用户信息
export const updateinfoApi = (data:updateinfo):Promise<resData<''>> => $http.post('/my/user/updateinfo', qs.stringify(data), {headers:{Authorization: Cookies.get('token')}})

type resData<T> = {
  data: {
    code: number,
    data: T,
    message: string,
  }
}
type userinfo = {
  id: number,
  username: string,
  img: string,
  gender: number,
  permissions: number,
  nickname: string,
}
type updatepwd = {
  oldpwd: string,
  newpwd: string,
}
type updateimg = {
  img: string,
}
type updateinfo = {
  nickname: string,
  gender: number,
}
