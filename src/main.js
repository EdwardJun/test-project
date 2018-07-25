// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/index'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import AwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

Vue.use(AwesomeSwiper)
Vue.use(VueResource)
Vue.config.productionTip = false

Vue.http.interceptors.push((request, next) => {
  // 设置全局的请求参数
  var requestParam
  if (request.method.toLowerCase() === 'get') {
      requestParam = request.params
      requestParam['_'] = (+new Date()) // 时间戳
  } else {
      requestParam = request.body
  }
  requestParam.sessionType = 'web'
  if (!requestParam.token) {
      requestParam.token = '04ae71896f87b6c5bd4a39c2e3cb18614d1f23bf'
  }
  if (!requestParam.tokenId) {
      requestParam.tokenId = '18bb3bf9-5636-4e40-890d-4afe8565cab8'
  }

  // 回调响应函数之前的处理
  next((response) => {
      if (response.status == 401 || response.body.statusCode == 401) { // 401状态需要重新登录
          if (!_global.userAgent.isWX) {
              Global.login()
          } else {
              Util.tipShow('请求异常！401')
          }
      } else {
          var resBody = response.body
          if (typeof resBody === 'string') {
              try {
                  response.body = resBody = JSON.parse(resBody)
              } catch (e) {}
          }

          if (resBody && resBody.statusCode === 500) {
              console.log('req error：' + response.url)
          }
          return response
      }
  })
})

/* eslint-disable no-new */
/* new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}) */
new Vue({router,store, render: h => h(App)}).$mount('#app')