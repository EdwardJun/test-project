<template>
  <div class="cssFilter-page">
    <div class="img"></div>
    <input type="text" ref="inputTest" class="inputTest" value="hahaha" @mouseover="inputOver" @keyup.enter="keyDownTest()">
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  export default {
    name: 'cssFilter',
    data () {
      return {
        global: Global.data
      }
    },
    mounted () {
      let that = this
      that.setLoadingHide()
      that.stringTest()
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
      }
    }
  }
</script>
<style lang="sass">
@import "../sass/page/cssFilter.scss"
</style>
