// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/iconfont.css'
import './assets/css/global.css'
import 'tailwindcss/tailwind.css'
import 'vant/lib/index.css';
import i18n from './i18n';

import store from './store'
import router from './router'
import '@vant/touch-emulator';

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
  i18n,
  components: { App },
  template: '<App/>'
})
