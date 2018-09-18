<template>
  <div class="inputComponent-page">
    <div class="input-wrap">
      <div class="number-wrap">
        <span class="num" :class="{active: numActiveIndex==numIndex}" v-for="(numItem, numIndex) in numArray" :key="numIndex">
          <i :class="{dot: !numItem.isSee && numItem.num}">{{numItem.isSee?numItem.num: ''}}</i>
          <!-- <i class="dot"></i> -->
        </span>
      </div>
      <input ref="inputCon" v-model="inputValue" class="input-con" type="number" :maxlength="maxlength" @focus="doInputFocus($event)" @input="doEnterNum($event)">
    </div>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  import Vue from 'vue'
  export default {
    name: 'inputComponent',
    data () {
      return {
        global: Global.data,
        maxlength: 6,
        inputValue: '', // 输入框的内容
        // numArray: ['', '', '', '', '', ''], // 显示的数组
        // numArray: new Array(6),
        numArray: [
          {
            num: '',
            isSee: true
          },
          {
            num: '',
            isSee: true
          },
          {
            num: '',
            isSee: true
          },
          {
            num: '',
            isSee: true
          },
          {
            num: '',
            isSee: true
          },
          {
            num: '',
            isSee: true
          }
        ],
        numActiveIndex: 0, // 聚焦输入框的下标
        modelInputValue: '',
        isSee: true // 是否明文显示
      }
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
      doInputFocus (e) {
        // console.log(e)
      },
      doEnterNum (e) {
        let that = this
        let inputArray = []
        let originInputArray = ['', '', '', '', '', '']
        
        // let originInputArray = new Array(that.maxlength)
        // console.log(originInputArray)
        // console.log(e.target.value)
        // console.log(e.data)
        that.inputValue = that.inputValue.substring(0,that.maxlength)
        // console.log(that.inputValue.split("").length)
        inputArray = that.inputValue.split("")
        let numLength = inputArray.length
        let clearIndex = numLength - 1
        that.numActiveIndex = numLength

        /* if (clearIndex > 0) {
          Vue.set(that.numArray[clearIndex], 'isSee', false)
        } */

        inputArray.map((item, index) => {
          Vue.set(originInputArray, index, item)
        })
        
        originInputArray.map((item, index) => {
          // Vue.set(that.numArray, index, item)
          that.numArray.map((numItem, numIndex) => {
            if (index == numIndex) {
              Vue.set(that.numArray[index], 'num', item)
            }
          })
          
          // Vue.set(that.numArray, 'num', item)
        })
        Vue.set(that.numArray[numLength], 'isSee', true)
        console.log(that.numArray)
        console.log('-----------------------------')
        let timeId = setTimeout(() => {
          for (let i = 0; i < numLength; i++) {
            Vue.set(that.numArray[i], 'isSee', false)
          }
        }, 2000)
        console.log(that.numArray)

        if (numLength == 6) {
          that.$store.commit('setToolTipStatus', true)
        }
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/inputComponent.scss"
</style>
