## vue 自定义全局生命周期插件

### （一）前言
我们在使用`Vue`进行开发时常常会需要在生命周期钩子函数（`created`、`mounted`）中去操作一些业务逻辑（初始化数据），那如果遇到更加复杂的组件时这样的写法会让`Vue`的某个钩子函数变得臃肿影响到我们后期的代码阅读也会影响到组件的初始化操作，那在如果我们使用`mixin`、`extend`时如果我们在`Vue自身的生命周期钩子函数`内写了大量的操作代码那我在将子混入父的过程中也会出现你不想要的结果，对这样所以我们就非常急切的需要一个自定义的生命周期钩子函数来绑定到我们组件的创建过程中。（[Vue 选项合并策略](https://cn.vuejs.org/v2/guide/mixins.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6%E7%AD%96%E7%95%A5)）。

**p-f-life** 自定义插件：
1. 可以向某个`Vue`钩子函数上注册增加多个自定义钩子函数用来分解原先在`Vue`钩子函数中大量的业务代码。
2. 所有自定义生命周期钩子函数，都绑定`Vue`的实际生命周期函数，并确保按照`Vue`的生命周期初始化顺序执行并在组件的某个`Vue`生命周期钩子函数之前得到执行（这样不会影响到我们本身组件的初始化顺序）。
3. `Vue.use`中注册的自定义钩子函数运行于当前组件的实例中。
4. 各个组件中注册的自定义钩子函数事件对象相互隔离。
5. 自定义钩子函数执行时可以再次触发其它自定义钩子函数，但仅限于当前组件实例中。
6. 自定义钩子函数可以自己设置 [自定义选项合并策略](https://note.youdao.com/)，方便父子组件的属性混入操作而不影响到Vue本身的生命周期钩子函数的各个属性对象（created、mounted...）。

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
      // 在 mixin 混入的 created 之中来触发执行 readShop 这个自定义生命周期钩子函数，在当前组件初始化的 created 钩子之前执行完成
      // 此处可以利用vue生命周期的间隔来初始化数据
      // emit 可以触发其他的事件，此事件只局限于本组件中（执行时机会在 hookDefault: 'mounted' 时触发）
      // data 将用于接收 emit('readShop', { name: '小明' }) 中传递的参数{ name: '小明' }
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
      // 没有在 hooks 中设置，执行时机会在 hookDefault: 'mounted' 时触发
    }
  }
```

![image](http://i2.tiimg.com/717460/2366bdfc7216c308.jpg)

##### 示例

main.js
```
import Vue from 'vue'
import App from './App.vue'
import VueLife from './plugin/p-f-life'

Vue.use(VueLife, {
  init ({ emit, vue, hooks }, ...args) {
    console.info(args);
    // 自定义生命周期钩子函数
    emit('readShop', { name: '小明' })
    emit('uploadImage')
    emit('changeView', { name: '小红' })
  },
  hookDef: 'mounted',
  hooks: {
    // readShop 自定义钩子函数将在组件的 created 钩子函数之前执行掉 （执行一次）
    readShop: 'created',
    // uploadImage 自定义钩子函数将在组件的 created 钩子函数之前执行掉（执行一次）
    uploadImage: 'mounted',
    // changeView 自定义钩子函数将在组件的 updated 钩子函数之前执行掉（会多次执行）
    changeView: 'updated'
  },
  lifeName: 'life',
  hookEmitData: {},
  args: ['hello', 'life']
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

```

APP.vue

```
<template>
  <div id="app">
    <life-index></life-index>
  </div>
</template>
<script>
import LifeIndex from './components/life/index.vue'
export default {
  components: {
    LifeIndex
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

index.vue

```
<template>
  <div>
    life 组件
    <!--用于测试 updated 钩子函数-->
    <h1 v-if="myStatus">{{name}}</h1>
    <button @click="doChange">测试 updated 钩子函数</button>
  </div>
</template>

<script>
export default {
  // 自定义生命周期函数将在 mixin 混入的 Vue 生命周期之中执行所以将会在组件的 Vue 生命周期之前执行掉
  // 自定义钩子函数运行于当前组件实例上下文之中
  life: {
    prepose () {
      // 当前组件 beforeCreate 钩子函数前执行
      console.info('prepose 默认前置钩子函数')
    },
    readShop ({ then, data, emit }) {
      // 当前组件 created 钩子函数前执行
      console.info('readShop', data, this.name)
      // 再次通过 emit 触发其它函数
      emit('afterReadShop', { name: '小框' })
      then(() => {
        // 将会在 created之后mounted之前得到执行
        console.info('readShop.callback');
      })
    },
    afterReadShop ({ then, emit, data }) {
      // 将会在 created之后mounted之前得到执行
      // 因为默认不指定生命周期的自定义钩子函数会依赖到 mounted 中（可以通过 hookDefault 参数来重新设置默认 Vue 生命周期钩子函数）
      console.info('afterReadShop', data);
    },
    uploadImage () {
      // 当前组件 mounted 钩子函数前执行
      console.info('uploadImage')
    },
    changeView () {
      // 当前组件 updated 钩子函数前执行
      console.info('changeView')
    }
  },
  data () {
    return {
      name: 'life 子组件',
      myStatus: false
    }
  },
  beforeCreate () {
    console.info('beforeCreate...');
  },
  created () {
    console.info('created....');
  },
  mounted () {
    console.info('mounted....');
  },
  updated: function () {
    console.info('updated...');
  },
  methods: {
    doChange () {
      this.myStatus = !this.myStatus
    }
  }
}
</script>

<style></style>

```
