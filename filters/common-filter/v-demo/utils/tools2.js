// 去除前后空格
export const trim = function (str) {
  if (typeof str !== 'string') return
  if (str.length === 0) return str
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

// 简单的数组去重
export const uniqueArray = function (arr = []) {
  // return [...new Set(arr)]
  return arr
}

// 简单的对象数组去重
export const uniqueObjArray = function (arr = []) {
  var result = []
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    if (!obj[arr[i].key]) {
      result.push(arr[i])
      obj[arr[i].key] = true
    }
  }
  return result
}
