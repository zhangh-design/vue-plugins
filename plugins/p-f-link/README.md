## p-f-link 组件获取其它组件实例插件 （无视组件层级、子孙关系）

> 前言：我们在使用`Vue`进行开发时如何只是想单纯的去获取一个和自身组件没有层级关系或者层级较深的其它组件实例然后对它进行一些函数操作，那么可以使用这个插件来方便的达到这样一个目的。

#### 注意：
如果需要同时获取某一组的组件实例请使用 p-f-unicom 插件，p-f-link 只提供获取单个组件实例的功能。

##### `p-f-link` 自定义插件：

1. 它是`Vue.js`的一个自定义插件，获取其它组件实例 （无视组件层级、子孙关系）。

##### 功能：
1. 任意一个`Vue`组件获取任意一个`Vue`组件的实例。
2. 组件销毁时自动销毁存放在插件中受管理的当前组件的实例。

##### 使用：
`main.js` 注册`p-f-link`插件

`link`是插件内置的名称，如果需要修改可以在`Vue.use`时自定义。
```
// 导入
import link from './plugin/p-f-link.js'
// 使用
Vue.use(link, {name: 'link'})
```

##### Vue组件内部使用

APP.vue

```
<template>
  <div id="app">
    <!--定义一个 link 属性-->
    <show-component v-if="b" link="show-component-link"></show-component>
    <link-index></link-index>
  </div>
</template>
<script>
import showComponent from './components/test/Index.vue'
import linkIndex from './components/link/index.vue'
export default {
  components: {
    showComponent,
    linkIndex
  },
  data () {
    return {
      b: true
    }
  },
  mounted () {
    setTimeout(() => {
      // 销毁组件后在获取会返回 undefined ，证明存放在 p-f-link 插件中的组件实例已经自动销毁了
      this.b = false
    }, 3000);
  }
}
</script>
<style></style>

```

showComponent.vue

```
<template>
  <div>
    link 属性要获取的组件
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  mounted () {},
  methods: {
    
  }
}
</script>

<style scoped>
</style>

```

linkIndex

```
<template>
  <div>
    <button @click="doLink">link 插件测试</button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    doLink () {
      const vm = this.getLinkComponent('show-component-link')
      // show-component-link 对应的组件销毁后返回 undefined，存在则返回组件实例
      console.info(vm); 
    }
  }
}
</script>

<style></style>

```
