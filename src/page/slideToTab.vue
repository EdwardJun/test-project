<template>
  <div class="slideToTab-page">
    <div class="tab-wrap" ref="tabWrap">
      <div class="tab-item" :class="{active: tabItemActiveIndex === itemIndex}" v-for="(item, itemIndex) in tabItemList" :key="itemIndex" @click="switchToTab(itemIndex)">{{item}}</div>
    </div>
    <div class="content-wrap" :style="{height: contentHeight + 'px'}" ref="contentWrap">
      <div class="content">
        <router-link to="/cssPosition" tag="div" class="title">单项次卡</router-link>
        <div class="item">
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
          <div>111111111111111111111</div>
        </div>
      </div>
      <div class="content">
        <div class="title">超值套餐</div>
        <div class="item">
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
          <div>222222222222222222222</div>
        </div>
      </div>
      <div class="content">
        <div class="title">积分礼品</div>
        <div class="item">
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
          <div>333333333333333333333</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Global from '../libs/global'

  export default {
    data () {
      return {
        global: Global.data,
        contentHeight: '',
        tabItemList: ['单项次卡', '超值套餐', '积分礼品'],
        tabItemActiveIndex: 0,
        contentOffsetTopList: [], // 每个content元素的 offsetTop 的值
        isScrollOver: true // 是否滚动结束
      }
    },
    mounted () {
      let that = this
      that.setLoadingHide()
    },
    created () {
      let that = this
      that.$nextTick(() => {
        console.log(that.$refs.tabWrap.clientHeight)
        console.log('global.winHeight', that.global.winHeight)
        let tabWrapHeight = that.$refs.tabWrap.clientHeight
        that.contentHeight = that.global.winHeight - tabWrapHeight // 设置滚动元素的可视高度

        // 存储 content元素的offsetTop 值
        let listCon = document.querySelectorAll('.content')
        listCon.forEach((con, index) => {
          console.log(con.offsetTop)
          that.contentOffsetTopList[index] = con.offsetTop
        })
        console.log(that.contentOffsetTopList)
      })
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      switchToTab (index) {
        let that = this
        let destPos = 0
        if (index === that.tabItemActiveIndex) {
          return false
        }
        that.tabItemActiveIndex = index
        console.log(index)
        let curTabOffsetTop = that.contentOffsetTopList[index] // 当前tab内容的 offsetTop
        let el = that.$refs.contentWrap
        let firstOffsetTop = that.contentOffsetTopList[0] // 第一个tab内容的 offsetTop
        console.log('curTabOffsetTop', curTabOffsetTop, el.scrollHeight, firstOffsetTop, el.offsetHeight)
        /* 
          curTabOffsetTop - firstOffsetTop 为 curTab 内容到 firstTab 内容区的距离
          el.scrollHeight - （curTabOffsetTop - firstOffsetTop） 为剩下内容的高度
          用剩下内容的高度与 el.offsetHeight元素可视区域 作比较
        */
        if (el.scrollHeight - (curTabOffsetTop - firstOffsetTop) > el.offsetHeight) { // 如果大于
          destPos = curTabOffsetTop - firstOffsetTop
        } else {
          destPos = el.scrollHeight - el.offsetHeight
        }
        // el.scrollTop = destPos
        if (that.isScrollOver) {
          that.isScrollOver = false
          that.scrollToTab(destPos)
        } else {
          that.isScrollOver = true
          setTimeout(() => {
            that.isScrollOver = false
            that.scrollToTab(destPos)
          }, 30)
        }
        

        /* let timer = ''
        timer = requestAnimationFrame(function fn() {
          let el = that.$refs.contentWrap
          let acceleration = 0.1
          let stime = 10
          let y2 = el.scrollTop || 0
          let deltY = destPos - y2
          let speeding = 1 + acceleration
          if (Math.abs(deltY) > 0) {
            console.log('ddddddddd')
            speeding = deltY / speeding
            el.scrollTop = y2 + (deltY - (speeding > 0 ? Math.floor(speeding) : Math.ceil(speeding)))
            timer = requestAnimationFrame(fn);
          } else {
            cancelAnimationFrame(timer)
          }
        }) */
      },
      scrollToTab (y, acceleration, stime) {
        let that = this
        let el = that.$refs.contentWrap
        acceleration = acceleration || 0.1
        stime = stime || 10
        let y2 = el.scrollTop || 0
        let deltY = y - y2
        let speeding = 1 + acceleration

        // console.log("目标位置：", y, "当前位置：", y2, "滚动位置：", y2 + (deltY - Math.floor(deltY / speeding)))
        // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
        speeding = deltY / speeding
        el.scrollTop = y2 + (deltY - (speeding > 0 ? Math.floor(speeding) : Math.ceil(speeding)))

        if (Math.abs(deltY) > 0 && !that.isScrollOver) {
          setTimeout(function () {
            that.scrollToTab(y)
          }, stime)
        }
      }
      // scrollToTab (y, acceleration, stime) {
      //   let that = this
      //   let el = that.$refs.contentWrap
      //   acceleration = acceleration || 0.1
      //   stime = stime || 10
      //   let y2 = el.scrollTop || 0
      //   let deltY = y - y2
      //   let speeding = 1 + acceleration

      //   // console.log("目标位置：", y, "当前位置：", y2, "滚动位置：", y2 + (deltY - Math.floor(deltY / speeding)))
      //   // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
      //   speeding = deltY / speeding
      //   el.scrollTop = y2 + (deltY - (speeding > 0 ? Math.floor(speeding) : Math.ceil(speeding)))

      //   if (Math.abs(deltY) > 0) {
      //     /* setTimeout(function () {
      //       that.scrollToTab(y)
      //     }, stime) */
      //     window.requestAnimationFrame(that.scrollToTab(y))
      //   }
      // }
    }
  }
</script>
<style lang="scss">
@import "../sass/mixin.scss";
.slideToTab-page {
  width: 100%;
  height: 100%;
  background: #eeeeee;
  overflow-y: hidden;
  .tab-wrap {
    display: flex;
    width: 100%;
    height: px2rem(60px);
    margin-bottom: px2rem(12px);
    background: #fff;
    .tab-item {
      flex: 1;
      &.active {
        color: #f66;
      }
    }
  }
  .content-wrap {
    overflow-y: auto;
    overflow-x: hidden;
    &> div + div {
      margin-top: px2rem(12px);
    }
    .content {
      // margin-top: px2rem(12px);
      background: #fff;
      .title {
        color: #f66;
      }
    }
  }
}
</style>