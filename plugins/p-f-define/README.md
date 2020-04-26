## Vue 应用程序中管理环境变量和配置

### （一）前言
在Vue应用程序中管理环境变量和配置。

**p-f-define** 自定义插件：
1. 插件中会合并`Vue Cli`项目中配置的 `.env`、`.env.development`、`.env.production`文件配置的全局环境变量参数。
2. 提供内联配置和外部配置文件（可以是本地也可以是远程只要能访问到）两种方式增加全局环境变量。
3. 运行插件后全局环境变量统一由插件定义的接口提供，插件中定义的配置参数在`process.env`对象中无法访问到。
4. 配置参数对应的名称可以是命名空间的形式（防止参数key键重名），插件将会自动转换为`object`对象的形式。
5. 环境变量参数命名必须以 `VUE_APP_` 开头，比如VUE_APP_XXX。


**注意**

`.env`、`.env.development`、`.env.production`三个配置文件不要乱起名，也无需专门手动控制加载哪个文件。
1. `.env` 全局默认配置文件，不论什么环境都会加载合并。
2. `.env.development` 开发环境下的配置文件。
3. `.env.production` 生产环境下的配置文件。

如果在`.env`文件中需要配置通过插件转以后是object对象形式的参数，配置规则如下：

.env
```
VUE_APP_DB_HOST = localhost
VUE_APP_DB_USER = root
VUE_APP_DB_PASS = s1mpl3
// 这样 VueDefine 插件只会认为是一个字符串所以在组件中无法使用对象的形式操作
// VUE_APP_DATA_3 = {"foo":"bar"} 
// 可以通过命名空间的形式，这样 VueDefine 插件会自动转换为 object 对象的形式
VUE_APP_DATA_3.foo = bar
VUE_APP_A.B.C = 1222321321
```
`.env.development`

```
VUE_APP_API_ROOT = http://xxx:8082/oa/
```
`.env.production`
```
VUE_APP_API_ROOT = back/oa/
```

##### 使用

main.js 注册 VueDefine 插件

```
import Vue from 'vue'
import App from './App.vue'
// 导入插件
import { VueDefine, Define, DefineManager } from './plugin/define/index.js'

// 外部文件载入
DefineManager.import(
  import('./config/config.app.js'),
  import('./config/config.locale.js'),
  import('./config/config.lang.en.json')
).then(() => {
  console.log(Define.LOG_ENABLED)
  console.log(Define.LANG)
})
// 内联配置
Vue.use(VueDefine, {
  defines: {
    'VUE_APP_TITLE2.POP': '禁止在构造函数中，在调用 super() 之前使用 this 或 super', // 命名空间形式
    'VUE_APP_TITLE2.CODE': '222222222', // 命名空间形式 （会自动转换为对象的形式）
    'VUE_APP_TITLE2.A.B.C': '内部测试C', // 命名空间形式
    'VUE_APP_TITLE2.A.B.D': '内部测试D', // 命名空间形式
    VUE_APP_DATA_2: {foo: 'bar' }, // 对象json
    VUE_APP_TITLE_A: '工程名称', // string
    VUE_APP_DESCRIPTION2: '禁止在对象中使用不必要的计算属性' // string
  }
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

```

##### 示例

![image](http://i2.tiimg.com/717460/7b50b6508addb9f3.jpg)

APP.vue

```
<template>
  <div id="app">
    <define-index></define-index>
  </div>
</template>
<script>
import DefineIndex from './components/define/index.vue'
export default {
  components: {
    DefineIndex
  },
  data () {
    return {
      name: 'APP.vue'
    }
  }
}
</script>
<style></style>
```

index.vue

```
<template>
  <div>
    <p>在 Vue 应用程序中管理环境变量和配置。</p>
    <div>
      <p>
        Vue Cli加载的 .env、.env.development、.env.production
        配置文件中的环境变量
      </p>
      <ul>
        <li v-for="(value, key) in processEnv" :key="key">
          {{ key }}：{{ value }}
        </li>
      </ul>
      <p>自定义插件 VueDefine 设置的环境变量</p>
      <ul>
        <li v-for="(value, key) in defineEnv" :key="key">
          {{key}}：{{value}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    processEnv () {
      return process.env
    },
    defineEnv () {
      return this.$define
    }
  },
  mounted () {
    console.info(this.$define); // object 所有定义的环境变量包括 .env 文件中配置的和外部文件载入
    console.info(this.$defineManager.get('VUE_APP_DATA_2')); // object {foo: "bar"}
    console.info(this.$defineManager.get('VUE_APP_TITLE2')); // object {POP: "禁止在构造函数中，在调用 super() 之前使用 this 或 super", CODE: "222222222", A: {B: {C: "内部测试C", D: "内部测试D"}}}
    console.info(this.$defineManager.get('VUE_APP_TITLE2.A')); // object {B: {C: "内部测试C", D: "内部测试D"}}
    this.$defineManager.set('shop.car', '大众')
    console.info(this.$define.shop); // object {car: "大众"}
    console.info(this.$defineManager.get('shop.car')); // 大众
    setTimeout(() => {
      // 外部 import 载入的配置文件
      // promise异步载入在组件中所以不一定什么时候能获取到
      console.log(this.$define.LOG_ENABLED)
    }, 1000);
  }
}
</script>

<style></style>
```





