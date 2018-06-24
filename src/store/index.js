import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

// const debug = process.env.NOD_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
