<template>
  <div class="inputComponent-page">
    <div class="input-wrap">
      <div class="number-wrap">
        <span class="num" :class="{active: numActiveIndex==numIndex}" v-for="(numItem, numIndex) in numArray" :key="numIndex">
          <i :class="{dot: !isSee && numItem}">{{isSee?numItem: ''}}</i>
        </span>
      </div>
      <input ref="inputCon" v-model="inputValue" class="input-con" type="number" :maxlength="maxlength" @input="doEnterNum($event)">
    </div>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  import Vue from 'vue'
  export default {
    name: 'inputComponent',
    props: {
      maxlength: { // 输入框的个数
        type: Number,
        default: 6
      },
      isSee: { // 是否明文显示
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        global: Global.data,
        inputValue: '', // 输入框的内容
        numArray: [], // 显示的数组
        numActiveIndex: 0, // 聚焦输入框的下标
        numLength: 0, // 已输入的字符串长度
      }
    },
    created () {
      let that = this
      that.clearNumArray()
    },
    mounted () {
      let that = this
      that.setLoadingHide()
      that.$nextTick(() => {
        that.$refs.inputCon.focus()
      })
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      doEnterNum (e) {
        let that = this
        let inputArray = []
        that.inputValue = that.inputValue.substring(0,that.maxlength)
        inputArray = that.inputValue.split("")
        that.numLength = inputArray.length
        that.numActiveIndex = that.numLength
        that.clearNumArray()
        inputArray.map((item, index) => {
          Vue.set(that.numArray, index, item)
        })
        if (that.numLength == that.maxlength) {
          that.$emit('inputValue', that.inputValue)
        }
      },
      clearNumArray () {
        let that = this
        for (let i = 0; i < that.maxlength; i++) {
          Vue.set(that.numArray, i, '')
        }
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/inputComponent.scss"
</style>
