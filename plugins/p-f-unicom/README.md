## p-f-unicom 跨层级通信插件，解决非父子通信的痛点

> 前言：我们在使用`Vue`进行开发时如何能够解决非父子组件之间的一个通信问题，那如果碰到这样一个问题其实按照一般的开发步骤解决起来是非常繁琐的可能各种的`parent`、`children`或者有人可能会直接定义在全局环境上那这样的操作会使得你的项目在越来越复杂的业务开发中变得非常的脆弱。

##### `p-f-unicom` 自定义插件：

1. 它是`Vue.js`的一个自定义插件，解决了`Vue`中非父子组件通讯的痛点。
2. 利用订阅者和发布者模式来管理消息。

##### 功能：
1. 任意一个`Vue`组件向其他所有组件发送指令。
2. 任意一个`Vue`组件向某组`Vue`组件发送指令。
3. 任意一个`Vue`组件向特定`unicom-id`组件发送消息。
4. 在任意一个`Vue`组件内获取某组组件列表。
5. 在任意一个`Vue`组件内获取特定`unciom-id`组件。
6. 发送指令到还没初始化的`unicom-id`组件。
7. 发送指令到还没初始化的`unicom-group`分组组件。
8. 组件销毁时自动销毁绑定的订阅事件。

##### 使用：
`main.js` 注册`Unicom`插件

`unicom`是插件内置的名称，如果需要修改可以在`Vue.use`时自定义。
```
// 导入
import unicom from './plugin/p-f-unicom.js'
// 使用
Vue.use(unicom, {
  name: 'unicom',
  idName: 'unicomId',
  groupName: 'unicomGroup'
})
```

##### Vue组件内部使用

child.vue （订阅）
```
<template>
  <div>
    // ......
  </div>
</template>
<script>
  export default {
    // 将这个组件归到 group 分组，必须是数组
    unicomGroup: ['group'],
    unicom: {
      // message 通讯指令名称和 this.$unicom 时对应
      /**
      * @desc 注册接收指令
      * sender： 发送指令者（建议只能读区不能修改）
      * args：指令发出者附带参数
      */
      message (sender, ...args){
        // 订阅消息 （名称为 `message`）
      }
    }  
  }
</script>
```
index.vue （发布）

```
<template>
  <div>
    // unicom-id 不能和其它组件所定的 unicom-id 相同
    // unicom-group 定义组的名称数组，会和组件内的 `unicomGroup` 合并并去重 ，不定义默认使用 child 组件内的 `unicomGroup`
    <child unicom-id="child-id" :unicom-group="unicomGroup"></child>
  </div>
</template>
<script>
  import Child from './child.vue'
  export default {
    components: {
      Child
    },
		data(){
			return {
				unicomGroup: ['group', 'group1']
			}
		},
    methods: {
      doExec () {
        // 发布订阅消息，会自动调用 child 组件内订阅的 `message` 指令
        this.$unicom("message", arg1, arg2, ...)
        
        // 获取被命名为 child-id 的组件引用
        const child = this.$unicom("#child-id")
        
        // 获取分组为 group 的所有 vue 组件
        const childs = this.$unicom("@group")
      }
    }
  }
</script>
```


#### 发布的使用模式：

##### 组件已经存在

1. instruct1@group （发送到指定分组）
2. instruct1#id1 （发送到指定组件）
3. @group （获取指定分组组件）
4. #id1 （获取指定组件）

##### 组件还未创建，延迟发送指令（一次性指令）

指令使用 ~ 打头

1. ~instruct1 （指令延迟发送，直到包含有 `instruct1` 指令的组件出现）
2. ~instruct1@group （指令延迟发送，直到出现分组命名`group`的组件）
3. ~instruct1#id1 （指令延迟发送，直到出现命名`id1`的组件）

##### 组件监听

组件监听使用，指令使用 ~ 打头， 第二个参数为 `callback` 回调

```
methods: {
    doExec () {
        this.$unicom('~#child-id', function(child){
            // `child`组件创建完成，从 `child` 组件的`created`函数触发出来，所以请不要操作 `child`组件的 dom 元素，组件挂载请监听 this.$nextTick
        })
    }
}
```

1. ~@group （监听分组命名group的组件出现）
2. ~#id1 （监听命名id1的组件出现）

具体的使用 demo 请参考 v-demo 目录。

