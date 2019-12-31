/**
 * 用于 mixins 混入测试
 */
export default {
  unicomGroup: ['child-a'],
  unicom: {
    message (sender, text1, text2) {
      console.info('Child2：', sender, text1, text2)
    }
  }
}
