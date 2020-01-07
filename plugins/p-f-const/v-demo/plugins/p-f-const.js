/**
 * Vue 自定义常量注册 computed 计算属性插件
 */
function deepFreeze (obj) {
  const propNames = Object.getOwnPropertyNames(obj)
  for (const name in propNames) {
    const prop = obj[name]
    if (typeof prop === 'object' && prop !== null) {
      deepFreeze(prop)
    }
  }
  return Object.freeze(obj)
}
function error (message) {
  console.error(message)
}
const REGEXP_CONSTANT = /^[A-Z_][A-Z0-9_]*$/
export default {
  install (Vue) {
    Vue.mixin({
      beforeCreate () {
        const constants = this.$options.const
        if (!constants) return
        this.$options.computed = this.$options.computed || {}
        for (const key in constants) {
          // 常量必须是自身（非继承）属性
          if (Object.prototype.hasOwnProperty.call(constants, key)) {
            if (!REGEXP_CONSTANT.test(key)) {
              // 必须大写字母
              error(`Constant '${key}' must use upper case letters and underscores`)
              continue
            }
            const frozen = deepFreeze(constants[key])
            // 常量不能修改
            this.$options.computed[key] = {
              get: () => frozen,
              set: () => error(`Constant '${key}' cannot be changed`)
            }
          }
        }
      }
    })
  }
}
