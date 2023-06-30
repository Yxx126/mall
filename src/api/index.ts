import axios from 'axios';
// import { useUserinfoStore } from '@/stores/user';

// const userinfoStore = useUserinfoStore()

const request = axios.create({
  // baseURL: 'http://39.108.79.1:4002',
  baseURL: import.meta.env.VITE_HTTP,
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {  
  // if(config.method==='get') {
    // config.data = { unused: 0 }
  // }  
  // const token = userinfoStore.token
  // if(token) {
  //   config.headers['Authorization'] = token
  // }
  // console.log(config);
  
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {  
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么  
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request
