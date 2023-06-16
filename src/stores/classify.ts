// classify分类页面的store

import { defineStore } from 'pinia'
import { getClassifyOneApi, getClassifyTwoApi } from '@/api/classify';

export const useClassifyStore = defineStore('classify', {
  state:() => {
    return {
      classifyOne: Array<classifyOneData>(),
      classifyTwo: Array<classifyTwoData>(),
      RightHeight: 180,
    }
  },
  getters: {

  },
  actions: {
    // 获取一级标签数据
    async getclassifyOne() {
      const { data: res } = await getClassifyOneApi()
      if(res.code !== 200) return console.log('获取分类一级标签数据失败！');
      this.classifyOne = res.data
    },
    // 获取二级标签数据
    async getclassifyTwo(uid:number) {
      const params = { uid: uid }
      const { data: res } = await getClassifyTwoApi(params)
      if(res.code !== 200) return console.log('获取分类二级标签数据失败！');
      this.classifyTwo = res.data
    },
  }
})

type classifyOneData = { id:number, name:string }
type classifyTwoData = { id:number, uid:string, name:string, url:string }

