/**
 * 数据字典配置（公用）
 * 'KEY': [{'paramValue':key,'paramDesc': value}]
 * KEY也可以是 '命名空间/名称' 防止命名冲突
 * 如果key小写载入时会被转换大写
 */
// 公用数据字典
const CommonDictionary = {
  SEX_TYPE: [
    { paramValue: 0, paramDesc: '女' },
    { paramValue: 1, paramDesc: '男' }
  ],
  BOOLEAN_NUMBER_TYPE: [
    { paramValue: 0, paramDesc: '否' },
    { paramValue: 1, paramDesc: '是' }
  ],
  BOOLEAN_BOOLEAN_TYPE: [
    { paramValue: false, paramDesc: '否' },
    { paramValue: true, paramDesc: '是' }
  ]
  // ...
}
export default { ...CommonDictionary }
