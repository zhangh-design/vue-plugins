## v-f-ref 优雅的获取跨层级子孙组件的实例


> 前言：我们在使用`Vue`进行开发中理想状态下是不需要去访问某个组件的实例只需要关心数据就可以了但是随着你的业务越来越复杂然后你难免需要访问到一个我们的`Vue`组件实例的一个情况，举个例子：有一个列表组件对外提供了一个`refresh`刷新的接口这样我们就需要使用该组件的实例去调用接口函数进行刷新操作。

`v-f-ref`指令功能：
- 主动绑定定义指令的组件实例。
- 组件更新主动通知父组件更新绑定组件的实例。
- 父组件缓存子组件实例不用每次去获取。


场景：A组件有B、C、D三个子组件，B组件有一个J子组件，C组件有E、F两个子组件。

![image](http://m.qpic.cn/psc?/V12UXEll2JjLTU/S1G4*2hi*D5aPIJug2nMa5Sqk2KVIDHYsqjZQEKgbrevNeDRY8bW96TfVsAzoW1146kt0Xllm7xvfzoYs4J9KhTHXiQV2kJbvpgbGlcF2v0!/b&bo=KgJvAQAAAAARB3Y!&rf=viewer_4&t=5)

A组件`provide`对子孙组件提供三个接口：
```
<template>
  <div>
    <ChildrenB />
    <ChildrenC />
    <ChildrenD />
    <component v-bind:is="componentName"></component>
    
    <button @click="getBH2Ref">获取B h2 Ref</button>&nbsp;
    <button @click="getBJRef">获取B j Ref</button>&nbsp;
    <button @click="getJRef">获取J Ref</button>&nbsp;
    <button @click="getBH3Ref">获取B h3 Ref</button>&nbsp;
    <button @click="updateComponentHandler">修改动态组件</button>
    <button @click="getEH3Ref">获取E h3 Ref</button>&nbsp;
  </div>
</template>
import ChildrenB from './ChildrenB.vue'
import ChildrenC from './ChildrenC.vue'
import ChildrenD from './ChildrenD.vue'
export default {
    provide () {
        return {
          setChildrenRef: (name, ref) => {
            this[name] = ref
          },
          getChildrenRef: name => {
            return this[name]
          },
          getRef: () => {
            return this
          }
        }
    },
    data(){
        return {
            componentName: 'ChildrenB'
        }
    },
    methods: {
        getBH2Ref () {
          // A组件中获取B组件的 h2 标签实例
          return this['ChildrenB-h2']
        },
        getBJRef () {
          // A组件中获取B组件的 J 子组件实例
          // 获取的是子组件 ChildrenJ 的组件 vue 实例并不是 Html 标签实例，可以操作组件内部的方法
          this['ChildrenB-j'].getMessage('1')
          return this['ChildrenB-j']
        },
        getJRef () {
          // 获取的是 J 子组件的 p 标签实例，并不能操作 J 组件中的方法
          // this['ChildrenB-j'].getMessage('1') 无法调用，因为是 Html 标签实例
          return this['ChildrenJ']
        },
        getBH3Ref () {
          // A组件中获取B组件的 h3 标签实例
          // 在点击 `修改指令 binding.value 值` 按钮后将自定义指令 `v-f-ref` 的 binding.value 的值修改为 `getMessage` 方法
          // 修改后在获取 this['childrenB-h3'] 是 null，这里体现了指令会在子组件发生 update 时主动通知父组件
          return this['childrenB-h3']    
        },
        updateComponentHandler () {
          // 动态组件
          // 动态组件切换会调用指令的 unbind 钩子，注销 ChildrenB 的引用
          // 然后初始化 ChildrenC 组件，并执行指令
          this.componentName = 'ChildrenC'
          setTimeout(() => {
            console.log(this['ChildrenC-h2']);  // <h2>C 结点</h2>
            console.log(this['ChildrenB-h2']);  // null
          }, 2000);
        },
        getEH3Ref () {
          // 获取孙子组件 E 组件中定义 v-f-ref 指令的组件实例
          return this['childrenE-h3']
        }
    }
}
```
B组件`inject`注入接口函数：

```
<template>
  <div>
    <h2 v-f-ref="c => setChildrenRef('ChildrenB-h2', c)">B 结点 - h2</h2>
    <h3 v-f-ref="vFHandler">B 结点 - h3</h3>
    <ChildrenJ v-f-ref="c => setChildrenRef('ChildrenB-j', c)" />
    <br />
    <button @click="updateDirectiveHandler">修改指令 binding.value 值</button>&nbsp;
  </div>
</template>
import ChildrenJ from './ChildrenJ.js'
export default {
    components: {
        ChildrenJ
    },
    inject: {
        setChildrenRef: {
          default: () => {}
        },
        getParentChildrenRef: {
          from: 'getChildrenRef',
          default: () => {}
        }
    },
    data(){
        return {
            vFHandler: c => this.setChildrenRef('childrenB-h3', c)
        }
    },
    methods: {
        getMessage (val) {
          // 修改指令的 binding.value
          console.info('h3的 vFHandler 已经被修改，上一个 vFHandler 已经解除引用：', val);
        },
        updateDirectiveHandler () {
          this.vFHandler = c => this.getMessage(c)
        }  
    }
}
```
C组件`inject`注入接口函数：

```
<template>
  <div>
   <h2 v-f-ref="c => setChildrenRef('ChildrenC-h2', c)">C 结点</h2>
   <ChildrenE v-if="isE" />
   <ChildrenF />
	 
   <button @click="removeHandler">解除E组件</button>
  </div>
</template>
import ChildrenE from './ChildrenE.vue'
import ChildrenF from './ChildrenF.vue'
export default {
    components: {
        ChildrenE,
        ChildrenF
    },
    inject: {
        setChildrenRef: {
          default: () => {}
        }
    },
    data(){
        return {
            isE: true
        }
    },
    methods: {
        removeHandler () {
          // 会销毁 E 组件并解绑E组件中的自定义指令
          // 在 A 组件中再次获取 childrenE-h3 是null
          this.isE = false
        }
    }
}
```
D组件：

```
<template>
  <div class="border1">
    <h2>D 结点</h2>
    <ChildrenH v-ant-ref="c => setChildrenRef('childrenH', c)" />
  </div>
</template>
import ChildrenH from './ChildrenH'
export default {
  components: {
    ChildrenH
  },
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  }
}
```


J组件：

```
export default {
  data () {
    return {
        tag: 'p'
    }
  },
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  },
  methods: {
    getMessage(val){
      console.info(val);    
    }  
  },
  render (h) {
    return h(this.tag, {
      on: {
        click: () => {
          this.tag = 'h3'
        }
      },
      directives: [
        {
          // 渲染函数时不用v-
          name: 'f-ref',
          value: c => this.setChildrenRef('ChildrenJ', c)
          // value: this.getMessage,
          // expression: 'getMessage'
        }
      ]
    }, 'J组件')
  }
}

```

E组件：

```
<template>
  <div class="border2">
    <h3 v-f-ref="c => setChildrenRef('childrenE-h3', c)">E 结点</h3>
  </div>
</template>
<script>
export default {
  components: {},
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

```

F组件：
```
<template>
  <div class="border2">
    <h3>F 结点</h3>
    <button @click="getARef">获取A Ref</button>
    <button @click="getHRef">获取H Ref</button>
  </div>
</template>
<script>
export default {
  components: {},
  inject: {
    getParentRef: {
      from: 'getRef',
      default: () => {}
    },
    getParentChildrenRef: {
      from: 'getChildrenRef',
      default: () => {}
    }
  },
  methods: {
    getARef () {
      // 获取顶层父节点
      return this.getParentRef()
    },
    getHRef () {
      // 获取任意子组件
      return this.getParentChildrenRef('childrenH')
    }
  }
}
</script>

```
