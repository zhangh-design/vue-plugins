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
      console.info(vm); // show-component-link 对应的组件销毁后返回 undefined，存在返回组件实例
    }
  }
}
</script>

<style></style>
