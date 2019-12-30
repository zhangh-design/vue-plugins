<template>
  <div style="border: 1px solid red;">
    <p>{{ codeName }}</p>
    <p>unicomId={{ unicomId || '' }}</p>
    <p>unicomGroup=['child-a', 'child-b']</p>
  </div>
</template>

<script>
export default {
  unicomGroup: ['child-a', 'child-b'],
  unicom: {
    message (sender, text1, text2) {
      console.info('Child：', sender, text1, text2)
    },
    message1 (sender, text) {
      console.info('Child：', sender, text)
    }
  },
  data () {
    return {
      codeName: 'child 子组件'
    }
  },
  mounted () {}
}
</script>

<style></style>
