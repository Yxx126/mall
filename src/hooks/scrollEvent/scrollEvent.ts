import type { Ref } from 'vue';
import { useHomeStore } from '@/stores/home';
import DemoView from '@/components/demo/DemoView.vue';

const homeStore =useHomeStore()

// 滚动事件
let timer: ReturnType<typeof setTimeout>

export const scrollEvent = (box:Ref<InstanceType<typeof DemoView>>, box1:Ref<HTMLElement>, name:String, addflag:boolean=false) => {
  if(Math.round(box.value?.$el?.offsetTop - box1.value?.scrollTop - 50) < box1.value?.offsetHeight) {      
    if(homeStore.scrollFlag) return false
    homeStore.scrollFlag = true
    clearTimeout(timer)
    timer = setTimeout(async () => {
      let res
      if(name === 'youlike') {
        res = await homeStore.getYoulike(4, addflag)
      }
      if(name === 'brand') {
        res = await homeStore.getBrand(6, addflag)
      }
      if(name === 'lightning') {
        res = await homeStore.getLightning(4, addflag)
      }
      if(name === 'toplike') {
        res = await homeStore.getToplike(4, addflag)
      }

      if(res === 201) {
        homeStore.demoFlag = false
        return homeStore.scrollFlag = true
      }
      return homeStore.scrollFlag = false
    }, 1000)
  }
}
