<template>
  <div class="debounce-page">
    <input type="text" class="inputTest" id="debounce" v-model="textValue" @input="doEnter">
    <div class="img-wrap" ref="imgWrap" @scroll="doScroll">
      <!-- <div><a href="http://note.youdao.com/yws/res/6879/WEBRESOURCE70ab961814dbc86c099e273192bbff13" download="1111">下载文件链接</a></div>
      <div class="txt"><a :href="item" download="1111">下载</a></div> -->
      <img class="pic" src="http://note.youdao.com/yws/res/2123/WEBRESOURCEae7f4e70eb9e26dbb36bfc9f5eedc0a1" alt="">
      <img class="pic" src="http://note.youdao.com/yws/res/2123/WEBRESOURCEae7f4e70eb9e26dbb36bfc9f5eedc0a1" alt="">
      <img class="pic" src="http://note.youdao.com/yws/res/2123/WEBRESOURCEae7f4e70eb9e26dbb36bfc9f5eedc0a1" alt="">
      <img class="pic" src="http://note.youdao.com/yws/res/2123/WEBRESOURCEae7f4e70eb9e26dbb36bfc9f5eedc0a1" alt="">
      <img class="pic" src="http://note.youdao.com/yws/res/2123/WEBRESOURCEae7f4e70eb9e26dbb36bfc9f5eedc0a1" alt="">
      <img class="pic" src="http://note.youdao.com/yws/res/2123/WEBRESOURCEae7f4e70eb9e26dbb36bfc9f5eedc0a1" alt="">
    </div>
  </div>
</template>

<script type="text/javascript">
import Global from '../libs/global'
import ImgUrl from '@/assets/8.png'

  export default {
    data () {
      return {
        global: Global.data,
        count: 0,
        textValue: '',
        item: ImgUrl
      }
    },
    mounted () {
      let that = this
      that.setLoadingHide()
    },
    created () {
      /* this.$nextTick(()=> {
        let inputb = document.getElementById('debounce')
        console.log(inputb)
        let debounceAjax = this.debounce(this.ajax, 500)
        console.log('debounceAjax', debounceAjax)
        inputb.addEventListener('keyup', function (e) {
          debounceAjax(e.target.value)
        })
      }) */
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      doScroll () {
        let that = this
        /* that.throttle(function () {
          let imgWrapScrollHeight = that.$refs.imgWrap.scrollHeight
          let imgWrapScrollTop = that.$refs.imgWrap.scrollTop
          let thresold  = imgWrapScrollHeight - imgWrapScrollTop - that.global.winHeight
          that.count = that.count + 1
          // console.log('imgWrapScrollHeight', imgWrapScrollHeight)
          // console.log('imgWrapScrollTop', imgWrapScrollTop)
          // console.log('winHeight', that.global.winHeight)
          console.log('thresold', thresold)
          if (thresold <= 20) {
            console.log('count', that.count)
            console.log('end------------')
          }
        }) */
        let test = that.throttle(that.doTest, 100)
        test()
      },
      /* throttle (fn, interval = 1000) {
        console.log('throttle---------')
        let canRun = true
        return function () {
          if (!canRun) return
          canRun = false
          setTimeout(() => {
            console.log('ddddddd')
            fn.apply(this, arguments)
            canRun = true
          }, interval)
        }
      }, */
      doTest () {
        let that = this
        let imgWrapScrollHeight = that.$refs.imgWrap.scrollHeight
        let imgWrapScrollTop = that.$refs.imgWrap.scrollTop
        let thresold  = imgWrapScrollHeight - imgWrapScrollTop - that.global.winHeight
        that.count = that.count + 1
        // console.log('imgWrapScrollHeight', imgWrapScrollHeight)
        // console.log('imgWrapScrollTop', imgWrapScrollTop)
        // console.log('winHeight', that.global.winHeight)
        console.log('thresold', thresold)
        if (thresold <= 20) {
          console.log('count', that.count)
          console.log('end------------')
        }
      },
      doEnter () {
        // 函数防抖
        let debounceAjax = this.debounce(this.ajax, 500)
        debounceAjax(this.textValue)

        // 函数节流
        // let throttleAjax = this.throttle(this.ajax, 1000)
        // throttleAjax(this.textValue)
      },
      ajax (content, test) {
        console.log(`ajax request-------${content}----${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
      },
      debounce(fun, delay) {
        return function (args) {
          let that = this
          let _args = args
          clearTimeout(fun.id)
          fun.id = setTimeout(function () {
            fun.call(that, _args)
          }, delay)
        }
      },
      /* throttle(fn, gapTime) {
        let _lastTime = null
        return function () {
          // console.log('arguments', arguments)
          let that = this
          let _args = arguments
          let _nowTime = + new Date()
          // console.log('nowTime', _nowTime)
          // console.log('_lastTime', _lastTime)
          // console.log('minus', _nowTime - _lastTime)
          if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn();
            _lastTime = _nowTime
          }
        }
      } */
      throttle(fn, gapTime) {
        let _lastTime = null
        return function () {
          let that = this
          let _args = arguments
          let _nowTime = + new Date()
          if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(that, arguments);
            _lastTime = _nowTime
          }
        }
      }
    }
  }
</script>
<style lang="scss">
@import "../sass/mixin.scss";
.debounce-page {
  width: 100%;
  height: 100%;
  background: #eeeeee;
  overflow-y: hidden;
  .img-wrap {
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .pic {
      width: 100%;
    }
  }
  .inputTest {
    width: px2rem(500px);
    height: px2rem(50px);
    border: 1px solid #ccc;
  }
}
</style>