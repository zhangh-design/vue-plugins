<template>
  <div id="app">
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
  computed: {},
  data () {
    return {
      b: true
    }
  },
  mounted () {
    setTimeout(() => {
			this.b = false
			// 销毁组件后在获取会返回 undefined ，证明存放在 p-f-link 插件中的组件实例已经自动销毁了
    }, 3000);
  }
}
</script>
<style></style>
