import type { PiniaPluginContext } from 'pinia';

export default function(context: PiniaPluginContext) {
  // 初始化数据
  const valState = JSON.parse(localStorage.getItem(context.store.$id) || '{}')
  context.store.$patch(valState)
  // 数据改变时
  context.store.$subscribe((_store, state) => {
    localStorage.setItem(_store.storeId, JSON.stringify(state))
  }, {
    detached: true
  })
}