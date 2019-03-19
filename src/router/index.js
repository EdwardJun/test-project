import Vue from 'vue'
import Router from 'vue-router'
import Global from '../libs/global'
import Vuex from 'vuex'
import store from '../store/index' // 直接引入的方式
// import Club from '@/components/Club'

Vue.use(Router)
Vue.use(Vuex)
let _global = Global.data
/* export default new Router({
  routes: [
    {path: '/', redirect: 'test'},
    {
      path: '/test',
      name: 'Test',
      component (resolve) {
        require(['../components/test.vue'], resolve)
      },
      children: [
        {
          path: '/test/child',
          name: 'testChild',
          component (resolve) {
            require(['../components/testChild.vue'], resolve)
          },
        },
        {
          path: '/test/search',
          name: 'testSearch',
          component (resolve) {
            require(['../components/testSearch.vue'], resolve)
          },
        }
      ]
    },
    {
      path: '/club',
      name: 'Club',
      // component: Club
      component (resolve) {
        require(['../components/Club.vue'], resolve)
      }
    },
    {
      path: '/home',
      name: 'home',
      component (resolve) {
        require(['../components/home.vue'], resolve)
      }
    }
  ]
}) */

let pageRouterOption = [
  {path: '/', redirect: 'test'},
  {
    path: '/test',
    name: 'Test',
    meta: {title: '测试'},
    component (resolve) {
      require(['../components/test.vue'], resolve)
    },
    children: [
      {
        path: '/test/child',
        name: 'testChild',
        meta: {title: '测试子页面'},
        component (resolve) {
          require(['../page/testChild.vue'], resolve)
        },
      },
      {
        path: '/test/search',
        name: 'testSearch',
        meta: {title: '测试子搜索页面'},
        component (resolve) {
          require(['../page/testSearch.vue'], resolve)
        },
      }
    ]
  },
  {
    path: '/club',
    name: 'Club',
    // component: Club
    meta: {title: 'club'},
    component (resolve) {
      require(['../components/Club.vue'], resolve)
    }
  },
  {
    path: '/home',
    name: 'home',
    meta: {title: 'home'},
    component (resolve) {
      require(['../page/home.vue'], resolve)
    }
  },
  {
    path: '/inputTest',
    name: 'inputTest',
    meta: {title: 'inputTest'},
    component (resolve) {
      require(['../page/inputTest.vue'], resolve)
    }
  },
  {
    path: '/callBack',
    name: 'callBack',
    meta: {title: 'callBack'},
    component (resolve) {
      require(['../page/callBack.vue'], resolve)
    }
  },
  {
    path: '/slideTest',
    name: 'slideTest',
    meta: {title: 'slideTest'},
    component (resolve) {
      require(['../page/slideTest.vue'], resolve)
    }
  },
  {
    path: '/cssFilter',
    name: 'cssFilter',
    meta: {title: 'cssFilter'},
    component (resolve) {
      require(['../page/cssFilter.vue'], resolve)
    }
  },
  {
    path: '/vant',
    name: 'vant',
    meta: {title: 'vant'},
    component (resolve) {
      require(['../page/vant.vue'], resolve)
    }
  },
  {
    path: '/cssLayout',
    name: 'cssLayout',
    meta: {title: 'cssLayout'},
    component (resolve) {
      require(['../page/cssLayout.vue'], resolve)
    }
  },
  {
    path: '/slotOne',
    name: 'slotOne',
    meta: {title: 'slotOne'},
    component (resolve) {
      require(['../page/slotOne.vue'], resolve)
    }
  },
  {
    path: '/launchTree',
    name: 'launchTree',
    meta: {title: 'launchTree'},
    component (resolve) {
      require(['../page/launch_tree.vue'], resolve)
    }
  },
  {
    path: '/indexDB',
    name: 'indexDB',
    meta: {title: 'indexDB'},
    component (resolve) {
      require(['../page/indexDB.vue'], resolve)
    }
  },
  {
    path: '/slideToTab',
    name: 'slideToTab',
    meta: {title: 'slideToTab'},
    component (resolve) {
      require(['../page/slideToTab.vue'], resolve)
    }
  },
  {
    path: '/cssPosition',
    name: 'cssPosition',
    meta: {title: 'cssPosition'},
    component (resolve) {
      require(['../page/cssPosition.vue'], resolve)
    }
  },
  {
    path: '/debounce',
    name: 'debounce',
    meta: {title: 'debounce'},
    component (resolve) {
      require(['../page/debounce.vue'], resolve)
    }
  }
]

let router = new Router({
  routes: pageRouterOption
})

router.beforeEach((to, from, next) => {
  _global.loading = true
  if(to.meta.title) {
    document.title = to.meta.title
  }
  /**
   * 有两种方式可以改变 currPage.name 的值
   * a. 直接调用 currPage.name 更改
   *      store.state.currPage.name = 'aaa'
   * b. 调用vuex的commit函数，官网更推荐这种方式。
   */
  /* store.commit('setCurrPageName', to.name)
  store.commit('setCurrPageQuery', to.query)
  store.commit('setLastPageName', from.name)
  store.commit('setLastPageQuery', from.query) */
  store.commit('setCurrPageObj', to)
  store.commit('setLastPageObj', from)
  return next()
})

export default router






