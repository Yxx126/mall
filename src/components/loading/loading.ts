import type { App, VNode } from 'vue';
import LoadingView from './LoadingView.vue';
import { createVNode, render } from 'vue';

export default {
  install(app: App) {
    const Vnode: VNode = createVNode(LoadingView)
    render(Vnode, document.body)
    app.config.globalProperties.$Loading = {
      show: Vnode.component?.exposed?.show,
      hide: Vnode.component?.exposed?.hide,
    }
  }
}
