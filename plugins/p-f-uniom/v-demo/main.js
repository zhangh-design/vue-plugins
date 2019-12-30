import Vue from 'vue'
import App from './App.vue'
import unicom from './plugin/p-f-unicom.js'

Vue.use(unicom)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
