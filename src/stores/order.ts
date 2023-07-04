// 支付store

import { defineStore } from 'pinia'
import { addOrderApi, getOrderApi, updateStatusApi, delOrderApi, getTypeCountApi } from '@/api/order';
import { showToast } from 'vant'

export const useOrderStore = defineStore('order', {
  state:():stateData => {
    return {
      // 订单列表
      list: [],
      list_page: 1,
      // 订单数据
      order: {
        id: 0,
        sid: 0,
        user_id: 0,
        good_id: 0,
        good_name: '',
        good_desc: '',
        good_url: '',
        good_price: 0,
        good_count: 0,
        brand: '',
        disposition: '',
        status: 0,
        time: '',
      },
      // 获取订单 待付款 待收货 的数量
      type_count: {},
      update_count:0,
    }
  },
  getters: {

  },
  actions: {
    // 生成订单
    async addOrder(params:addOrder) {
      const { data: res } = await addOrderApi(params)
      if(res.code !== 200) return showToast(res.message)
      return showToast(res.message)
    },
    // 获取订单数据
    async getOrder(status:number, limit:number=10, flag:boolean=false) {
      const { data: res } = await getOrderApi({
        status:status,
        page: this.list_page,
        limit:limit,
      })      
      if(res.code === 201) {
        if(!flag) this.list = res.data
        if(flag) this.list = [...this.list, ...res.data]
        return res.code
      }
      if(res.code !== 200) return showToast(res.message)
      if(!flag) this.list = res.data
      if(flag) this.list = [...this.list, ...res.data]
      this.list_page++      
    },
    // 改变订单状态
    async updateStatus(id:number, sid:number, status:number) {
      const {data: res} = await updateStatusApi({id:id, sid:sid, status:status})
      if(res.code !== 200) return showToast(res.message)
      return res.message
    },
    // 删除订单
    async delOrder(id:number) {
      const {data: res} = await delOrderApi({id:id})
      if(res.code !== 200) return showToast(res.message)
      return showToast(res.message)
    },
    // 获取订单 待付款 待收货 的数量
    async getTypeCount() {
      const { data: res } = await getTypeCountApi()
      if(res.code !== 200) return showToast(res.message)
      this.type_count = res.data
    }
  }
})

type addOrder = {
  sid: number,
  good_id: number,
  good_name: string,
  good_desc: string,
  good_url: string,
  good_price: number,
  good_count: number,
  disposition: string,
  status: number,
  time: string,
}
type order = {
  id: number,
  sid: number,
  user_id: number,
  good_id: number,
  good_name: string,
  good_desc: string,
  good_url: string,
  good_price: number,
  good_count: number,
  brand: string,
  disposition: string,
  status: number,
  time: string,
}
type stateData = {
  list: order[],
  list_page: number,
  order: order,
  type_count: {[x:string]:number},
  update_count: number,
}
