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
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzyI2uhVw7h-Y0swsdEvfNZ9AfhhSGI9CTsjxGQLiF61c7pcuS',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmubfELEWL2KHv9uKjPVdm5p7FmMim1RqaX5DQHx5c6SS4XkirUQ',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_enax4p2VNm5nInh26864ZRFJU0ZQ2HRIOetXLBd6XuDAAJm3g'
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
