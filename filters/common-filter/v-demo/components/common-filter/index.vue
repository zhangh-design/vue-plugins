<template>
  <div>
    <p>公共自定义局部组件过滤器</p>
    <ul>
      <li>{{ p1 | trim(1) }}</li>
      <li>{{p2 | dateformat}}</li>
      <li>{{p5 | toDecimal2}}</li>
			<li>{{p6 | capitalize}}</li>
    </ul>
  </div>
</template>

<script>
// 单独使用 source 中的函数用作本地过滤器
import { toDecimal2 } from '../../filters/common-filter/source.js'
export default {
  filters: { toDecimal2 },
  data () {
    return {
      p1: '   hello:   公共  自定义局部  组件过  滤器   !   ',
      p2: new Date(),
			p5: 10.345,
			p6: 'hello'
    }
  },
  mounted () {
  },
  methods: {}
}
</script>

<style></style>
