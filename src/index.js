import Dexie from 'dexie'
import Vue from 'vue'
import {install} from './install'
import modules from './modules'

class Vueid {
  static install
  name_schemas
  vd_init

  get modules () {
    return modules(this.vd, this.vd_init)
  }

  constructor (vd_init) {
    this.vd_init = vd_init
    // create db
    let vd = new Dexie(vd_init.database)

    let schemas = {}

    for (let x in vd_init.schemas) {
        // make schemas
        schemas[x] = vd_init.schemas[x]
    }

    vd.version(vd_init.version).stores(schemas)
    this.vd = vd
    Vue.prototype.$vd = this.vd
  }
}

Vueid.install = install

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vueid)
}

export default Vueid