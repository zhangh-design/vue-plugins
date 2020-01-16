// 数据安全类型检查
// 对象
export const isObject = function (value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Object'
}
// 数组
export const isArray = function (value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Array'
}
// 函数
export const isFunction = function (value) {
  return Object.prototype.toString.call(value).slice(8, -1) === 'Function'
}
