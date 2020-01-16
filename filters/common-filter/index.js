/**
 * 公共自定义全局过滤器
 * 如果项目中使用频率高的某些过滤器函数可以将函数名称集合传入本类中初始化为全局过滤器
 */

const CommonFilter = class CommonFilter {
  constructor (Vue) {
    this.filterKeys = []
    this.Vue = Vue
  }

  /**
   * @desc 初始化提供哪些全局过滤函数
   * @param {function[]} filters - 构造函数集合
   * @example
   * import { trim } from './filters/common-filter/source.js'
   * const MyFilter = new CommonFilter()
   * MyFilter.init(Vue, [trim])
   */
  init (filters) {
    // 全局过滤器
    for (const elem of filters.values()) {
      if (this.filterKeys.includes(elem.name)) {
        continue
      }
      this.filterKeys.push(elem)
      this.Vue.filter(elem.name, function (...params) {
        if (!CommonFilter._isFunction(elem)) return
        return elem(...params)
      })
    }
  }

  /**
   * @desc 动态添加一个全局过滤函数
   * @param {function} func=null - 构造函数
   */
  add (func = null) {
    if (func === null || !CommonFilter._isFunction(func) || this.filterKeys.includes(func.name)) return
    this.filterKeys.push(func.name)
    this.Vue.filter(func.name, function (...params) {
      return func(...params)
    })
  }

  /**
   * @desc 加载外部文件
   * @param  {...Promise} promised - 需要动态加载的具有 promise 返回对象的函数
   */
  import (...promised) {
    return new Promise((resolve, reject) => {
      let [matching, matched, p] = [promised.length, 0, null]
      while ((p = promised.shift())) {
        p.then(defines => {
          if (Object.prototype.hasOwnProperty.call(defines, 'default')) {
            this._append(defines.default)
          } else {
            this._append(defines)
          }
          ++matched
          if (matched === matching) {
            resolve()
          }
        }).catch(e => {
          reject(e)
        })
      }
    })
  }

  /**
   * @desc 动态添加全局过滤函数
   * @param  {object} defines={} - 存放过滤函数的json对象
   * @example
   * {trim: function(){},uniqueArray: function(){}}
   */
  _append (defines = {}) {
    for (const [key, elem] of Object.entries(defines)) {
      if (Object.prototype.hasOwnProperty.call(defines, key) && !this.filterKeys.includes(elem.name)) {
        this.filterKeys.push(elem.name)
        this.Vue.filter(elem.name, function (...params) {
          if (!CommonFilter._isFunction(elem)) return
          return elem(...params)
        })
      }
    }
  }

  /**
   * @desc 数据安全类型检查-函数
   * @param {function} value - 构造函数
   */
  static _isFunction (value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Function'
  }
}
/**
 * @desc 数据安全类型检查-函数
 * @param {function[]} value - 参数
 */
const isArray = function (value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Array'
}
export default {
  install: function (Vue, { filters = [] } = {}) {
    const MyFilter = new CommonFilter(Vue)
    Vue.prototype.$CommonFilter = MyFilter
    if (isArray(filters) && filters.length > 0) {
      MyFilter.init(filters)
    }
  }
}
