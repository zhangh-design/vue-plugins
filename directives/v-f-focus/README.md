## input 控件自动设置焦点指令

> 前言：我们在使用 `Vue` 进行项目开发时肯定会遇到某些组件内的控件需要设置焦点的需求，那如果手动代码设置一个个控件的话在整体项目中会显得很冗余所以设置这么一个指令就显得很有必要性。

**v-f-focus** 自定义插件：

- 自动设置 input 控件的焦点。
- 如果输入组件是封装过的一个组件（组件中 input 标签可能是一个组件的某个层级的子控件），那么指令设置在组件上会自动寻找到组件内的第一个 input 标签并设置焦点。
- 如果组件需要一直能够获取焦点（组件发生了 updated 事件），请设置 `always` 属性。

注意：
- v-focus="'focused'"，指令设置为 focused 才能设置焦点。

#### 使用：

main.js 导入 v-f-focus.js 插件

```
import Vue from 'vue'
import App from './App.vue'
import Vfocus from './directive/v-focus.js'

Vue.use(Vfocus)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app');


```

##### Vue组件内部使用

APP.vue

```
<template>
  <div id="app">
    <h2 v-if="mySatus">Focus demo</h2>
    <!-- <input type="text" v-focus="'focused'"/> -->
    <focus-index v-focus.always="'focused'"></focus-index>
    <button @click="doChange">切换</button>
  </div>
</template>
<script>
import FocusIndex from './components/focus/index.vue'
export default {
  components: {
    FocusIndex
  },
  data () {
    return {
			name: 'APP.vue',
			// 用于触发组件的 updated 事件
      mySatus: false
    }
  },
  methods: {
    doChange () {
      this.mySatus = true
    }
  }
}
</script>
<style></style>


```

index.vue

```
<template>
  <div>
    <input type="text" />
  </div>
</template>

<script>
export default {}
</script>

<style></style>

```
