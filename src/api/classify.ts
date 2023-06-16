// classify分类页面的api

import $http from './index';

// 获取一级标签数据
export const getClassifyOneApi = ():Promise<resData<classifyOneData>> => $http.get('api/classify/one')
// 获取二级标签数据
export const getClassifyTwoApi = (data:data):Promise<resData<classifyTwoData>> => $http.get('api/classify/two', {params:data})

type data = {
  uid?:number
}
type resData<T> = {
  data: {
    code: number,
    data: T,
    message: string
  }
}
type classifyOneData = { id:number, name:string }[]
type classifyTwoData = { id:number, uid:string, name:string, url:string }[]
