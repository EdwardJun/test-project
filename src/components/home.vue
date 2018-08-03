<template>
  <div class="Home-page">
    <div class="test-sticky-div">
      <div class="item" v-for="(stickyItem, stickyIndex) in stickyList" :key="stickyIndex">
        <p :class="isActive==stickyIndex?'fixed':'relative'" ref="stickyP">{{stickyItem.titleName}}</p>
        <ul ref="textUl">
          <li v-for="(textItem, textIndex) in stickyItem.liText" :key="textIndex">{{textItem}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
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
        window.addEventListener('scroll', () => {
          let list = that.$refs.textUl
          list.map((item, index) => {
            let top = item.getBoundingClientRect().top //item顶部与可是窗口顶部的距离 -- 这是获取 ul 元素顶部到窗口顶部的距离
            let pHeight = that.$refs.stickyP[0].clientHeight // 标题的高度
            if (top <= pHeight) {
              that.isActive = index
            }
          })
        })
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/home.scss"
</style>
