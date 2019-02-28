import Vue from 'vue'
import idb from './idb.js'
const wx = require('weixin-js-sdk')
const win = window

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
    console.log('data.winWidth', data.winWidth)
    console.log('that.baseWidth', that.baseWidth)
    that.winScale = data.winWidth / that.baseWidth
    htmlEl.style.fontSize = that.winScale * 16 + 'px'
    // htmlEl.style.fontSize = document.documentElement.clientWidth / 100 + 'px';
  },
  initIDB () {
    idb.openDB('15818976943', 't', () => {
      console.log('创建完数据库------')
    })
  }
}