// 用户信息api

import $http from './index';
import Cookies from 'js-cookie';

// 获取用户信息
export const getUserinfoApi = ():Promise<resData<userinfo>> => $http.get('/my/userinfo', {headers:{Authorization: Cookies.get('token')}})
// export const getUserinfoApi = ():Promise<resData<userinfo>> => $http.get('/my/userinfo')

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
