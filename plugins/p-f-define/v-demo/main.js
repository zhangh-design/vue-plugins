import Vue from 'vue'
import App from './App.vue'
import { VueDefine, Define, DefineManager } from './plugin/define/index.js'

// 外部文件载入
DefineManager.import(
  import('./config/config.app.js'),
  import('./config/config.locale.js'),
  import('./config/config.lang.en.json')
).then(() => {
  console.log(Define.LOG_ENABLED)
  console.log(Define.LANG)
})
// 内联配置
Vue.use(VueDefine, {
  defines: {
    'VUE_APP_TITLE2.POP': '禁止在构造函数中，在调用 super() 之前使用 this 或 super',
    'VUE_APP_TITLE2.CODE': '222222222',
    'VUE_APP_TITLE2.A.B.C': '内部测试C',
    'VUE_APP_TITLE2.A.B.D': '内部测试D',
    VUE_APP_DATA_2: { foo: 'bar' },
    VUE_APP_TITLE_A: '工程名称',
    VUE_APP_DESCRIPTION2: '禁止在对象中使用不必要的计算属性'
  }
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
