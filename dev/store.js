import Vuex from 'vuex'
import Vue from 'vue'
import vd from './vueid_db'

Vue.use(Vuex)

let store = new Vuex.Store({
  modules: {
    carro: {
      state: true,
    },
    ...vd.modules
  }
})

export default store