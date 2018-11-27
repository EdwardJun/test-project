<template>
  <div class="cssLayout-page">
    <div id="wrap">
      <div class="main" :data-id="123">
        main <br />
        main <br />
        main <br />
        main <br />
        main <br />
        main <br />
        main <br />
        main <br />
        main <br />
        {{10000 | moneyFormatFilter}}
      </div>
      <slotTest>
        <template slot-scope="props">
          <div class="tmpl">
            <span v-for="(item, itemIndex) in props.data" :key="itemIndex">{{item}}</span>
          </div>
        </template>
      </slotTest>
      <slotTest>
        <template slot-scope="props">
          <ul>
            <li v-for="(item, itemIndex) in props.data" :key="itemIndex">{{item}}</li>
          </ul>
        </template>
      </slotTest>
      <button @click="callBackTest()">改变pushState</button>
    </div>
    <div id="footer">footer</div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import util from '../libs/util.js'
  import Global from '../libs/global'
  import SlotTest from '../components/slotTest.vue'
  
  export default {
    name: 'cssLayout',
    data () {
      return {
        global: Global.data
      }
    },
    components: {
      SlotTest
    },
    created () {
      let obj2 = this.getPageParams()
      console.log(obj2['name'])
      let b = this.test1('123')
      console.log(b)
    },
    mounted () {
      let that = this
      that.setLoadingHide()
      // console.log(document.querySelector('.main').getAttribute('data-id'))
      // that.getInnerWidthOrHeight()
      // that.getQueryStringArgs()
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      // 以下方法是获取页面视口的大小
      getInnerWidthOrHeight () {
        // 适用于移动端
        console.log('window.innerWidth', window.innerWidth)
        console.log('window.innerHeight', window.innerHeight)
        //  IE6 中，这些属性必须在标准模式下才有效
        console.log('document.documentElement.clientWidth', document.documentElement.clientWidth)
        console.log('document.documentElement.clientHeight', document.documentElement.clientHeight)
        // IE 中混杂模式有效
        console.log('document.body.clientWidth', document.body.clientWidth)
        console.log('document.body.clientHeight', document.body.clientHeight)
      },
      // 获取页面传入的参数
      getQueryStringArgs (param) {
        let that = this
        let args = {}
        let hash = location.hash
        if (hash.indexOf('?') == -1) {
          return false
        }
        let index = hash.indexOf('?')
        let qs = hash.substring(index + 1)
        let items = qs.split('&')
        items.map((item, index) => {
          let itemList = item.split('=')
          args[itemList[0]] = itemList[1]
        })
        console.log(args)
        return args
      },
      /* getRequest () {
        let url = location.search; //获取url中"?"符后的字串 
        console.log(location.hash)
        let theRequest = new Object(); 
        if (url.indexOf("?") != -1) { 
          let str = url.substr(1); 
          strs = str.split("&"); 
          for(var i = 0; i < strs.length; i ++) { 
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
          } 
        } 
        console.log(theRequest)
        return theRequest; 
      } */
      /* getQueryStringArgs (param) {
        let that = this
        let args = {}
        // let search = '?name=vant&obj=button'
        let search = location.search
        console.log(search)
        let qs = search.substring(1)
        let items = qs.split('&')
        items.map((item, index) => {
          let itemList = item.split('=')
          args[decodeURIComponent(itemList[0])] = decodeURIComponent(itemList[1])
        })
        console.log(args[param])
        return args[param]
      } */
      // 获取页面参数，传入参数名返回对应的值，否则返回全部参数
      getPageParams (name) {
          /* eslint-disable */
          let reg = new RegExp('(^|&)?([\da-zA-Z_]+)=([^&\\?#\/\\\\]*)(\\?|#|\/|\\\\|&|$)', 'ig')
          let loc = location
          let strs = [loc.search.substring(1), loc.hash.substring(1)]
          let results = {}
          let tmpExec = ''
          let _tmp
          strs.forEach(function (s) {
              tmpExec = reg.exec(s)
              while (tmpExec) {
                  _tmp = tmpExec[3]
                  results[tmpExec[2]] = _tmp
                  tmpExec = reg.exec(s)
              }
          })
          return name ? (results[name] || '') : results
      },
      callBackTest () {
        let str = location.href.split('?')[1]
        if (str.indexOf('&callback') > 0) {
          str = str.substring(0, str.indexOf('&callback'))
        }
        history.replaceState(null, null, `/#/cssLayout?${str}`)
      },
      test1 (str) {
        console.log(11111111)
        // let a = 'haha'
        if (str == 'sand') {
          return 'haha'
        }
        console.log(22222)
      }
    }
  }
</script>
<style lang="sass">
@import "../sass/page/cssLayout.scss"
</style>
