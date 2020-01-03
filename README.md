# vue-plugins
vue在使用过程中的一些自定义扩展插件

注意：为了方便 plugins、filters 中都有使用到 lodash 库，请先安装 lodash 到项目中。

plugins

插件 | 说明
---|---
v-f-ref | Vue 中优雅的获取任意跨层级子孙组件的实例对象（杜绝业务复杂时使用 parent、children）
p-f-unicom | Vue 自定义插件，解决了 Vue 中非父子组件通讯的痛点
p-f-link | Vue 组件获取其它组件实例插件 （无视组件层级、子孙关系）


filters

插件 | 说明
---|---
data-dict-filter | 数据字典 Vue 全局过滤器载入 插件（在模板中使用）
