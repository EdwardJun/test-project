<template>
  <div class="slotTest-page">
    <h3>这里是子组件</h3>
    <slot :data="dataName"></slot>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  export default {
    name: 'slotTest',
    data () {
      return {
        global: Global.data,
        dataName: ['一', '贰', '叁','肆', '伍', '陆']
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/slotTest.scss"
</style>
