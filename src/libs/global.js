import Vue from 'vue'

export default {
  data: {
    winWidth: null,
    winHeight: null,
    loading: false
  },
  resizeWin () {
    console.log('调整像素------------------')
    let that = this
    let data = that.data
    let win = window
    let doc = document
    let htmlEl = doc.documentElement
    if (!that.baseWidth) {
        that.baseWidth = doc.body.clientWidth || 320
    }
    data.winWidth = htmlEl.clientWidth || win.innerWidth || doc.body.clientWidth
    data.winHeight = htmlEl.clientHeight || win.innerHeight
    data.winWidth = data.winWidth > 540 ? 540 : (data.winWidth < 320 ? 320 : data.winWidth)
    that.winScale = data.winWidth / that.baseWidth
    htmlEl.style.fontSize = that.winScale * 16 + 'px'
  }
}