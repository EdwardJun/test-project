<template>
  <div id="slotTest1-page">
    <div class="confirm-wrap">
      <div class="header">
        <slot name="headerSlot"></slot>
      </div>
      <div class="bottom">
        <!-- <div class="left">左</div>
        <div class="right">右</div> -->
        <!-- <slot>左</slot> -->
        <!-- <slot name="bottomSlot"></slot> -->
        <slot v-for="name in buttonNameArray">{{name}}</slot>
      </div>
    </div>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  export default {
    name: 'slotTest1',
    props: ['buttonNameArray'],
    data () {
      return {
        global: Global.data
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/slotTest1.scss"
</style>
