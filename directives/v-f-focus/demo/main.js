import Vue from 'vue'
import App from './App.vue'
import VFocus from './directive/v-focus.js'

Vue.use(VFocus)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
