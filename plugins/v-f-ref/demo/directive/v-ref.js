import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import _find from 'lodash/find'
import _isNil from 'lodash/isNil'
import _isFunction from 'lodash/isFunction'
import _isEmpty from 'lodash/isEmpty'

/**
 * @desc
 * 获取跨层级子孙组件实例
 */
export default {
  install: function (Vue, options) {
    const directiveName = _get(options, 'name', 'f-ref')
    Vue.directive(directiveName, {
      bind (el, binding, vNode) {
        // 初始化
        const callValueFn = _get(binding, 'value')
        if (_isEqual(_isNil(callValueFn), false) && _isFunction(callValueFn)) {
          callValueFn(_get(vNode, 'componentInstance', el), _get(vNode, 'key'))
        }
      },
      update (el, binding, vNode, oldVNode) {
        if (_isEqual(_isNil(_get(oldVNode, 'data')), false) && _isEqual(_isNil(_get(oldVNode, 'data.directives')), false)) {
          const oldBinding = _find(_get(oldVNode, 'data.directives', []), function (directive) {
            const name = _get(directive, 'name')
            return _isEqual(name, directiveName)
          })
          const [oldValue, value] = [_get(oldBinding, 'value'), _get(binding, 'value')]
          if (_isEqual(_isEmpty(oldBinding), false) && _isEqual(_isEqual(oldValue, value), false)) {
            // 当指令的 binding.value 是动态绑定时会有这种情况发生
            // 前后两个指令的 value 不一致解除值的引用
            oldValue(null, _get(oldVNode, 'key'))
            // 设置新的值
            value(_get(vNode, 'componentInstance', el), _get(vNode, 'key'))
          }
        }
        // 不应该有这种 update 发生
        if (_isEqual(_isEqual(_get(vNode, 'componentInstance'), _get(oldVNode, 'componentInstance')), false) || _isEqual(_isEqual(_get(vNode, 'elm'), _get(oldVNode, 'elm')), false)) {
          const callValueFn = _get(binding, 'value')
          if (_isEqual(_isNil(callValueFn), false) && _isFunction(callValueFn)) {
            callValueFn(_get(vNode, 'componentInstance'), _get(vNode, 'key'))
          }
        }
      },
      unbind (el, binding, vNode) {
        const callValueFn = _get(binding, 'value')
        if (_isEqual(_isNil(callValueFn), false) && _isFunction(callValueFn)) {
          // 销毁组件解除指令的引用 （v-if、 component 动态组件）
          callValueFn(null, _get(vNode, 'key'))
        }
      }
    })
  }
}
