<template>
  <div class="slotOne-page">
    123
    <slotTest1 :buttonNameArray="buttonNameArray">
      <template>
        <p slot="headerSlot">是否确认支付</p>
        <span slot="bottomSlot" class="left">取消</span>
        <span slot="bottomSlot" class="right">确认</span>
      </template>
    </slotTest1>
  </div>
</template>
<script>
  import Global from '../libs/global'
  import SlotTest1 from '../components/slotTest1.vue'

  export default {
    name: 'slotOne',
    data () {
      return {
        global: Global.data,
        buttonNameArray: ['取消', '确认']
      }
    },
    components: {
      SlotTest1
    },
    created () {
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
  @import "../sass/page/slotOne.scss"
</style>
