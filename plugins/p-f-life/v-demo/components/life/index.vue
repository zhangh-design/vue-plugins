<template>
  <div>
    life 组件
    <!--用于测试 updated 钩子函数-->
    <h1 v-if="myStatus">{{name}}</h1>
    <button @click="doChange">测试 updated 钩子函数</button>
  </div>
</template>

<script>
export default {
  // 自定义生命周期函数将在 mixin 混入的 Vue 生命周期之中执行所以将会在组件的 Vue 生命周期之前执行掉
  // 自定义钩子函数运行于当前组件实例上下文之中
  life: {
    prepose () {
      // 当前组件 beforeCreate 钩子函数前执行
      console.info('prepose 默认前置钩子函数')
    },
    readShop ({ then, data, emit }) {
      // 当前组件 created 钩子函数前执行
      console.info('readShop', data, this.name)
      // 再次通过 emit 触发其它函数
      emit('afterReadShop', { name: '小框' })
      then(() => {
        // 将会在 created之后mounted之前得到执行
        console.info('readShop.callback');
      })
    },
    afterReadShop ({ then, emit, data }) {
      // 将会在 created之后mounted之前得到执行
      // 因为默认不指定生命周期的自定义钩子函数会依赖到 mounted 中（可以通过 hookDefault 参数来重新设置默认 Vue 生命周期钩子函数）
      console.info('afterReadShop', data);
    },
    uploadImage () {
      // 当前组件 mounted 钩子函数前执行
      console.info('uploadImage')
    },
    changeView () {
      // 当前组件 updated 钩子函数前执行
      console.info('changeView')
    }
  },
  data () {
    return {
      name: 'life 子组件',
      myStatus: false
    }
  },
  beforeCreate () {
    console.info('beforeCreate...');
  },
  created () {
    console.info('created....');
  },
  mounted () {
    console.info('mounted....');
  },
  updated: function () {
    console.info('updated...');
  },
  methods: {
    doChange () {
      this.myStatus = !this.myStatus
    }
  }
}
</script>

<style></style>
