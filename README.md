# vue-plugins
vue在使用过程中的一些自定义扩展插件

注意：为了方便 plugin 中都有使用到 lodash 库，请先安装 lodash 到项目中。

插件 | 说明
---|---
v-f-ref | 优雅的获取任意跨层级子孙组件的实例对象（杜绝业务复杂时使用 parent、children）
p-f-unicom | Vue 自定义插件，解决了 Vue 中非父子组件通讯的痛点