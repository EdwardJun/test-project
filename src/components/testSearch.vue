<template>
  <div class="testSearch-page">
    <div>testSearch</div>
    <router-link :to="{path: '/home'}">返回Home</router-link>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  export default {
    name: 'testSearch',
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
      }
    }
  }
</script>
<style lang="sass">

</style>
