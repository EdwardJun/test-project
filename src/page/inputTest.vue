<template>
  <div class="Home-page">
    <input-component :maxlength="inputMaxlength" :isSee="inputIsSee" @inputValue="doReceiveValue" @click.native="doInput()"></input-component>
    <router-link to="/callBack" tag="button">回调方法页</router-link>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  import inputComponent from 'vue-password-border'
  /* import inputComponent from '../components/inputComponent.vue' */
  export default {
    name: 'inputTest',
    data () {
      return {
        global: Global.data,
        inputMaxlength: 6,
        inputIsSee: false,
      }
    },
    components: {
      inputComponent
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
      doReceiveValue (value) {
        console.log(value)
      },
      doInput () {
        console.log('111111')
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/inputTest.scss"
</style>
