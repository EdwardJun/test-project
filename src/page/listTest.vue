<template>
  <div class="listTest-page">
    1111111111
    <button @click="getTestValue">点击获取值</button>
    <div class="box">
      <div class="box-wrap">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Global from '../libs/global'

  export default {
    data () {
      return {
        global: Global.data,
      }
    },
    mounted () {
      let that = this
      that.setLoadingHide()
    },
    created () {
      let that = this
      let arr = that.flatten([1, [2, 3, [4, 5]]])
      // console.log(arr)

      let arr2 = ['1', 2, 3, 4].sort((a, b) => b - a)
      // console.log(arr2)
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      flatten (arr) {
        // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）true / false
        while(arr.some(item=>Array.isArray(item))) {
          // console.log('dddd', arr)
          arr = [].concat(...arr);
        }
        return arr;
      },
      getTestValue () {
        let that = this
        let store = that.$store
        console.log(store.state.testValue)
      }
    }
  }
</script>
<style lang="scss">
@import "../sass/mixin.scss";
.listTest-page {
  width: 100%;
  height: 100%;
  background: #eeeeee;
  overflow-y: hidden;
  .box {
    margin: px2rem(150px) auto;
    width: px2rem(200px);
    height: px2rem(200px);
    perspective: 600px;
    &:hover > .box-wrap{
      transform: rotateY(360deg);
    }
    .box-wrap {
      position: relative;
      width: px2rem(200px);
      height: px2rem(200px);
      transition: 6s;
      transform-style: preserve-3d;
      div {
        position: absolute;
        left: 0;
        top: 0;
        width: px2rem(200px);
        height: px2rem(200px);
        line-height: px2rem(200px);
        text-align: center;
        color: #fff;
        opacity: .4;
        &:nth-of-type(1) {
          background: red;
          transition: 2s;
          transform: rotateY(0deg) translateZ(px2rem(100px));
        }
        &:nth-of-type(2) {
          background: blue;
          transition: 2s;
          transform: rotateY(-90deg) translateZ(px2rem(100px));
        }
        &:nth-of-type(3) {
          background: yellow;
          transition: 2s;
          transform: rotateY(-180deg) translateZ(px2rem(100px));
        }
        &:nth-of-type(4) {
          background: yellowgreen;
          transition: 2s;
          transform: rotateY(-270deg) translateZ(px2rem(100px));
        }
        &:nth-of-type(5) {
          background: green;
          transform: rotateX(-90deg) translateZ(px2rem(100px));
        }
        &:nth-of-type(6) {
          background: pink;
          transform: rotateX(90deg) translateZ(px2rem(100px));
        }
      }
    }
  }
}
</style>