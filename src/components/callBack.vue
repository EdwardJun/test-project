<template>
  <div class="callBack-page">
    <button @click="doClick()">回调</button>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  import inputComponent from './inputComponent.vue'
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
      }
    }
  }
</script>
<style lang="sass">
</style>
