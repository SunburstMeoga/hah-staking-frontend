import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Details from '@/pages/Details'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    }
  ]
})
