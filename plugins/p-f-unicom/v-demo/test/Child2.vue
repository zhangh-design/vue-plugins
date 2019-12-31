<template>
  <div style="border: 1px solid green; margin-top: 10px;">
    <p>{{ codeName }}</p>
    <p>unicomId={{ unicomId || '' }}</p>
    <p>unicomGroup=['child-f']</p>
  </div>
</template>

<script>
import base from './base.js'
export default {
  mixins: [base],
  unicomGroup: ['child-f'],
  unicom: {
    message3 (sender, text1, text2) {
      console.info('Child2：', sender, text1, text2)
    }
  },
  data () {
    return {
      codeName: 'child2 子组件'
    }
  }
}
</script>

<style></style>
