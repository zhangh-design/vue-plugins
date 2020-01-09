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
    // created
    emit('readShop', { name: '小明' })
    // mounted
    emit('uploadImage')
    // updated
    emit('changeView', { name: '小红' })
    // mounted（未在 hooks 中定义）
    emit('doGet')
  },
  // emit 事件默认执行的生命周期
  hookDefault: 'mounted',
  hooks: {
    // readShop 在组件的 created 钩子函数之前执行掉 （执行一次）
    readShop: 'created',
    // uploadImage 将在组件的 mounted 钩子函数之前执行掉（执行一次）
    uploadImage: 'mounted',
    // changeView 在组件的 updated 钩子函数之前执行掉（会多次执行）
    changeView: 'updated'
  },
  // 自定义钩子函数事件对象 key 名称
  lifeName: 'life',
  // 自定义参数传入到 init 中
  args: ['hello', 'life']
})
```

组件：

```
life: {
    prepose () {
      // 默认设置的前置 prepose 钩子函数
      // 在当前组件 beforeCreate 钩子函数前执行
      // 执行完 prepose 之后在接着是执行组件自身的 beforeCreate
      // 此处可以利用vue生命周期的间隔来初始化数据
    },
    readShop ({ then, data, emit }) {
      // 这个自定义生命周期将由 emit('readShop', { name: '小明' }) 注册
      // 在 mixin 混入的 created 之后来触发执行自定义生命周期，在当前组件的 created 钩子之前执行完成
      // 此处可以利用vue生命周期的间隔来初始化数据
      // emit 可以触发其他的事件，此事件只局限于本组件中
      // data 将用于接收 emit('readShop', { name: '小明' }) 中的参数
      /*
        then(() => {
          // 此处触发，会在 hookDefault: 'mounted' 设置的触发时机触发 
        })
      */
    },
    uploadImage ({ then, data, emit }) {
      // 当前组件 mounted 钩子函数前执行
    },
    changeView ({ then, data, emit }) {
      // 当前组件 updated 钩子函数前执行
      // 会多次执行
    },
    doGet ({ then, data, emit }) {
      // 当前组件 mounted 钩子函数前执行
    }
  }
```

![image](http://m.qpic.cn/psc?/V12UXEll2JjLTU/S1G4*2hi*D5aPIJug2nMa6HJ3InjEYWYGrYAECh4K8Spiy8gvW4M.xMb*V3bLqilywEwRVlHSzCmkj0ZsuHXGqTFfh5l73kS39r3aUSUSLQ!/b&bo=MAFGAQAAAAARB0Y!&rf=viewer_4&t=5)

##### 示例










