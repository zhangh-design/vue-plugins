<template>
  <div id="app">
    {{NAME_OF_CONSTANT[0].name}}&nbsp;{{OTHER}}
  </div>
</template>
<script>
export default {
  const: {
    NAME_OF_CONSTANT: [{ name: '123' }, { age: 16 }],
    OTHER: 'value2'
  },
  data () {
    return {}
  },
  mounted () {
    setTimeout(() => {
      // this.NAME_OF_CONSTANT[0].name = 'abc'
      // console.info(this.NAME_OF_CONSTANT);
      // this.OTHER = 'aaaaaaaaa'
    }, 3000);
  }
}
</script>
<style></style>
