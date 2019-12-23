<template>
  <div class="border1">
    <h2 v-f-ref="c => setChildrenRef('ChildrenB-h2', c)">B 结点 - h2</h2>
    <h3 v-f-ref="vFHandler">B 结点 - h3</h3>
    <ChildrenJ v-f-ref="c => setChildrenRef('ChildrenB-j', c)" />
    <br />
    <button @click="updateDirectiveHandler">修改指令 binding.value 值</button>&nbsp;
  </div>
</template>
<script>
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
  data () {
    return {
      vFHandler: c => this.setChildrenRef('childrenB-h3', c)
    }
  },
  methods: {
    getMessage (val) {
      // 修改指令的 binding.value
      console.info('h3的 vFHandler 已经被修改，上一个 vFHandler 已经解除引用：', val)
    },
    updateDirectiveHandler () {
      this.vFHandler = c => this.getMessage(c)
    }
  }
}
</script>
