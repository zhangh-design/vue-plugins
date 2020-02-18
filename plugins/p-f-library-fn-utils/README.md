## Vue.js 中使用任意 JavaScript 第三方库

> 前言：Lodash, Moment, Axios, Async … 等等, 这些非常有用的 JavaScript 库。你可能会在你的很多 Vue.js 应用中使用它们。
但随着项目的不断增长，您通常会将代码拆分成多个组件文件或模块文件。您也可能希望在不同的环境中能够运行你的 APP ，包括服务器渲染。
除非你已经找到一个简单而强大的方法来将这些 JavaScript 库包含到你的组件和模块文件中，否则这将是一件非常麻烦的事情！

如何在 Vue.js 项目中 引入 JavaScript 第三方库，一般有三种解决方式：
1. 全局变量 （window对象在服务端渲染时无法使用为 `undefined`）
2. 在每个文件中导入 （import Lodash from 'Lodash';需要在每个文件中都导入，不推荐）
3. 挂载代理为 Vue 原型对象的属性（我觉得更好的方式，服务端渲染也能使用）

[++->lodashjs++](https://www.lodashjs.com/)

[++->momentjs++](http://momentjs.cn/)

**p-f-library-fn-utils** 自定义插件：

- 统一收录各个第三方库中使用频率较高的帮助函数，并且将其代理为 Vue 原型对象的属性。

（这里没有挂载到 window 对象上是因为不能使用服务器渲染，当应用程序在服务端运行时，window 对象是 undefined 的，因此尝试访问 window 下的属性将会抛出一个错误。）

**注意**
1. 每个不同的第三方库需要手动`import`引入我们需要的帮助函数。
2. 在任何 实例/组件 中我们需要通过 `Vue` 对象访问。


#### 使用：

main.js 导入 p-f-library-fn-utils.js 插件

```
import Vue from 'vue'
import App from './App.vue'
import LibraryUtils from './plugin/p-f-library-fn-utils.js'

Vue.use(LibraryUtils)
Vue.config.productionTip = false
new Vue({
  render: h => h(App)
}).$mount('#app');
```

##### Vue组件内部使用

APP.vue

```
<template>
  <div id="app"></div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {
    // 直接调用挂载在 Vue 原型对象上的帮助函数
    // 这样无需在每个文件中重复导入
    const object = { 'a': [{ 'b': { 'c': 3 } }] };
    let val = this._get(object, 'a[0].b.c')
    let val1 = this._dateformat(new Date())
    console.log(val)
    console.info(val1);
  }
}
</script>

```

##### 目前收录的第三方库

在插件中现在只收录了`Lodash`、`Moment`，我们自己可以根据项目的需要扩展插件中的第三方库，插件只是提供一种更好的解决方式来解决我们应该如何在 `Vue` 项目内导入和管理第三方库类。


函数名 | 类库 | 说明
---|---|---
_assign | Lodash | 分配来源对象的可枚举属性到目标对象上
_pick | Lodash | 创建一个从 object 中选中的属性的对象
_isPlainObject | Lodash | 检查 value 是否是普通对象
_isNil | Lodash | 检查 value 是否是 null 或者 undefined
_has | Lodash | 检查 path 是否是对象的直接属性
_replace | Lodash | 替换字符串中匹配的内容为给定的内容 
_isString | Lodash | 检查 value 是否是原始字符串或者对象
_get | Lodash | 根据对象路径获取值
_eq | Lodash | 执行 SameValueZero 比较两者的值确定它们是否相等
_set | Lodash | 设置值到对象对应的属性路径上，如果没有则创建这部分路径
_keys | Lodash | 创建 object 自身可枚举属性名为一个数组
_isObject | Lodash | 检查 value 是否为 Object 的 对象
_cloneDeep | Lodash |  这个方法类似 _.clone，除了它会递归拷贝 value
_includes | Lodash | 检查 value(值) 是否在 collection(集合) 中
_concat | Lodash | 创建一个新数组，将array与任何数组 或 值连接在一起
_isEmpty | Lodash | 检查 value 是否为一个空对象，集合，映射或者set
_now | Lodash | 获得 Unix 纪元 (1 January 1970 00:00:00 UTC) 直到现在的毫秒数
_isUndefined | Lodash | 检查 value 是否是 undefined
_isFunction | Lodash | 检查 value 是否是 Function 对象
_toUpper | Lodash | 转换整个string字符串的字符为大写，类似 String#toUpperCase
_isArray | Lodash | 检查 value 是否是 Array 类对象
moment | moment | moment 实例对象
_dateformat | moment | 时间格式转换
_nowTimeStamp | moment | 获取当前时间戳
