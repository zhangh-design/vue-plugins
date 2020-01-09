## vue 自定义全局生命周期插件

### （一）前言
我们在使用`Vue`进行开发时常常会需要在生命周期钩子函数（`created`、`mounted`）中去操作一些业务逻辑（初始化数据），那如果遇到更加复杂的组件时这样的写法会让`Vue`的某个钩子函数变得臃肿影响到我们后期的代码阅读也会影响到组件的初始化操作。

**p-f-life** 自定义插件：
1. 可以向某个`Vue`钩子函数上注册增加多个自定义钩子函数用来分解原先在`Vue`钩子函数中大量的业务代码。
2. 所有自定义生命周期钩子函数，都绑定`Vue`的实际生命周期函数，并确保按照`Vue`的生命周期初始化顺序执行并在组件的某个`Vue`生命周期钩子函数之前得到执行。
3. `Vue.use`中注册的自定义钩子函数运行于当前组件的实例中。
4. 组件中注册的自定义钩子函数事件对象相互隔离。
5. 自定义钩子函数执行时可以再次触发其它自定义钩子函数，但仅限于当前组件实例中。

##### 使用

main.js 注册 life 插件

```
// 导入
import VueLife from './plugin/p-f-life.js'
// 使用
Vue.use(VueLife, {
  init ({ emit, vue, hooks }, ...args) {
    console.info(args);
    // 自定义生命周期钩子函数
    // 如果 emit 的事件没有在 hooks 中指定那么将会在默认的 hookDefault 指定的 Vue钩子函数中执行
    emit('readShop', { name: '小明' })
    emit('uploadImage')
    emit('changeView', { name: '小红' })
  },
  // emit 事件默认执行的生命周期
  hookDefault: 'mounted',
  hooks: {
    // readShop 自定义钩子函数将在组件的 created 钩子函数之前执行掉 （执行一次）
    readShop: 'created',
    // uploadImage 自定义钩子函数将在组件的 mounted 钩子函数之前执行掉（执行一次）
    uploadImage: 'mounted',
    // changeView 自定义钩子函数将在组件的 updated 钩子函数之前执行掉（会多次执行）
    changeView: 'updated'
  },
  // 自定义钩子函数事件对象 key 名称
  lifeName: 'life',
  // 自定义参数
  args: ['hello', 'life']
})
```

##### 示例










