// 用户信息store

import { defineStore } from 'pinia'
import { getLoginApi, getReguserApi } from '@/api/login';
import { showFailToast } from 'vant'
import 'vant/es/toast/style'
import Cookies from 'js-cookie';
import router from '@/router';

export const useUserinfoStore = defineStore('userinfo', {
  state:() => {
    return {
      
    }
  },
  getters: {
    
  },
  actions: {
    // 获取token值
    async getLogin(user:data) {      
      const { data: res } = await getLoginApi(user)
      if(res.code !== 200) return showFailToast(res.message)
      // 存储toktn值
      if(res.code === 200) {
        Cookies.set('token', res.token as string, { expires: 3 })
        router.go(-1)
      }
    },
    // 注册函数
    async getReguser(user:data) {      
      const { data: res } = await getReguserApi(user)
      if(res.code !== 200) return showFailToast(res.message)
      return res.code
    },
  }
})

type data = { 
  username: string,
  password: string,
 }
