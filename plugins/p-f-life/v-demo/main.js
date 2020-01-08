import Vue from 'vue'
import App from './App.vue'
import VueLife from './plugin/p-f-life'

Vue.use(VueLife, {
  init ({ emit, vue, hooks }, ...args) {
    console.info(args);
    // 自定义生命周期钩子函数
    emit('readShop', { name: '小明' })
    emit('uploadImage')
    emit('changeView', { name: '小红' })
  },
  hookDef: 'mounted',
  hooks: {
    // readShop 自定义钩子函数将在组件的 created 钩子函数之前执行掉 （执行一次）
    readShop: 'created',
    // uploadImage 自定义钩子函数将在组件的 created 钩子函数之前执行掉（执行一次）
    uploadImage: 'mounted',
    // changeView 自定义钩子函数将在组件的 updated 钩子函数之前执行掉（会多次执行）
    changeView: 'updated'
  },
  lifeName: 'life',
  hookEmitData: {},
  args: ['hello', 'life']
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
