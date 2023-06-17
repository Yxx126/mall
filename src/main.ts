import './assets/main.css';
import { createApp } from 'vue'
import pinia from './stores/index';

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 自定义指令 图片懒加载
app.directive('lazy', async (el:HTMLImageElement, binding:binding) => {
  const def = await import('@/assets/logo.svg')
  el.src = def.default
  const observer = new IntersectionObserver((enr) => {
    if(enr[0].intersectionRatio > 0) {
      el.src = binding.value
      observer.unobserve(el)
    }
  })
  observer.observe(el)
})

app.use(pinia)
app.use(router)

app.mount('#app')

type binding = {
  value: string
}
