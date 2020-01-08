<template>
  <div id="app">
    <life-index></life-index>
  </div>
</template>
<script>
import LifeIndex from './components/life/index.vue'
export default {
  components: {
    LifeIndex
  },
  data () {
    return {
      name: 'APP.vue'
    }
  }
}
</script>
<style></style>
