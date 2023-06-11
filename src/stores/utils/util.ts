import type { PiniaPluginContext } from 'pinia';

export default function(context: PiniaPluginContext) {
  // 初始化数据
  localStorage.getItem(JSON.parse(context.store.$id) || '{}')
  // 数据改变时
  context.store.$subscribe((_store, state) => {
    localStorage.setItem(_store.storeId, JSON.stringify(state))
  }, {
    detached: true
  })
}