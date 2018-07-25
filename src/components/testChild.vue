<template>
  <div class="testChild-page">
    <div>传递过来的值为{{this.$route.query.num}}</div>
    <!-- <router-link :to="{path: '/test/search'}" tag="div" class="to-search-div">搜索页</router-link> -->
    <div class="to-search-div" @click="doToSearchPage()">搜索页</div>
    <div>{{this.$store.state.textValue}}</div>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  export default {
    name: 'Test',
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
      doToSearchPage() {
        let that = this
        that.$router.push({path: '/test/search'})
      },
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
  @import "../sass/components/testChild.scss"
</style>
