<template>
  <div class="regex-page">
    <div class="hover">hover</div>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  // import eventHub from '../libs/hub.js'
  export default {
    name: 'regex',
    data () {
      return {
        global: Global.data,
        console: true
      }
    },
    created () {
      this.$root.eventHub.$on('do-console', this.doConsole)
    },
    mounted () {
      let that = this
      that.setLoadingHide()
    },
    computed: {
      testRegex () {
        return 
      }
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      test (x) {
      },
      doConsole (param) {
        this.console = false
        console.log(`------${this.console}-----${param}-----`)
      }
    },
    beforeDestroy () {
      this.$root.eventHub.$off('do-console', this.doConsole)
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/regex.scss"
</style>
