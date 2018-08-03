<template>
  <div class="test-page">
    <div>{{time}}</div>
    <router-link :to="{path: '/test/child', query: {num: 1}}">传参1</router-link>
    <div class="dialog-div" @click="doDialogShow()">弹窗</div>
    <div class="dialog-con" :class="{active: isShow}" @click="doClickDialogCon()">
      <div class="nav" @click="doClickNav($event)">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
    </div>
    <div class="count-wrap">
      <div class="count-button" @click="doReduceCount()">-</div>
      <input type="text" v-model="textValue">
      <div class="count-button" @click="doCreateCount()">+</div>
    </div>
    <div>{{test}}</div>
    <div class="control-div"><input type="text" maxlength="6" v-model="controMoney" @input="doControlMoney()"></div>
    <router-view></router-view>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  // import test from '../libs/test.js'
  export default {
    name: 'Test',
    data () {
      return {
        isShow: false,
        global: Global.data,
        // textValue: 0
        // textValue: this.$store.textValue
        controMoney: '',
        stickyList: [
          {
            titleName: 'A',
            liText: [
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
            ]
          },
          {
            titleName: 'C',
            liText: [
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
            ]
          }
        ],
        isAbsolute: false
      }
    },
    created () {
      let that = this
      that.setLoadingHide()
    },
    mounted () {
      let that = this
      // that.setLoadingHide()
      // that.httpTest()
    },
    computed: {
      time () {
        return util.stringToDate('2018-06-25 11:44:23')
      },
      test () {
        let that = this
        that.testPromise().then(res => {
          console.log(res)
        })
        /* that.testPromise() */
      },
      textValue () {
        let that = this
        return that.$store.state.textValue
      },
    },
    methods: {
      doDialogShow() {
        let that = this
        that.isShow = true
      },
      doClickDialogCon() {
        let that = this
        that.isShow = false
      },
      doClickNav(e) {
        e.stopPropagation()
      },
      setLoadingHide() {
        console.log('---修改false')
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      httpTest() {
        let that = this
        that.$http.get('../api/v2/club/popup/get', {params: {clubId: 872011615078195200}}).then(popRes => {
          popRes = popRes.body
          console.log(popRes)
        })
      },
      doCreateCount() {
        let that = this
        that.$store.commit('createCount',1)
      },
      doReduceCount() {
        let that = this
        that.$store.commit('reduceCount',1)
      },
      timeout(ms) {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, ms)
        })
      },
      testPromise () {
        let that = this
        let num = 5
        return new Promise((resolve, reject) => {
          that.timeout(1000).then(() => {
            resolve(num)
          })
        })
        /* new Promise((resolve, reject) => {
          that.timeout(1000).then(() => {
            resolve(num)
          })
        }).then(res => {
          console.log(res)
        }) */
        /* new Promise((resolve, reject) => {
          resolve(1);
          console.log(2);
        }).then(r => {
          console.log(r);
        }); */
      },
      doControlMoney () {
        let that = this
        that.controMoney = util.controlNumber(that.controMoney)
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/test.scss"
</style>
