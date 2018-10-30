<template>
  <div class="callBack-page">
    <button @click="doClick()">回调</button>
    <div class="border">
      <div class="border-con"></div>
      <div class="line"></div>
    </div>
    <router-link to="/slideTest" tag="button">slideTest</router-link>
    <button @click="doAsync()">async</button>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  export default {
    name: 'callBack',
    data () {
      return {
        global: Global.data
      }
    },
    mounted () {
      let that = this
      that.setLoadingHide()
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      doClick () {
        let that = this
        console.log('我进来了----------')
        let a = '123'
        this.doCallBackTest(a, function(b){
          that.callBackB(b)
        })
      },
      doCallBackTest (param, callBack) {
        let b = 456
        console.log(param)
        console.log('进入回调方法--------')
        // callBack()
        typeof callBack === 'function' && callBack(b)
      },
      callBackB (b) {
        console.log(`回调啦--------${b}`)
      },
      f () {
        return new Promise((resolve,reject) => {
          resolve(1)
        })
      },
      async asyncPrint(value, ms) {
        await this.timeout(ms);
        console.log(value);
      },
      async doAsync () {
        // const value = await this.f()
        console.log(await this.f())
        /* this.f().then((v) => {
          console.log(v)
        }) */
        /* value.then(v => {
          console.log(v)
        }) */
        
        /* this.f().then(a => {
          console.log(a)
        }) */
      }
    }
  }
</script>
<style lang="sass">
@import "../sass/page/callBack.scss"
</style>
