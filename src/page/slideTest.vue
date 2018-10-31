<template>
  <div class="slideTest-page">
    <swiper class="club" :options="swiperOption">
      <swiper-slide v-for="(club, index) in clubList" :key="index">
        <router-link class="clubImg" :style="{ backgroundImage : 'url('+ club +')' }" tag="div" to="/cssFilter"></router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
  import util from '../libs/util.js'
  import Global from '../libs/global'
  import {Swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    name: 'slideTest',
    data () {
      return {
        global: Global.data,
        swiperOption: {
          // direction: 'vertical',
          autoplay: true,
          loop: true,
          observeParents: true,
          on: {
            slideChangeTransitionEnd: function(event){
              console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
              console.log(this.isEnd);
              console.log(this.activeLoopIndex )
            },
            touchMove: function(event){
              //你的事件
              // console.log(222222)
            }
          }
        },
        clubList: [
          'http://sdcm168.stonebean.com:8489/s/group00/M00/0D/77/oIYBAFrMZEKAYQhOACL6iUIbvs8269.png?st=gvAaq2P0nMS5gmEEPuR-_Q&e=1543030034',
          'http://sdcm170.stonebean.com:8489/s/group00/M00/04/02/oYYBAFeXQ-WAW9FsAACYzzrQjj4522.jpg?st=N3YO7J-tNFD5Zy-lMk9R6Q&e=1539744191',
          'http://sdcm170.stonebean.com:8489/s/group00/M00/0D/17/oYYBAFrMZCWAPBUNAACYMOPMmNI77.jpeg?st=9-uTzQ9hsqoJPcWbxtmxwQ&e=1543030034'
        ]
      }
    },
    /* components: {
      'swiper': swiper,
      'swiper-slide': swiperSlide,
    }, */
    mounted () {
      let that = this
      that.setLoadingHide()
      var mySwiper = new Swiper('.swiper-container', {
        /* onTouchEnd: function (swiper) {
          // var activeIndex = swiper.activeIndex
          console.log(swiper)
        }, */
      })
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      }
    }
  }
</script>
<style lang="sass">
@import "../sass/page/slideTest.scss"
</style>
