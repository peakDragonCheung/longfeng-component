import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Layout from '@/layout'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      component: Layout,
      children: [{
        path: 'home',
        component: Home,
        name: 'home'
      }]
    }
  ]
})
