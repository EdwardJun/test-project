import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    textValue: 0
  },
  mutations: {
    createCount (state, num) {
      state.textValue += num
    },
    reduceCount (state, num) {
      state.textValue -= num
    }
  },
  actions: {

  }
})