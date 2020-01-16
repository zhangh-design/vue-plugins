/**
 * 默认提供的过滤函数
 * 可以直接 import 这个文件然后在组件中实现本地过滤器功能
 */
// 去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
export const trim = function (value = '', trim = 1) {
  switch (trim) {
    case 1:
      return value.replace(/\s+/g, '');
    case 2:
      return value.replace(/(^\s*)|(\s*$)/g, '');
    case 3:
      return value.replace(/(^\s*)/g, '');
    case 4:
      return value.replace(/(\s*$)/g, '');
    default:
      return value;
  }
}
// 根据传入的日期格式进行转换
export const dateformat = function (date = null, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (date === null) {
    return
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt
}
// 保留2位小数
export const toDecimal2 = function (x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var b = Math.round(x * 100) / 100;
  var s = b.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}
