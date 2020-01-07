import Vue from 'vue'
import App from './App.vue'
import vueConst from './plugin/p-f-const.js'

Vue.use(vueConst)

new Vue({
  render: h => h(App)
}).$mount('#app')
