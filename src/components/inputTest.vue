<template>
  <div class="Home-page">
    <inputComponent></inputComponent>
    <router-link to="/callBack" tag="button">回调方法页</router-link>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  import inputComponent from './inputComponent.vue'
  export default {
    name: 'inputTest',
    data () {
      return {
        global: Global.data
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
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/inputTest.scss"
</style>
