import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menu from './modules/menu'
import home from './modules/home'
import singer from './modules/singer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    user,
    menu,
    home,
    singer
  }
})