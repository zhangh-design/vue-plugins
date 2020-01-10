/**
 * input 控件自动设置焦点指令
 */
import _isNil from 'lodash/isNil'
import _isEqual from 'lodash/isEqual'

/**
 * @desc input 控件设置焦点
 * @param {*} el - 指令所绑定的HTML元素
 * @param {*} binding - Vue 提供的一个对象，用于获取指令上的属性
 */
function doFocus (el, binding) {
  let inputEl = null
  if (el.tagName.toLowerCase() === 'input') {
    inputEl = el
  } else if (el.tagName.toLowerCase() !== 'input' && el.childNodes.length > 0) {
    inputEl = Array.from(el.childNodes).find(child => !!child.tagName && (child.tagName).toLowerCase() === 'input')
  }
  if (_isEqual(_isNil(binding.value), false) && binding.value === 'focused') {
    inputEl && inputEl.focus()
  } else {
    inputEl && inputEl.blur()
  }
}

export default {
  install (Vue, { name = 'focus' } = {}) {
    Vue.directive(name, {
      // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
      inserted (el, binding) {
        setTimeout(() => {
          doFocus(el, binding)
        }, 0);
      },
      // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
      componentUpdated (el, binding) {
        if (_isEqual(_isNil(binding.modifiers.always), false)) {
          // 如果指令设置了 always 属性则代表 view 更新后该控件仍旧设置焦点
          setTimeout(() => {
            doFocus(el, binding)
          }, 0);
        }
      }
    })
  }
}
