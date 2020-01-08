<template>
  <div class="border2">
    <h3 v-f-ref="c => setChildrenRef('childrenE-h3', c)">E 结点</h3>
  </div>
</template>
<script>
export default {
  components: {},
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
