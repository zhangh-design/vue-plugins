// @ts-nocheck
/**
 * 数据字典 Vue 全局过滤器（在模板中使用）
 * <div>{{0 | SEX_TYPE}}</div>
 * 例如在 methods 中请使用Vue根实例过滤转换器 plugins/root-filters.js
 */
import Vue from 'vue'
import dictionary from './data-dict.js'
import _omit from 'lodash/omit'
import _forEach from 'lodash/forEach'
import _get from 'lodash/get'

class DataDictFilter {
  constructor () {
    this.init()
  }

  /**
   * @desc 初始化 公用数据字段配置
   */
  init () {
    Object.keys(dictionary).forEach(key => {
      // 全局过滤器
      Vue.filter(key.toUpperCase(), function (value) {
        if (value.length) return;
        const tar = dictionary[key].find(item => item.paramValue === value) || {}
        return tar.paramDesc
      })
    })
  }

  /**
   * @desc 添加自定义规则
   * @example
   * import DataDictFilter from './filters/data-dict-filter/index.js'
   * const myDict = {"DIRECTION_TYPE": [{'paramValue': 0, 'paramDesc': '北'},{'paramValue': 1, 'paramDesc': '东'}]}
   * DataDictFilter.add(myDict)
   */
  add (dict = {}) {
    const omitDict = _omit(dict, Object.keys(dictionary))
    _forEach(omitDict, function (configOpt, key) {
      Vue.filter(key.toUpperCase(), function (value) {
        if (value.length) return;
        const tar = configOpt.find(item => item.paramValue === value) || {}
        return _get(tar, 'paramDesc')
      })
    })
  }
}
export default new DataDictFilter()
