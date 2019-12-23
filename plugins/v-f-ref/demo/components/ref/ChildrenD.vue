<template>
  <div class="border1">
    <h2>D 结点</h2>
    <ChildrenH v-f-ref="c => setChildrenRef('childrenH', c)" />
  </div>
</template>
<script>
import ChildrenH from './ChildrenH';
export default {
  components: {
    ChildrenH
  },
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  }
};
</script>
