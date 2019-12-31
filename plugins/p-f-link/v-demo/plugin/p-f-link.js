/**
 * Vue 组件获取其它组件实例插件 （无视组件层级、子孙关系）
 * 在孙子组件中混入props自定义属性'link'，同名link无法添加入集合
 * 混入后的组件中通过调用 getLinkComponent(linkId) 传入各个组件中的自定义link值获取组件实例
 * 如果需要同时获取某一组的组件实例请使用 p-f-unicom 插件，p-f-link 只提供获取单个组件实例
 */
export default {
  install (Vue, options = { name: 'link' }) {
    const vmMap = new Map()
    // 全局混入
    Vue.mixin({
      props: {
        [options.name]: {
          type: String,
          default: ''
        }
      },
      created () {
        const us = this[options.name]
        if (us && us.length && !vmMap.has(us)) {
          vmMap.set(us, this)
        }
      },
      beforeDestroy () {
        const us = this[options.name]
        if (us && us.length && vmMap.has(us)) {
          vmMap.delete(us)
        }
      },
      methods: {
        /**
         * @desc 获取 link 指向的组件实例
         * @param {string} linkId - link 值名称
         * @returns {Object} 组件实例
         */
        getLinkComponent (linkId) {
          return vmMap.has(linkId) ? vmMap.get(linkId) : undefined
        },
        /**
         * @desc 判断 link 指向的对象是否存在
         * @param {string} linkId - link 值名称
         * @returns {boolean}
         */
        isHaveLink (linkId) {
          return vmMap.has(linkId)
        },
        /**
         * @desc 清除指定 link 指向的对象
         * @param {string} linkId - link 值名称
         */
        clearLinkComponent (linkId) {
          if (vmMap.has(linkId)) {
            vmMap.delete(linkId)
          }
        }
      }
    })
  }
}
