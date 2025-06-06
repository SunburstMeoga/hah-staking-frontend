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

// 安全地初始化Web3，处理MetaMask移动端环境
function initWeb3() {
  try {
    if (typeof window !== 'undefined' && window.ethereum) {
      return new Web3(window.ethereum)
    } else {
      // 如果ethereum不可用，创建一个空的Web3实例，避免应用崩溃
      console.warn('Ethereum provider not found, creating fallback Web3 instance')
      return new Web3()
    }
  } catch (error) {
    console.error('Error initializing Web3:', error)
    return new Web3()
  }
}

Vue.prototype.Web3 = initWeb3()
Vue.prototype.Config = config

// 添加Web3重新初始化方法
Vue.prototype.reinitWeb3 = function() {
  try {
    if (window.ethereum && !this.Web3.currentProvider) {
      this.Web3 = new Web3(window.ethereum)
      console.log('Web3 reinitialized with ethereum provider')
    }
  } catch (error) {
    console.error('Error reinitializing Web3:', error)
  }
}

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
