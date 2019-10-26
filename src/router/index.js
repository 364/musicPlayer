import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import Recommend from '@/views/Recommend'
import Singer from '@/views/Singer'
import SongList from '@/views/SongList'

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
        redirect:'/home/recommend',
        children:[
          {
            path: '/home/recommend',
            name: 'Recommend',
            component: Recommend,
          },
          {
            path: '/home/singer',
            name: 'Home',
            component: Singer,
          },{
            path: '/home/song',
            name: 'Home',
            component: SongList,
          }
        ]
      }]
    }
  ]
})
