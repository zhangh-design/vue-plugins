## common-filter Vue 全局过滤器载入 插件（在模板中使用）

> 前言：我们在使用 `Vue` 进行项目开发时总会需要去定义一些工具函数，这些工具函数封装着一定的逻辑接收不定的参数，我们指定将某些使用频率高的工具函数转换为`Vue过滤器`用于视图层的转换展示。

**common-filter** 自定义插件：

- 自动将我们定义好的过滤函数通过插件转换成全局过滤器。
- 数据定义的 key 不能重复，即使是在不同的文件中定义，如果需要使用同名的 key 进行表达请使用命名空间。

#### 使用：

main.js 导入 common-filter.js 插件

##### 注意：
默认的全局过滤器文件存放在`filters/common-filter/source.js`文件中，如果需要新增或修改请操作此配置文件，但这里定义的函数仅仅是非常公用的（比如：去除空格函数、时间格式化），如果是某个或某些模块特定的处理函数请在工程中创建文件然后引入插件中。

![image](http://m.qpic.cn/psc?/V12UXEll2JjLTU/S1G4*2hi*D5aPIJug2nMa5XdrqfM9Ap6HMxYEm4dXgwFDgHR2nJV1celuUSI1ZRubqUsxah9tZUlYpkRhsQ7vW8Me3Xg6Bkc1bflRDGYXmo!/b&bo=OQF5AAAAAAARB3E!&rf=viewer_4&t=5)

```
import Vue from 'vue'
import App from './App.vue'
import { trim, dateformat } from './filters/common-filter/source.js'
import CommonGlobalFilter from './filters/common-filter/index.js'

// trim 和 dateformat 函数将会转换为全局过滤器
Vue.use(CommonGlobalFilter, { filters: [trim, dateformat] })
// 外部载入，但是请注意这里的操作是异步的不能保证组件生产时已经载入完成
// 插件对外提供 $CommonFilter 对象用于操作 import 和 add 接口
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


```

##### Vue组件内部使用

APP.vue

```
<template>
  <div id="app">
    <common-filter-index></common-filter-index>
  </div>
</template>
<script>
import CommonFilterIndex from './components/common-filter/index.vue'
export default {
  components: {
    CommonFilterIndex
  },
  data () {
    return {
      name: 'APP.vue'
    }
  }
}
</script>
<style></style>

```

添加自定义规则 接口函数

> 函数：add(func)

> 说明：动态添加一个全局过滤函数

> 注意：增量添加的过滤函数也是全局有效的

参数：

参数 | 类型 | 属性 | 默认值 | 描述
---|---|---|---|---
func | function | 必填 | null | 构造函数


> 示例

```
// 首字母大写
const capitalize = function (value) {
  if (!value) return '';
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
}
Vue.prototype.$CommonFilter.add(capitalize)
```

> 函数：import(...promised)

> 说明：加载外部文件添加过滤函数

> 注意：

- 需要动态加载的具有 promise 返回对象的函数
- `import` 方式导入的文件不一定在组件渲染后就能用，因为这里的载入是异步的，除非你确定已经加载完成。

参数：

参数 | 类型 | 属性 | 默认值 | 描述
---|---|---|---|---
promised | Promise | 必填 | [] | 具有 promise 返回对象的函数

> 示例

```
import CommonGlobalFilter from './filters/common-filter/index.js'
Vue.prototype.$CommonFilter.import(
  import('./utils/tools.js'),
  import('./utils/tools2.js')
).then(() => {
  console.info('外部过滤器函数文件加载完成');
})
```
