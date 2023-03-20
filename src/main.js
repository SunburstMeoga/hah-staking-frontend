// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/iconfont.css'
import 'tailwindcss/tailwind.css'
import Vant from 'vant';
import 'vant/lib/index.css';

import store from './store'
import router from './router'

import Web3 from 'web3'
import { config } from './const/config'


Vue.prototype.Web3 = new Web3(window.ethereum)
Vue.prototype.Config = config

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
