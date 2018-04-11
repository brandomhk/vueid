import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Dev from './Dev.vue'
import DevVuex from './components/DevVuex.vue'

export default new VueRouter({
  routes: [
  {
    name: 'dev',
    path: '/dev',
    component: Dev
  },
  {
    name: 'dev-vuex',
    path: '/dev-vuex',
    component: DevVuex
  },
  ]
})
