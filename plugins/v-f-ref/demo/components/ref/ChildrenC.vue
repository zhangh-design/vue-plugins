<template>
  <div class="border1">
    <h2 v-f-ref="c => setChildrenRef('ChildrenC-h2', c)">C 结点</h2>
    <ChildrenE v-if="isE" />
    <ChildrenF />

    <button @click="removeHandler">解除E组件</button>
  </div>
</template>
<script>
import ChildrenE from './ChildrenE.vue';
import ChildrenF from './ChildrenF.vue';
export default {
  components: {
    ChildrenE,
    ChildrenF
  },
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  },
  data () {
    return {
      isE: true
    }
  },
  mounted () {
    console.info('cccccccc');
  },
  methods: {
    removeHandler () {
      this.isE = false;
    },
    getName (a, b) {
      console.info(a, b);
    }
  }
};
</script>
