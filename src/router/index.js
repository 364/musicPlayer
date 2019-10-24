import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/home',
      children:[{
        path: '/home',
        name: 'Home',
        component: Home,
      }]
    }
  ]
})
