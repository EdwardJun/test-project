<template>
  <div class="cssFilter-page">
    <div class="img"></div>
    <input type="text" ref="inputTest" class="inputTest" value="hahaha" @mouseover="inputOver" @keyup.enter="keyDownTest()">
    <router-link tag="button" :to="{name: 'slideTest'}">跳转slideTest</router-link>
    <button @click="doClickBtn()">点击改变isSave状态</button>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  export default {
    name: 'cssFilter',
    data () {
      return {
        global: Global.data,
        isSave: false
      }
    },
    /* beforeRouteLeave (to, from, next) {
      console.log('进来了----------')
      if (this.isSave) {
        next()
      }
    }, */
    mounted () {
      let that = this
      that.setLoadingHide()
      that.stringTest()
      // 用于阻止浏览器后退操作
      /* if (window.history && window.history.pushState) {
        console.log('存在pushState--------')
        window.history.pushState(null, null, document.URL);
        console.log(document.URL)
        window.addEventListener('popstate', function () {
          console.log('addEventListener-----')
          window.history.pushState(null, null, document.URL)
        });
      } */
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      stringTest () {
        let that = this
        let obj = {
          a: 1,
          b: 2,
          c: 3,
          aChild: {
            d: 4
          }
        }
        let {a, b, c, aChild} = obj
        /* console.log(a) // 1
        console.log(b) // 2
        console.log(c) // 3
        console.log(aChild.d) // 4 */
      },
      inputOver (e) {
        console.log(e)
        e.currentTarget.select();
      },
      keyDownTest () {
        alert('我点击了确认键')
      },
      doClickBtn () {
        this.isSave = true
      },
      goBack(){
        // this.$router.replace({path: '/'});
        //replace替换原路由，作用是避免回退死循环
        // window.history.pushState(null, null, document.URL)
      }
    }
  }
</script>
<style lang="sass">
@import "../sass/page/cssFilter.scss"
</style>
