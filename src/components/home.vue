<template>
  <div class="Home-page">
    <!-- <div class="test-sticky-div">
      <div class="item" v-for="(stickyItem, stickyIndex) in stickyList" :key="stickyIndex">
        <p :class="isActive==stickyIndex?'fixed':'relative'" ref="stickyP">{{stickyItem.titleName}}</p>
        <ul ref="textUl">
          <li v-for="(textItem, textIndex) in stickyItem.liText" :key="textIndex">{{textItem}}</li>
        </ul>
      </div>
    </div> -->
    <div ref="wrapper" id="home">
      <div class="test-sticky-div">
        <div class="item" v-for="(stickyItem, stickyIndex) in stickyList" :key="stickyIndex">
          <p :class="isActive==stickyIndex?'fixed':'relative'" ref="stickyP">{{stickyItem.titleName}}</p>
          <ul ref="textUl">
            <li v-for="(textItem, textIndex) in stickyItem.liText" :key="textIndex">{{textItem}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  import BScroll from 'better-scroll'
  export default {
    name: 'home',
    data () {
      return {
        global: Global.data,
        stickyList: [
          {
            titleName: 'A',
            liText: [
              'aaaaaa',
              'aaaaaa',
              'aaaaaa',
              'aaaaaa',
              'aaaaaa',
              'aaaaaa',
              'aaaaaa',
              'aaaaaa',
            ]
          },
          {
            titleName: 'B',
            liText: [
              'bbbbbb',
              'bbbbbb',
              'bbbbbb',
              'bbbbbb',
              'bbbbbb',
              'bbbbbb',
              'bbbbbb',
              'bbbbbb',
            ]
          },
          {
            titleName: 'C',
            liText: [
              'cccccc',
              'cccccc',
              'cccccc',
              'cccccc',
              'cccccc',
              'cccccc',
              'cccccc',
              'cccccc',
            ]
          },
          {
            titleName: 'D',
            liText: [
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
              'dddddd',
            ]
          }
        ],
        isAbsolute: false,
        isActive: 0
      }
    },
    mounted () {
      let that = this
      that.setLoadingHide()
      that.BScroll()
      // that.miniRefresh()
      /* this.$nextTick(() => {
        let wrapper = this.$refs.wrapper
        if (wrapper) {
          console.log(wrapper)
          this.scroll = new BScroll(wrapper, {
            // pullDownRefresh: { threshold: 40, stop: 5 },
            scrollY: true
          })
        }
      }) */
      that.ListenTestStickyScroll()
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      /**
       * top 值会被循环替换，只需要判断最新一次符合条件的就可以
       * 把符合条件的 index 进行赋值 that.isActive
       */
      ListenTestStickyScroll () {
        let that = this
        /* window.addEventListener('scroll', () => {
          let list = that.$refs.textUl
          list.map((item, index) => {
            let top = item.getBoundingClientRect().top //item顶部与可是窗口顶部的距离 -- 这是获取 ul 元素顶部到窗口顶部的距离
            let pHeight = that.$refs.stickyP[0].clientHeight // 标题的高度
            if (top <= pHeight) {
              that.isActive = index
            }
          })
        }) */
        document.querySelector('.Home-page').addEventListener('scroll', () => {
          console.log(111)
          let list = that.$refs.textUl
          list.map((item, index) => {
            let top = item.getBoundingClientRect().top //item顶部与可是窗口顶部的距离 -- 这是获取 ul 元素顶部到窗口顶部的距离
            let pHeight = that.$refs.stickyP[0].clientHeight // 标题的高度
            if (top <= pHeight) {
              that.isActive = index
            }
          })
        })
      },
      /* miniRefresh () {
        var miniRefresh = new MiniRefresh({
          container: '#minirefresh',
          isScrollBar: false,
          down: {
            callback: function() {
              // 下拉事件
              setTimeout(() => {
                miniRefresh.endDownLoading();
              }, 500)
            }
          },
          up: {
            callback: function() {
              // 上拉事件

              // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
              setTimeout(() => {
                miniRefresh.endUpLoading(true);
              }, 500)
            }
          }
        });
      } */
      BScroll () {
        let that = this
        that.$nextTick(() => {
          let wrapper = that.$refs.wrapper
          if (wrapper) {
            that.scroll = new BScroll(wrapper, {
              scrollY: true
            })
          }
          /* this.scroll.on('beforeScrollStart', (pos) => {
            console.log(11111111122)
          }) */
        })
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/home.scss"
</style>
