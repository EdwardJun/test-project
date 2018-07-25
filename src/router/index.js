import Vue from 'vue'
import Router from 'vue-router'
import Global from '../libs/global'
// import Club from '@/components/Club'

Vue.use(Router)
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
          require(['../components/testChild.vue'], resolve)
        },
      },
      {
        path: '/test/search',
        name: 'testSearch',
        meta: {title: '测试子搜索页面'},
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
      require(['../components/home.vue'], resolve)
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
  return next()
})

export default router






