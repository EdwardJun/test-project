<template>
  <div class="vant-page">
    <van-button type="primary" @click="doShowPopBottom()">主要按钮</van-button>
    <van-button type="primary" @click="toCssLayout()">去布局页</van-button>
    <van-notice-bar text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。" left-icon="" />
    <van-popup v-model="isPopUpShow" position="right" :overlay="true" :close-on-click-overlay="true">内容</van-popup>
    <van-tabs v-model="tabActive" :swipeable="true" sticky>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
      </van-tab>
      <van-tab title="标签 4">
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
      </van-tab>
      <van-tab title="标签 5">
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
        <p>-------------</p>
      </van-tab>
    </van-tabs>
    <van-button @touchstart.native.stop="keyboardShow = true">弹出默认键盘</van-button>
    <van-button @touchstart.native.stop="keyboardShow2 = true">自定义默认键盘</van-button>
    <van-number-keyboard :show="keyboardShow" extra-key="." close-button-text="完成" @blur="keyboardShow = false" @input="onInput" @delete="onDelete" />
    <van-number-keyboard :show="keyboardShow2" theme="custom" extra-key="." close-button-text="完成" @blur="keyboardShow2 = false" @input="onInput" @delete="onDelete" />
    <van-password-input :value="passwordValue" info="密码为 6 位数字" @focus="keyboardShow = true" :length="setPasswordLength" />
    <van-uploader :after-read="onRead">
      <van-icon name="photograph" />
    </van-uploader>
    <van-datetime-picker v-model="currentDate" type="date" />
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  import { Button, NoticeBar, Popup, Tab, Tabs, NumberKeyboard, Toast, PasswordInput, Uploader, Icon, DatetimePicker, ImagePreview } from 'vant'
  import Vue from 'vue'
  Vue.use(Button)
  Vue.use(NoticeBar)
  Vue.use(Popup)
  Vue.use(Tab)
  Vue.use(Tabs)
  Vue.use(NumberKeyboard)
  Vue.use(Toast)
  Vue.use(PasswordInput)
  Vue.use(Uploader)
  Vue.use(Icon)
  Vue.use(DatetimePicker)
  Vue.use(ImagePreview)

  export default {
    name: 'vant',
    data () {
      return {
        global: Global.data,
        isPopUpShow: false,
        tabActive: 0,
        keyboardShow: false,
        keyboardShow2: false,
        passwordValue: '123',
        setPasswordLength: 6,
        minHour: 10,
        maxHour: 20,
        minDate: new Date(),
        maxDate: new Date(2019, 10, 1),
        currentDate: new Date()
      }
    },
    created () {
      /* ImagePreview({
        images: [
          'http://sdcm168.stonebean.com:8489/s/group00/M00/0D/77/oIYBAFrMZEKAYQhOACL6iUIbvs8269.png?st=gvAaq2P0nMS5gmEEPuR-_Q&e=1543030034',
          'https://img.yzcdn.cn/2.jpg'
        ],
        startPosition: 0,
        onClose() {
          // do something
        }
      }); */
      this.imagePriviewInit()
    },
    mounted () {
      let that = this
      that.setLoadingHide()
      // that.sortTest()
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      doShowPopBottom () {
        this.isPopUpShow = true
      },
      sortTest () {
        let that = this
        // let list = [1, 10, 55, 0, -1]
        // list.sort(that.sortNumFun(1))
        let list = [
          {
            id: 5,
            name: '五'
          },
          {
            id: 0,
            name: '零'
          },
          {
            id: 10,
            name: '拾'
          },
          {
            id: -7,
            name: '负柒'
          },
          {
            id: 20,
            name: '贰拾'
          }
        ]
        list.sort(that.sortBy('id', -1))
        console.log(list)
      },
      /**
       * 数组排序
       * @param attr 对象排序的字段，没有则传空
       * @param rev  数组排序方式 1为升序 -1为降序,默认为升序
       */
      sortBy (attr, rev = 1) {
        let that = this
        return function (a, b) {
          if (attr) {
            a = a[attr]
            b = b[attr]
          }
          if (a < b) {
            return rev * -1
          } else if (a > b) {
            return rev * 1
          } else {
            return 0
          }
        }
      },
      onInput(key) {
        // Toast(key);
        this.passwordValue = (this.passwordValue + key).slice(0, 6);
        console.log(this.passwordValue)
      },
      onDelete() {
        // Toast('delete');
        this.passwordValue = this.passwordValue.slice(0, this.passwordValue.length - 1);
        console.log(this.passwordValue)
      },
      onRead(file) {
        console.log(file)
      },
      imagePriviewInit () {
        const imageInstance = ImagePreview({
          images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_enax4p2VNm5nInh26864ZRFJU0ZQ2HRIOetXLBd6XuDAAJm3g',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmubfELEWL2KHv9uKjPVdm5p7FmMim1RqaX5DQHx5c6SS4XkirUQ'
          ],
          startPosition: 0,
          onClose() {
            // do something
          }
        });
        return imageInstance
      },
      toCssLayout () {
        let that = this
        let prefixPathname = location.href.split('#')[0]
        // that.$router.push({name: 'cssLayout', query: {name: 'vant', obj: 'button'}})
        console.log(location)
        console.log(prefixPathname + '#/' + 'cssLayout' + '?name=vant&obj=button&callback=callBackTest')
        location.href = prefixPathname + '#/' + 'cssLayout' + '?name=vant&obj=button&callback=callBackTest()'
      }
    }
  }
</script>
<style lang="sass">
@import "../sass/page/vant.scss"
</style>
