<template>
  <div id="app">
    <common-filter-index></common-filter-index>
  </div>
</template>
<script>
import CommonFilterIndex from './components/common-filter/index.vue'
export default {
  components: {
    CommonFilterIndex
  },
  data () {
    return {
      name: 'APP.vue'
    }
  }
}
</script>
<style></style>
