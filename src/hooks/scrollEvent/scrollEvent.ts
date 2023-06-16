import { ref } from 'vue';
import type { Ref } from 'vue';
import { useHomeStore } from '@/stores/home';
import DemoView from '@/components/demo/DemoView.vue';

const homeStore =useHomeStore()

// 滚动事件
export const demoVal = ref('上拉加载更多')
let flag = false
let timer: ReturnType<typeof setTimeout>
export const scrollEvent = (box:Ref<InstanceType<typeof DemoView>>, box1:Ref<HTMLElement>) => {
  if(Math.round(box.value?.$el?.offsetTop - box1.value?.scrollTop - 50) < box1.value?.offsetHeight) {      
    if(flag) return false
    flag = true
    clearTimeout(timer)
    timer = setTimeout(async () => {
        const res = await homeStore.getYoulike(4)
        if(res === '已全部加载完毕！') {
          demoVal.value = '已全部加载完成！'
          return flag = true
        }
        return flag = false
    }, 1000)
  }
}
