## data-dict-filter 数据字典 Vue 全局过滤器载入 插件（在模板中使用）

> 前言：我们在使用 `Vue` 进行项目开发时总会需要去定义一些字典类型的数据过滤器`filter`来帮助我们处理一些既定的数据或者某种类型数据的转换（比如：男用 0 代表但是 view 中又需要展示 男 这是用数据字典过滤器就显得很方便）。

**data-dict-filter** 自定义插件：

- 自动将我们定义好的过滤数据通过插件转换成全局过滤器。
- 数据定义的 key 不能重复，即使是在不同的文件中定义，如果需要使用同名的 key 进行表达请使用命名空间。

#### 使用：

main.js 导入 data-dict-filter.js 插件

##### 注意：
默认的全局过滤器转换数据存放在
`filters/data-dict-filter/data-dict.js` 文件中，如果需要新增或修改请操作此配置文件。

```
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


```

##### Vue组件内部使用

APP.vue

```
<template>
  <div id="app">
	<!--全局过滤器转换-->
    {{0 | DIRECTION_TYPE}} <!--北-->
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style></style>

```

添加自定义规则 接口函数

> 函数：add(dict)

> 说明：用于增量添加过滤数据

> 注意：增量添加的滤数据也是全局有效的

参数：

参数 | 类型 | 属性 | 默认值 | 描述
---|---|---|---|---
dict | Object | 必填 | {} | 过滤数据对象


> 示例

```
import DataDictFilter from './filters/data-dict-filter/index.js'
const myDict = {"DIRECTION_TYPE": [{'paramValue': 0, 'paramDesc': '北'},{'paramValue': 1, 'paramDesc': '东'}]}
DataDictFilter.add(myDict)
```

> 函数：import(...promised)

> 说明：加载外部文件添加过滤数据

> 注意：

- 需要动态加载的具有 promise 返回对象的函数
- `import` 方式导入的文件不一定在组件渲染后就能用，因为这里的载入是异步的，除非你确定已经加载完成。

参数：

参数 | 类型 | 属性 | 默认值 | 描述
---|---|---|---|---
promised | Promise | 必填 | [] | 具有 promise 返回对象的函数


> 示例

```
import DataDictFilter from './filters/data-dict-filter/index.js'

DataDictFilter.import(import('./utils/dict1.js')).then(() => {
  // 载入成功完成
})
```
