<template>
  <div id="app">
    <define-index></define-index>
  </div>
</template>
<script>
import DefineIndex from './components/define/index.vue'
export default {
  components: {
    DefineIndex
  },
  data () {
    return {
      name: 'APP.vue'
    }
  }
}
</script>
<style></style>
