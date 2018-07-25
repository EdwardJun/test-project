<template>
  <div>
    <div>11111</div>
    <div class="club-item-wrap">
      <swiper class="club-techs" v-if="techs.length>0 && swiperOption" :options="swiperOption">
        <swiper-slide v-for="(tech, index) in techs" :key="index">
          <div :techId="tech.id" :style="{ backgroundImage : 'url('+(tech.avatarUrl || global.defaultHeader )+')' }"></div>
          <div>{{ tech.name }}</div>
          <div v-show="tech.serialNo">{{ tech.serialNo }}</div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  export default {
    name: 'Club',
    components: {
      'swiper': swiper,
      'swiper-slide': swiperSlide,
    },
    data () {
      return {
        "techs": [
          {
          "id": "718364010470182912",
          "name": "Ana",
          "phoneNum": "13265684474",
          "avatar": "151764",
          "clubId": "770559669897797632",
          "star": 100,
          "serialNo": "0011",
          "topOrders": 5,
          "visitCount": null,
          "commentCount": null,
          "goodCommentCount": null,
          "orderCount": null,
          "avatarUrl": "http://192.168.1.103:8489/s/group00/M00/00/56/oIYBAFdrQfCAVK0kAAAxorXUBys689.png?st=OprMvDoYvMTwJFkpTNTUAA&e=1531986653"
        },
        {
          "id": "718350725641408512",
          "name": "阿达",
          "phoneNum": "13265684472",
          "avatar": "152288",
          "clubId": "770559669897797632",
          "star": 100,
          "serialNo": "0010",
          "topOrders": 0,
          "visitCount": null,
          "commentCount": null,
          "goodCommentCount": null,
          "orderCount": null,
          "avatarUrl": "http://192.168.1.105:8489/s/group00/M00/00/5C/oIYBAFd8tzuAbRLbAACTV319jBs645.png?st=lyz40QhRN4USZNKlrO74oQ&e=1531988942"
        },
        {
          "id": "718329531785547776",
          "name": "Ruth",
          "phoneNum": "13265684470",
          "avatar": "151803",
          "clubId": "770559669897797632",
          "star": 0,
          "serialNo": "1007",
          "topOrders": 0,
          "visitCount": null,
          "commentCount": null,
          "goodCommentCount": null,
          "orderCount": null,
          "avatarUrl": "http://192.168.1.105:8489/s/group00/M00/00/57/oIYBAFdrQ46AMQDRAAADiJSXSVc063.png?st=U_OktofuA_QPwDFn8kGA0g&e=1531986670"
        },
        {
          "id": "718363425415106560",
          "name": "Anna测",
          "phoneNum": "13265684473",
          "avatar": "154924",
          "clubId": "770559669897797632",
          "star": 0,
          "serialNo": "84473",
          "topOrders": 0,
          "visitCount": null,
          "commentCount": null,
          "goodCommentCount": null,
          "orderCount": null,
          "avatarUrl": "http://192.168.1.105:8489/s/group00/M00/00/75/oIYBAFgXFuuAUhyZAAAYc2rwCno393.png?st=b7FJCbjZ8V8sT66ZdO-EUQ&e=1531986671"
        }],
      }
    },
    computed: {
      swiperOption () {
        let that = this
        return {
          loop: that.techs.length > 3,
          observeParents: true,
          slidesPerView: 'auto',
        }
      }
    }
  }
</script>
<style lang="sass">
  @import "../sass/mixin.scss";
  @import "../sass/components/club.scss";
</style>
