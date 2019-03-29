<template>
  <div class="debounce-page">
    <input type="text" class="inputTest" id="debounce" v-model="textValue" @input="doEnter">
    <canvas id="myCanvas" width="400" height="200"></canvas>
    <div class="img-wrap" ref="imgWrap" @scroll="doScroll">
      <!-- <div><a href="http://note.youdao.com/yws/res/6879/WEBRESOURCE70ab961814dbc86c099e273192bbff13" download="1111">下载文件链接</a></div>
      <div class="txt"><a :href="item" download="1111">下载</a></div> -->
      <div @click="doDownload">下载</div>
      <div @click="doDownload2">下载2</div>
      <div @click="doDownload3">下载3</div>
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
import FileSaver from 'file-saver'
import JsZip from 'jszip'

  export default {
    data () {
      return {
        global: Global.data,
        count: 0,
        textValue: '',
        item: ImgUrl,
        dataItem: [
          {
            num: 1000,
            imgData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANYAAADKCAIAAABWlSmZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzQwMTI0NzA0NjIxMTFFOUIzNTFFRDExMUFBNjk0Q0EiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzQwMTI0NkY0NjIxMTFFOUIzNTFFRDExMUFBNjk0Q0EiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRUI1MEI2QjYxNEMxMUU3OThFRDhBREU4MURGMTU3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRUI1MEI2QzYxNEMxMUU3OThFRDhBREU4MURGMTU3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtaknOoAABdOSURBVHja7F0LtqQ2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'
          },
          {
            num: 2000,
            imgData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANYAAADKCAIAAABWlSmZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzQwMTI0NzA0NjIxMTFFOUIzNTFFRDExMUFBNjk0Q0EiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzQwMTI0NkY0NjIxMTFFOUIzNTFFRDExMUFBNjk0Q0EiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRUI1MEI2QjYxNEMxMUU3OThFRDhBREU4MURGMTU3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRUI1MEI2QzYxNEMxMUU3OThFRDhBREU4MURGMTU3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtaknOoAABdOSURBVHja7F0LtqQ2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'
          }
        ]
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
      debounce (fun, delay) {
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
      throttle (fn, gapTime) {
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
      },
      doDownload () {
        // let blob = new Blob(["欢迎访问 hangge.com"], {type: "text/plain;charset=utf-8"});
        let blob = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANYAAADKCAIAAABWlSmZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzQwMTI0NzA0NjIxMTFFOUIzNTFFRDExMUFBNjk0Q0EiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzQwMTI0NkY0NjIxMTFFOUIzNTFFRDExMUFBNjk0Q0EiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFRUI1MEI2QjYxNEMxMUU3OThFRDhBREU4MURGMTU3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFRUI1MEI2QzYxNEMxMUU3OThFRDhBREU4MURGMTU3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtaknOoAABdOSURBVHja7F0LtqQ2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'
        FileSaver.saveAs(blob, '文件导出测试.png')
      },
      doDownload2 () {
        let that = this
        that.$nextTick(() => {
          let canvas = document.getElementById("myCanvas")
          console.log('canvas', canvas)
          let context = canvas.getContext("2d");
          console.log('context', context)
          context.fillStyle = "blue"; //填充颜色
          context.fillRect(50,50,200,100); ////绘制实心矩形
          canvas.toBlob(function(blob) {
              saveAs(blob, "hangge.png");
          });
        })
      },
      doDownload3 () {
        let that = this
        let zip = new JsZip()
        that.dataItem.map((item, index) => {
          // 向zip文件中添加图片，可以添加多个文件或者图片，此处以图片为例
          // base64图片需要去掉base64图片标识
          zip.file(item.num + '号图片.png', item.imgData.substring(item.imgData.indexOf(",") + 1), {
            base64: true
          })
        })
        zip.generateAsync({
          type: 'blob',
          compression: "DEFLATE", // STORE：默认不压缩 DEFLATE：需要压缩
          compressionOptions: {
            level: 9  // 压缩等级1~9    1压缩速度最快，9最优压缩方式   [使用一张图片测试之后1和9压缩的力度不大，相差100字节左右]
          }
        }).then((blob) => {
          // 压缩的结果为blob类型（二进制流）,可用作文件上传
          // 直接在浏览器打成.zip 包并下载
          console.log('blob', blob)
          FileSaver.saveAs(blob, '技师工牌.zip')
        })
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