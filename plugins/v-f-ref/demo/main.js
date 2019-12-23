import Vue from 'vue'
import App from './App.vue'
import callRef from './directive/v-ref.js'

Vue.use(callRef, { name: 'f-ref' })
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
