## Vue 自定义常量注册 computed 计算属性插件

> 前言：我们在使用 `Vue` 进行项目开发时难免会遇到需要定义常量的时候，那如果把常量定义在 data 中则会把常量也纳入了 Vue 的响应式数据管理中并且也不好和其它变量进行区分了，但如果不是这样的话又不能在我们的模板中直接使用常量这个值。

**p-f-const** 自定义插件：

- 自动将我们定义好的常量数据转换为我们的 computed 计算属性。

**注意**
1. 常量的 key 必须是大写
2. 常量定义后的值不能在程序中再次修改


#### 使用：

main.js 导入 p-f-const.js 插件

```
import Vue from 'vue'
import App from './App.vue'
import vueConst from './plugin/p-f-const.js'

Vue.use(vueConst)
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
	{{NAME_OF_CONSTANT[0].name}}&nbsp;{{OTHER}}
  </div>
</template>
<script>
export default {
  // 常量对象
  const: {
    NAME_OF_CONSTANT: [{ name: '123' }, { age: 16 }],
    OTHER: 'value2'
  },
  data () {
    return {
        // 常量不在 data 属性中定义
    }
  },
  mounted () {
    // 常量不能修改因为常量数据已经被插件冻结
    setTimeout(() => {
      // this.NAME_OF_CONSTANT[0].name = 'abc'
      // console.info(this.NAME_OF_CONSTANT);
      // this.OTHER = 'aaaaaaaaa'
    }, 3000);
  }
}
</script>
<style></style>

```
