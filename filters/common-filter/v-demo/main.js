import Vue from 'vue'
import App from './App.vue'
import { trim, dateformat } from './filters/common-filter/source.js'
import CommonGlobalFilter from './filters/common-filter/index.js'

// trim 和 dateformat 函数将会转换为全局过滤器
Vue.use(CommonGlobalFilter, { filters: [trim, dateformat] })
// 首字母大写
const capitalize = function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
}
Vue.prototype.$CommonFilter.add(capitalize)
// 外部载入，但是请注意这里的操作是异步的不能保证组件生产时已经载入完成
Vue.prototype.$CommonFilter.import(
  import('./utils/tools.js'),
  import('./utils/tools2.js')
).then(() => {
  console.info('外部过滤器函数文件加载完成');
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
