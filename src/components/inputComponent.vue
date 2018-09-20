<template>
  <div class="inputComponent-page">
    <div class="input-wrap">
      <div class="number-wrap">
        <span class="num" :class="{active: numActiveIndex==numIndex}" v-for="(numItem, numIndex) in numArray" :key="numIndex">
          <i :class="{dot: !numItem.isSee && numItem.num}">{{numItem.isSee?numItem.num: ''}}</i>
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
        isSee: true, // 是否明文显示
        numLength: 0 // 已输入的字符串长度
      }
    },
    mounted () {
      let that = this
      that.setLoadingHide()
      that.$nextTick(() => {
        that.$refs.inputCon.focus()
      })
    },
    watch: {
      inputValue (newValue, oldValue) {
        let that = this
        let timeId = ''
        let newLength = newValue.substring(0,that.maxlength).split('').length
        let oldLength = oldValue.substring(0,that.maxlength).split('').length
        console.log(newLength)
        console.log(oldLength)
        if (newLength > oldLength) {
          for (let i = 0; i < this.numLength - 1; i++) {
            console.log('333333333333----------')
            Vue.set(this.numArray[i], 'isSee', false)
          }
          timeId = setTimeout(() => {
            if (this.numLength - 1 >= 0) {
              console.log('222----------')
              Vue.set(this.numArray[this.numLength - 1], 'isSee', false)
            }
          }, 1000)
        }
        console.log(this.numArray)
        console.log('改变完')
      }
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
        
        that.inputValue = that.inputValue.substring(0,that.maxlength)
        inputArray = that.inputValue.split("")
        that.numLength = inputArray.length
        that.numActiveIndex = that.numLength
        console.log(inputArray)
        /* inputArray.map((item, index) => {
          Vue.set(originInputArray, index, item)
        })
        
        originInputArray.map((item, index) => {
          that.numArray.map((numItem, numIndex) => {
            if (index == numIndex) {
              Vue.set(that.numArray[index], 'num', item)
            }
          })
        })
        console.log(that.numArray) */
        that.numArray.map((numItem, numIndex) => {
          numItem.num = ''
        })
        inputArray.map((item, index) => {
          Vue.set(that.numArray[index], 'num', item)
        })
        console.log('shuchu----------')
        console.log(that.numArray)

        if (that.numLength != that.maxlength) {
          Vue.set(that.numArray[that.numLength], 'isSee', true)
        }
        // console.log(that.numArray)
        // console.log('-----------------------------')
        /* let timeId = setTimeout(() => {
          for (let i = 0; i < that.numLength - 1; i++) {
            Vue.set(that.numArray[i], 'isSee', false)
          }
        }, 1000) */
        // console.log(that.numArray)

        if (that.numLength == 6) {
          that.$store.commit('setToolTipStatus', true)
        }
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/inputComponent.scss"
</style>
