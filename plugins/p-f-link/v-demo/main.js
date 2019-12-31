import Vue from 'vue'
import App from './App.vue'
import link from './plugin/p-f-link.js'

Vue.use(link)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
