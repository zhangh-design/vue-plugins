
import Define from './define.js'
import _set from 'lodash/set'
import _get from 'lodash/get'

class DefineManager {
  /**
   * @desc 添加环境变量到 Define 对象
   * @param  {...any} defines - 新增全局环境变量配置对象
   * @example
   * import {Define, DefineManager} from './plugin/define/index.js'
   * DefineManager.append({
   *   LOG_ENABLED: true,
   *   LOG_METHOD: 'console'
   * },{
   *   LOCALES: {
   *     en: 'English',
   *     zh: '中文'
   *   },
   *   DEFAULT_LOCALE: 'en',
   * })
   * console.log(Define.LOG_ENABLED) // true
   */
  append (...defines) {
    let define
    while ((define = defines.shift())) {
      for (const key in define) {
        this.set(key, define[key])
      }
    }
  }

  /**
   *
   * @param  {...Promise} promised - 需要动态加载的具有 promise 返回对象的函数
   * @example
   * import { Define, DefineManager } from './plugin/define/index.js'
   * DefineManager.import(
   *   import('./config/config.app.js'),
   *   import('./config/config.lang.en.json')
   * ).then(() => {
   *   console.log(Define.LOG_ENABLED)
   *   console.log(Define.LANG)
   * })
  */
  import (...promised) {
    return new Promise((resolve, reject) => {
      const matching = promised.length
      let matched = 0; let p
      while ((p = promised.shift())) {
        p.then(defines => {
          if (Object.prototype.hasOwnProperty.call(defines, 'default')) {
            this.append(defines.default)
          } else {
            this.append(defines)
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
   * @desc 获取设置的全局环境变量值
   * @param {string|number} name - 全局环境变量值对应的key
   * @param {*} [def=null] - 默认值
   * @returns {*}
   * @example
   * this.$defineManager.get('VUE_APP_TITLE')
  */
  get (name = null, def = null) {
    return _get(Define, name, def)
  }

  /**
   * @desc 动态设置全局环境变量值
   * @param {string|number} name - 全局环境变量值对应的key
   * @param {*} value - value值
   * @example
   * this.set('VUE_APP_TITLE_A', '工程名称')
   */
  set (name, value) {
    // name 包含命名空间的写法 （VUE_APP_TITLE2.A.B.C）
    _set(Define, name, value)
  }
}

export default new DefineManager()
