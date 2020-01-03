import Vue from 'vue'
import App from './App.vue'
// 如果没有自定义的全局过滤数据需要定义可以直接使用 import
// import './filters/data-dict-filter/index.js'
// 需要额外调用 add 接口来增加全局过滤器所以给 import 起了一个别名
import DataDictFilter from './filters/data-dict-filter/index.js'

// 真实项目中使用时建议单独新建一个 js 文件存放本项目中需要用到的全局过滤器
const myDict = {
  DIRECTION_TYPE: [
    { paramValue: 0, paramDesc: '北' },
    { paramValue: 1, paramDesc: '东' }
  ]
};
DataDictFilter.add(myDict);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
