import Vue from 'vue'
import Vueid from '../dist'

Vue.use(Vueid)

var vd = new Vueid({
  database: 'users',
  version: 1,
  schemas: {
    users: '++id, name, &email',
  },
  states: {
    users: {
      colection: 'mko',
      carro: '',
      loading: true
    }
  },
  initStates: {
    users: {
      colection: (vd) => {
        return vd.users.toArray()
      },
      carro: () => {
        return 10
      }
    }
  },
  mutations: {
    users: {
      updateColection: (state, vd) => {
        state.loading = true
        vd.users.toArray().then((result) => {
          state.colection = result
          state.loading = false
        })
      }
    }
  },
  getters: {
    users: {
      getColectionUsers: (state) => {
        state.loading = false
        return state.colection
      },
      isLoading: (state) => {
        return state.loading
      }
    }
  }
})

export default vd