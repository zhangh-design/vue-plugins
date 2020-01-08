/**
 * Vue 自定义全局生命周期插件
 * 一次性生命周期函数
 */
import _has from 'lodash/has'
import _isEqual from 'lodash/isEqual'
import _get from 'lodash/get'
import _set from 'lodash/set'
import _forEach from 'lodash/forEach'
import _isNil from 'lodash/isNil'
import _isFunction from 'lodash/isFunction'
import _assign from 'lodash/assign'
import _bind from 'lodash/bind'
import _isEmpty from 'lodash/isEmpty'
/**
 * name 组件中的 $options['life'] 配置名称
 * hooksOpt 自定义钩子函数配置
 * hookDefaultName 默认钩子函数名称
 * hookLives 存放组件自定义 life 对象
 * hookEmitData emit事件中的自定义参数 （emit('user', {'age': 16}) {'age':16 将会设置到 hookEmitData 对象中}）
 */
let [name, hooksOpt, hookDefaultName, hookLives, hookEmitData] = [
  'life',
  {},
  '',
  {},
  {}
]
/**
 *
 * @param {Object} that - 组件实例对象
 */
function getHookLife (that) {
  let life = _get(hookLives, that._uid)
  if (_isNil(life)) {
    life = hookLives[that._uid] = {
      // @ts-ignore
      that,
      // @ts-ignore
      ready: {},
      // @ts-ignore
      data: _assign({}, hookEmitData)
    }
  }
  return life
}
function getHookEmitData (key, that) {
  const data = that ? _get(getHookLife(that), 'data') : hookEmitData
  return _isNil(key) ? data : _get(data, key)
}
/**
 * @desc 添加组件对应的 hookLife 对象
 * @param {Object} that - 组件的实例对象
 * @param {String} vueHookName - 组件中的 Vue 钩子函数名称 （beforeCreate、created、mounted...）
 */
function addHookLives (that, vueHookName) {
  const life = getHookLife(that)
  _set(life, `ready.${vueHookName}`, true)
  if (_isEqual(vueHookName, hookDefaultName) && _has(life, 'callback') && _isFunction(life.callback)) {
    // 事件中的 then 函数
    life.callback()
  }
  return life
}
/**
 *
 * @param {String} key - 自定义生命周期事件的 key （hooks: {user: 'created'} 就是 user ）
 * @param {Object} data - emit 事件函数接收的参数
 * @param {Object} [that] - 组件实例对象
 */
function hookEmit (key, data, that) {
  const hookData = getHookEmitData(null, that)
  _isEqual(_has(hookEmitData, key), false) && _set(hookData, key, data)
  if (_isEqual(_isNil(that), false)) {
    _hookExec(key, getHookLife(that), _get(hookData, key))
    return
  }
  for (const n in hookLives) {
    _hookExec(key, hookLives[n], hookData[key])
  }
}
/**
 *
 * @param {Object} life - hookLives 中的某个组件的 life 对象
 * @param {String} key - 自定义生命周期事件的 key （hooks: {user: 'created'} 就是 user ）
 */
function hookEmitEvent (life, key) {
  return {
    data: _get(life.data, key, {}),
    emit: function (key, value = {}) {
      // 如果 emit 事件在 created 钩子函数中定义，那么下面的 hookEmit 会在 mounted 钩子函数前得到执行
      hookEmit(key, value, life.that)
    },
    then: function (callback) {
      if (_isEqual(life.ready[hookDefaultName], true)) {
        _isFunction(callback) && callback()
        return
      }
      life.callback = callback
    }
  }
}
/**
 *
 * @param {String} key - 自定义生命周期事件的 key （hooks: {user: 'created'} 就是 user ）
 * @param {Object} life - hookLives 中的某个组件的 life 对象
 * @param {Object} data - 事件参数
 */
function _hookExec (key, life, data) {
  if (_isNil(data)) {
    return
  }
  const hook = _get(hooksOpt, key, hookDefaultName)
  if (
    _isNil(_get(life.ready, hook)) ||
    _isEqual(_get(life.ready, hook), false)
  ) {
    return
  }
  const lives = _get(life, `that.$options.${name}`, [])
  let lifeFn = null
  for (let i = 0; i < lives.length; i += 1) {
    lifeFn = _get(lives[i], key)
    if (_isEqual(_isNil(lifeFn), false) && _isFunction(lifeFn)) {
      _bind(lifeFn, life.that, hookEmitEvent(life, key))()
    }
  }
}
export default {
  install: function (
    vue,
    {
      init = function () {},
      hookDefault = 'mounted',
      hooks = {},
      lifeName = 'life',
      args = []
    } = {}
  ) {
    // 定义变量
    const mixinOpt = {}
    hookDefaultName = hookDefault
    hooksOpt = hooks
    name = lifeName
    const hookExecByVM = function (that, vueHookName) {
      const life = addHookLives(that, vueHookName)
      const lives = _get(that.$options, name, [])
      const readies = {}
      for (let i = 0, lifeName; i < lives.length; i += 1) {
        for (lifeName in lives[i]) {
          if (
            _isEqual(_has(readies, lifeName), false) &&
            (_get(hooks, lifeName, hookDefaultName)) === vueHookName
          ) {
            _set(readies, lifeName, true)
            _hookExec(lifeName, life, getHookEmitData(lifeName, that))
          }
        }
      }
    }
    const hooksFn = function (key) {
      return function () {
        if (_isEqual(_isNil(_get(this.$options, name)), false)) {
          if (_isEqual(hooks.prepose, key)) {
            // prepose 触发 emit
            hookEmit('prepose', {}, this)
          }
          // 真正触发 emit 定义的事件，晚于传入的 init 函数执行
          hookExecByVM(this, key)
        }
      }
    }
    // 组件生命周期
    if (_isEqual(_has(hooksOpt, 'prepose'), false)) {
      _set(hooksOpt, 'prepose', 'beforeCreate')
    }
    if (_isEqual(_isNil(init), false) && _isFunction(init)) {
      init(
        {
          emit (key, data = {}) {
            // hookEmit(key, data) 为了把 data 参数放入到 hookEmitData 对象中，后面执行 hookExecByVM 时可以从 hookEmitData 对象中拿取
            _isEqual(_isNil(key), false) && hookEmit(key, data)
          },
          vue,
          hooks: hooksOpt
        },
        ...args
      )
    }
    _forEach(hooksOpt, function (value) {
      _set(mixinOpt, value, hooksFn(value))
    })
    if (_isNil(_get(mixinOpt, hookDefaultName))) {
      _set(mixinOpt, hookDefaultName, hooksFn(hookDefaultName))
    }
    // 全局混入
    vue.mixin({
      ...mixinOpt,
      destroyed () {
        const lives = _get(this.$options, name, [])
        if (_isEqual(_isEmpty(lives), false)) {
          for (const k in hookLives) {
            if (this === _get(hookLives[k], 'that')) {
              delete hookLives[k]
            }
          }
        }
      }
    })
    // 自定义属性合并策略
    vue.config.optionMergeStrategies[name] = function (pVal, nVal) {
      var val = pVal instanceof Array ? pVal : pVal ? [pVal] : []
      if (nVal) {
        val.push(nVal)
      }
      return val
    }
  }
}
