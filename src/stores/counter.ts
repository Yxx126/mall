
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCart = defineStore('cart', {
  state:() => {
    return {
      count: ref(2)
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
