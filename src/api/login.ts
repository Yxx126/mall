// 登录相关api

import $http from './index';
import qs from 'qs';

// 登录获取token值
export const getLoginApi = (data:Data):Promise<token> => $http.post('/api/login', qs.stringify(data))
// 注册
export const getReguserApi = (data:Data):Promise<token> => $http.post('/api/reguser', qs.stringify(data))

type Data = { 
  username: string,
  password: string,
 }

 interface token {
  data: {
    code: number,
    message: string,
    token?: string,
  }
}
