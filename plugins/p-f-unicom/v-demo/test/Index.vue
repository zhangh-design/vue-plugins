<template>
  <div>
    <child
      v-if="showStatus"
      unicom-id="child-id"
      :unicom-group="childGroup"
    ></child>
    <child1
      v-if="showStatusChild1"
      unicom-id="child-id1"
      :unicom-group="child1Group"
    ></child1>
    <child2 v-if="showStatusChild2" unicom-id="child-id2"></child2>
    <div style="margin-top: 10px;">
      <ul>
        <li>
          <button @click="doSend">message#child-id 发送到指定组件</button>
        </li>
        <li>
          <button @click="doSend1">message#child-id1 发送到指定组件</button>
        </li>
        <li><button @click="doSend2">message 发动到所有组件</button></li>
        <li>
          <button @click="doSend3">message@child-a 发送到指定分组</button>
        </li>
        <li>
          <button @click="doSend4">message1@child-b 发送到指定分组</button>
        </li>
        <li>
          <button @click="doSend5">message@child-z 发送到指定分组</button>
        </li>
        <li><button @click="doSend6">#child-id 获取指定组件</button></li>
        <li><button @click="doSend7">@child-a 获取指定分组组件</button></li>
        <li><button @click="doSend13">@child-c 获取指定分组组件</button></li>
        <li>
          <button @click="doSend8">
            指令延迟发送，直到包含有 `message3` 指令的组件出现
          </button>
        </li>
        <li>
          <button @click="doSend9">
            指令延迟发送，直到出现分组命名 child-f 的组件
          </button>
        </li>
        <li>
          <button @click="doSend10">
            指令延迟发送，直到出现命名 child-id2 的组件
          </button>
        </li>
        <li><button @click="doSend14">更新 Child1 组件的 unicom-group 组信息</button></li>
        <li><button @click="doDestroyChild1">销毁组件Child1</button></li>
        <li><button @click="doDestroyAll">销毁所有组件</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Child from './Child.vue'
import Child1 from './Child1.vue'
import Child2 from './Child2.vue'
export default {
  components: {
    Child,
    Child1,
    Child2
  },
  unicomGroup: ['parent-a', 'parent-b'],
  data () {
    return {
      message: '跨组件通信插件',
      showStatus: true,
      showStatusChild1: true,
      showStatusChild2: false,
      childGroup: ['child-a', 'child-b', 'child-c'],
      child1Group: ['child-z', 'child-a']
    }
  },
  myCodeP: {},
  mounted () {
    this.doSend11()
    this.doSend12()
  },
  methods: {
    doSend () {
      this.$unicom('message#child-id', 'hello', this.message)
    },
    doSend1 () {
      this.$unicom('message#child-id1', this.message)
    },
    doSend2 () {
      this.$unicom('message', this.message)
    },
    doSend3 () {
      this.$unicom('message@child-a', 'hello', this.message)
    },
    doSend4 () {
      this.$unicom('message1@child-b', 'hello', this.message)
    },
    doSend5 () {
      this.$unicom('message@child-z', 'child-z')
    },
    doSend6 () {
      const child = this.$unicom('#child-id')
      console.info(child)
    },
    doSend7 () {
      const childs = this.$unicom('@child-a')
      console.info(childs)
    },
    doSend8 () {
      const childs = this.$unicom('~message3', '参数1')
      console.info(childs)
      setTimeout(() => {
        this.showStatusChild2 = true
      }, 1000)
    },
    doSend9 () {
      const childs = this.$unicom('~message3@child-f', '参数1')
      console.info(childs)
      setTimeout(() => {
        this.showStatusChild2 = true
      }, 1000)
    },
    doSend10 () {
      const childs = this.$unicom('~message3#child-id2', '参数1')
      console.info(childs)
      setTimeout(() => {
        this.showStatusChild2 = true
      }, 1000)
    },
    doSend11 () {
      this.$unicom('~@child-f', function (childVm) {
        console.info('监听分组命名 child-f 的组件出现 ', childVm)
      })
    },
    doSend12 () {
      this.$unicom('~#child-id2', function (childVm) {
        console.info('监听命名 child-id2 的组件出现 ', childVm)
      })
    },
    doSend13 () {
      const childs = this.$unicom('@child-c')
      console.info(childs)
    },
    doSend14 () {
      this.child1Group = ['child-h']
    },
    doDestroyChild1 () {
      this.showStatusChild1 = false
    },
    doDestroyAll () {
      this.showStatus = false
      this.showStatusChild1 = false
      this.showStatusChild2 = false
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 8px;
}
</style>
