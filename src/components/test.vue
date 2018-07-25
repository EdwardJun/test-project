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
      }
    },
    mounted () {
      let that = this
      that.setLoadingHide()
      // that.httpTest()
    },
    computed: {
      time () {
        return util.stringToDate('2018-06-25 11:44:23')
      },
      test () {
        let that = this
        let p1 = new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error('fail')), 3000)
        })
        let p2 = new Promise((resolve, reject) => {
          setTimeout(() => resolve(p1), 1000)
        })
        p2.then((result) => {
          console.log(result)
        }).catch((error) => {
          console.log(error)
        })
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
          setTimeout(resolve, ms, 'dome')
        })
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/components/test.scss"
</style>
