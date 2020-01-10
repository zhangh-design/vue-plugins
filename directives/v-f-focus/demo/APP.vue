<template>
  <div id="app">
    <h2 v-if="mySatus">Focus demo</h2>
    <!-- <input type="text" v-focus="'focused'"/> -->
    <focus-index v-focus="'focused'"></focus-index>
    <button @click="doChange">切换</button>
  </div>
</template>
<script>
import FocusIndex from './components/focus/index.vue'
export default {
  components: {
    FocusIndex
  },
  data () {
    return {
			name: 'APP.vue',
			// 用于触发组件的 updated 事件
      mySatus: false
    }
  },
  methods: {
    doChange () {
      this.mySatus = true
    }
  }
}
</script>
<style></style>
