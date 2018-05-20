// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Toast} from 'vant'
import App from './App'
import router from './router'
import store from './store'
import Storage from './utils/localstorage'

Vue.config.productionTip = false

Vue.use(Toast)

/**
 * 初始化localstorage
 * */

Vue.prototype.$storage = new Storage()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
