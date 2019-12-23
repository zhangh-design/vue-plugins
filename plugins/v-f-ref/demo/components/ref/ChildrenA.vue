<template>
  <div class="border">
    <h1>A 结点</h1>
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
<script>
import ChildrenB from './ChildrenB.vue';
import ChildrenC from './ChildrenC.vue';
import ChildrenD from './ChildrenD.vue';
export default {
  components: {
    ChildrenB,
    ChildrenC,
    ChildrenD
  },
  provide () {
    return {
      setChildrenRef: (name, ref) => {
        this[name] = ref;
      },
      getChildrenRef: name => {
        return this[name];
      },
      getRef: () => {
        return this;
      }
    }
  },
  data () {
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
        console.log(this['ChildrenC-h2']); // <h2>C 结点</h2>
        console.log(this['ChildrenB-h2']); // null
      }, 2000);
    },
    getEH3Ref () {
      // 获取孙子组件 E 组件中定义 v-f-ref 指令的组件实例
      return this['childrenE-h3']
    }
  }
}
</script>
