<template>
  <div style="border: 1px solid blue; margin-top: 10px;">
    <p>{{ codeName }}</p>
    <p>unicomId={{ unicomId || '123' }}</p>
    <p>unicomGroup=['child-a', 'child-c']</p>
  </div>
</template>

<script>
export default {
  unicomGroup: ['child-a', 'child-c'],
  unicom: {
    message (sender, text) {
      console.info('Child1：', sender, text)
    }
  },
  data () {
    return {
      codeName: 'child1 子组件'
    }
  }
}
</script>

<style></style>
