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
