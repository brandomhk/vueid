let Vue

import VueIdb from './index'

export function install (_Vue) {
  _Vue.mixin({
    beforeCreate() {
      const options = this.$options
        if (options.vueid) {
          this.$vd = options.vd
          this.$culo = 10
        } else if (options.parent && options.parent.$storage) {
          this.$storage = options.parent.$storage
        }
    }
  })
  Vue = _Vue
}