import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.stringify(window.localStorage.getItem('user') || 'null')
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      window.localStorage.setItem('user', payload)
    },
    removeUser (state, payload) {
      state.user = 'null'
      window.localStorage.setItem('user', '')
    }
  },
  actions: {
  },
  modules: {
  }
})
