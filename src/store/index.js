import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    textValue: 0,
    /* currPage: { // 当前页面的名称、参数
      name: '', query: null
    },
    lastPage: { // 上一次页面的名称、参数
      name: '', query: null
    }, */
    currPageObj: null, // 当前页面对象
    lastPageObj: null, // 上一个页面对象
    toolTipActive: false, // 提示框状态
    toolTipTextActive: false, // 提示文本框的状态
    testValue: ''
  },
  getters: {
    getCurrPageName (state) {
      return state.currPage.name
    }
  },
  mutations: {
    createCount (state, num) {
      state.textValue += num
    },
    reduceCount (state, num) {
      state.textValue -= num
    },
    /* setCurrPageName (state, name) {
      state.currPage.name = name
    },
    setCurrPageQuery (state, query) {
      state.currPage.query = query
    },
    setLastPageName (state, name) {
      state.currPage.name = name
    },
    setLastPageQuery (state, query) {
      state.currPage.query = query
    }, */
    setCurrPageObj (state, obj) {
      state.currPageObj = obj
    },
    setLastPageObj (state, obj) {
      state.currPageObj = obj
    },
    setToolTipStatus (state, status) {
      state.toolTipActive = status
      state.toolTipTextActive = status
      setTimeout(() => {
        state.toolTipActive = false
        state.toolTipTextActive = false
      }, 2000)
    },
    setTestValue (state, value) {
      state.testValue = value
    }
  },
  actions: {

  }
})