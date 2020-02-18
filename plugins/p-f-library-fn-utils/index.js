/* eslint-disable no-unused-vars */
// @ts-nocheck
/**
 * Vue.js 中使用任意 JavaScript 第三方库
 * 封装常用的第三方帮助函数（Lodash, Moment）统一提供到 Vue 的原型对象上，好处是不需要在每个文件中再次导入
 * 我们使用 Object.defineProperty 进行 Vue 原型对象的挂载操作，切记不要使用 window 对象因为这样在使用服务器渲染时无法使用（在服务端运行时，window 对象是 undefined 的）
 */
import _assign from 'lodash/assign'
import _pick from 'lodash/pick'
import _isPlainObject from 'lodash/isPlainObject'
import _isNil from 'lodash/isNil'
import _has from 'lodash/has'
import _replace from 'lodash/replace'
import _isString from 'lodash/isString'
import _get from 'lodash/get'
import _eq from 'lodash/eq'
import _set from 'lodash/set'
import _keys from 'lodash/keys'
import _isObject from 'lodash/isObject'
import _cloneDeep from 'lodash/cloneDeep'
import _includes from 'lodash/includes'
import _concat from 'lodash/concat'
import _isEmpty from 'lodash/isEmpty'
import _now from 'lodash/now'
import _isUndefined from 'lodash/isUndefined'
import _isFunction from 'lodash/isFunction'
import _toUpper from 'lodash/toUpper'
import _isArray from 'lodash/isArray'
import moment from 'moment'
// 中文简体
moment.locale('zh-cn')

/**
 * @desc Lodash库
 * @param {Object} Vue - Vue 实例对象
 */
function injectLodash (Vue) {
  /**
   * @desc 定义载入函数列表（防止有些函数可能是匿名函数创建，无法统一用 Function.name 获取函数名称）
   */
  const b = [
    { _assign: _assign },
    { _pick: _pick },
    { _isPlainObject: _isPlainObject },
    { _isNil: _isNil },
    { _has: _has },
    { _replace: _replace },
    { _isString: _isString },
    { _get: _get },
    { _eq: _eq },
    { _set: _set },
    { _keys: _keys },
    { _isObject: _isObject },
    { _cloneDeep: _cloneDeep },
    { _includes: _includes },
    { _concat: _concat },
    { _isEmpty: _isEmpty },
    { _now: _now },
    { _isUndefined: _isUndefined },
    { _isFunction: _isFunction },
    { _toUpper: _toUpper },
    { _isArray: _isArray }
  ]
  const { defineProperty, entries } = Object;
  for (const elem of b.values()) {
    for (const [key, fn] of entries(elem)) {
      defineProperty(Vue.prototype, `${key}`, { value: fn })
    }
  }
}
/**
 * @desc Moment库
 * @param {Object} Vue - Vue 实例对象
 */
function injectMoment (Vue) {
  /**
   * _dateformat 时间格式转换
   * _nowTimeStamp 获取当前时间戳
   */
  const b = [
    {
      _dateformat: (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
        return moment(dataStr).format(pattern)
      }
    },
    {
      _nowTimeStamp: () => {
        const time = new Date();
        return moment(time).valueOf()
      }
    }
  ]
  // 获取的 month 要 +1，取值范围是 0~11
  Object.defineProperty(Vue.prototype, '$moment', { value: moment });
  const { defineProperty, entries } = Object;
  for (const elem of b.values()) {
    for (const [key, fn] of entries(elem)) {
      defineProperty(Vue.prototype, `${key}`, { value: fn })
    }
  }
}

export default {
  install (Vue, options = {}) {
    injectLodash(Vue)
    injectMoment(Vue)
  }
}
