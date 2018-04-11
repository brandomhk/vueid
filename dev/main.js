import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vd from './vueid_db'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.darken4,
    secondary: colors.red.lighten4,
    accent: colors.indigo.base // #3F51B5
  }
})

new Vue({
  el: '#app',
  vd,
  store,
  router,
  render: h => h(App)
})