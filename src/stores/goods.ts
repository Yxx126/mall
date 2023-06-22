import { defineStore } from 'pinia'
import { getGooddetailApi, getGoodInventorylApi, addViewsApi } from '@/api/goods';
import { showFailToast } from 'vant';

export const useGoodStore = defineStore('good', {
  state:() => {
    return {
      good: Object(),
      // 商品所有类型
      good_type: Object(),
      // 所选配置
      selected_good_type: Array(),
      // 商品价格
      good_price: 0,
      // 商品增加的价格
      good_addprice: 0,
      // 所有库存
      good_invs: Array(),
      // 所选配置库存
      good_inv: Object(),
    }
  },
  getters: {

  },
  actions: {
    // 获取商品详情
    async getGooddetail(id:number) {
      const { data: res } = await getGooddetailApi({id: id})
      if(res.code !== 200) return showFailToast(res.message);
      this.good = res.data
      this.good_type = {}
      for(const key in res.data.type) {
        if(key!=='id' && res.data.type[key]) {
          this.good_type[key] = res.data.type[key].split(',')[0]
        }
      }
      this.selected_good_type = []      
      for( const key in this.good_type) {
        this.selected_good_type.push(this.good_type[key])
      }
      this.good_price = res.data.good_price
    },
    // 获取商品库存详情
    async getGoodInventory(id:number) {
      const { data: res } = await getGoodInventorylApi({id:id})
      if(res.code !== 200) return showFailToast(res.message)
      this.good_invs = res.data
    },
    // 获取当前商品所选配置库存数量
    getGoodInv(typeKey) {
      this.good_invs.forEach((item) => {
        let flag = true
        typeKey.forEach((it, i) => {
          if(!flag) return false
          flag = item[it]===this.selected_good_type[i]
        })
        if(flag) this.good_inv = item
      });
      this.good_addprice = this.good_inv.price
    },
    // 增加浏览量
    async addViews(id:number) {
      await addViewsApi({id:id})
    },
  }
})
