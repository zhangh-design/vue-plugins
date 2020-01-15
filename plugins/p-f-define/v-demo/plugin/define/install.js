import DefineManager from './define_manager'
import Define from './define.js'

/**
 * @desc 从脚手架默认的全局环境变量对象 process.env 中获取参数
 */
function getProcessEnv () {
  const env = {}
  const environment = process.env
  for (const name in environment) {
    const value = environment[name]
    env[name] = ['boolean', 'number', 'string'].includes(typeof value) ? value : JSON.stringify(value)
  }
  return env
}

export default {
  install (Vue, { defines = {} } = {}) {
    DefineManager.append(getProcessEnv(), defines)
    Vue.prototype.$defineManager = DefineManager
    Vue.prototype.$define = Define
  }
}
