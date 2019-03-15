<template>
  <div class="cssPosition-page">
    <div class="top">top</div>
    <!-- <div class="top1">
      <ul>
        <li>1111111</li>
        <li>2222222</li>
        <li>3333333</li>
      </ul>
    </div> -->
    <div class="content">
      <ul>
        <li>--------start---------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>----------------------</li>
        <li>-------- end111-------</li>
        <li>-------  end222-------</li>
      </ul>
    </div>
    <div class="bottom">bottom</div>
  </div>
</template>

<script type="text/javascript">
import Global from '../libs/global'

  export default {
    data () {
      return {
        global: Global.data,
      }
    },
    mounted () {
      let that = this
      that.setLoadingHide()
    },
    created () {
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
<style lang="scss">
@import "../sass/mixin.scss";
.cssPosition-page {
  width: 100%;
  height: 100%;
  background: #eeeeee;
  display: flex;
  flex-direction: column;
  .top {
    width: 100%;
    height: px2rem(70px);
    line-height: px2rem(70px);
    background-color: rgb(147, 177, 104);
  }
  .bottom {
    width: 100%;
    height: px2rem(70px);
    line-height: px2rem(70px);
    background-color: rgb(147, 177, 104);
  }
  .content {
    overflow-y: auto;
  }
}
</style>