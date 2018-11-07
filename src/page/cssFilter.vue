<template>
  <div class="cssFilter-page">
    <div class="img"></div>
    <input type="text" ref="inputTest" class="inputTest" value="hahaha" @mouseover="inputOver" @keyup.enter="keyDownTest()">
    <router-link tag="button" :to="{name: 'slideTest'}">跳转slideTest</router-link>
    <button @click="doClickBtn()">点击改变isSave状态</button>
    <div class="test-wrap">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </div>
    <router-link to="/vant" tag="button">跳转vant</router-link>
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
      that.arrayIncludes()
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
      },
      arrayIncludes () {
        let that = this
        /* let numList = [123, 456, 789, 111]
        if (numList.includes(123)) {
          console.log(numList.includes(123))
        } */
        /* let numObj = {
          one: [1, 11, 111],
          two: [2, 22, 222],
          three: [3, 33, 333]
        }
        numObj['one'] = [123, 123]
        console.log(numObj['one']) */
        /* let numMap = new Map()
        numMap.set('one', [111, 111])
        numMap.set('two', [222, 222])
        console.log(numMap.keys())
        for (let map of numMap.keys()) {
          console.log(map)
        } */
      }
    }
  }
</script>
<style lang="sass">
@import "../sass/page/cssFilter.scss"
</style>
