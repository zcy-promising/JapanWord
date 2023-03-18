// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//进入到vue项目目录下 输入命令cnpm  i  element-ui –S
//引入element-ui 组件
import ElementUI from 'element-ui'
//引入element-ui 的样式
import 'element-ui/lib/theme-chalk/index.css'
//全局加载element-ui 组件
Vue.use(ElementUI)

import axios from 'axios'
Vue.prototype.$axios=axios


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
