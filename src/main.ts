import './assets/main.css';
import { createApp } from 'vue'
import pinia from './stores/index';

import App from './App.vue'
import router from './router'

import loading from './components/loading/loading';

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(loading)

app.mount('#app')

type load = {
  show: () => void,
  hide: () => void,
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    $Loading: load
  }
}
