import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Details from '@/pages/Details'
import CrossChainBridge from '@/pages/Cross-ChainBridge'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/node/:address',
      name: 'node',
      component: Details
    },
    {
      path: '/cross-chain-bridge',
      name: 'bridge',
      component: CrossChainBridge
    }
  ]
})
