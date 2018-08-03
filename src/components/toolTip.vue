<template>
  <div class="toolTip-page" :class="{active: this.$store.state.toolTipActive}">
    <div class="toolTipCon" :class="{active: this.$store.state.toolTipTextActive}">{{tipMes}}</div>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  export default {
    data () {
      return {
        global: Global.data
      }
    },
    props: ['tipMes']
  }
</script>
<style lang="sass">
  @import "../sass/components/toolTip.scss"
</style>
