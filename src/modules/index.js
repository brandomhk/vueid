// check if is promise
function isPromise (object) {
  return object && Object.prototype.toString.call(object) === "[object Promise]"
}

export default function modules(vd, vd_init) {
  // all modules
  var modules = {}
  var initStates
  var states

  if (vd_init.initStates) {
    initStates = true
  }
  // iter on schemas for make modules
  for (let schema_name in vd_init.schemas) {
    // check states and make state
    if (vd_init.states) {
      // states temp
      let states_temp = vd_init.states[schema_name]

      for (let state in states_temp) {
        // check if the state have a init state
        if (initStates && vd_init.initStates[schema_name][state]) {
          // new value of state
          let changeState = vd_init.initStates[schema_name][state](vd)
          // check if the init state is a promise
          if (isPromise(changeState)) {
            states_temp[state] = 'loading'
            changeState.then((res) => {
              states_temp[state] = res
            })
          } else {
            states_temp[state] = changeState
          }
        }
      }
      states = states_temp
    } else {
      let states = false
    }
    
    const state = states ? states : {}
    const mutations = vd_init.mutations ? vd_init.mutations[schema_name] : {}
    const getters = vd_init.getters ? vd_init.getters[schema_name] : {}
    const actions = vd_init.actions ? vd_init.actions[schema_name] : {}

    // module
    modules[schema_name] = {
      namespaced: true,
      state: state,
      mutations: mutations,
      getters: getters,
      actions: actions
    }
  }

  return  modules
}