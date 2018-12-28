<template>
  <div class="launchTree-page">
    <div class="treeItem-wrap">
      <tree-item :treeData="treeData" @checkedList="doChange" :originalTreeData="treeData" ref="treeItem"></tree-item>
    </div>
    <!-- <ul v-for="(item, itemIndex) in treeData" :key="itemIndex">
      <tree-item :treeData="item"></tree-item>
    </ul> -->
    <div class="arrow-wrap">
      <span class="arrow" @click="moveData()"></span>
      <span class="arrow arrow-down" @click="returnData()"></span>
    </div>
    <div class="treeItem-wrap">
      <tree-item :treeData="checkedTreeData" :originalTreeData="checkedTreeData"></tree-item>
    </div>
    <!-- <div>选中的id为{{checkedTreeData}}</div> -->
  </div>
</template>

<script type="text/javascript">
import Global from '../libs/global'
import treeItem from '../components/treeItemTest'

  export default {
    data () {
      return {
        global: Global.data,
        treeData: [
          {
            id: '0',
            name: 'root',
            state: false,
            show: true,
            isShowChild: true,
            isFolder: true,
            children: [
              {
                id: '1',
                pid: '0',
                name: 'one',
                state: false,
                show: true,
                isShowChild: true,
                isFolder: true,
                children: [
                  {
                    id: '1-1',
                    pid: '1',
                    name: 'one-one',
                    state: false,
                    show: true,
                    isShowChild: true,
                    isFolder: true,
                    children: [
                      {
                        id: '1-1-1',
                        pid: '1-1',
                        name: 'one-one-one',
                        state: false,
                        show: true,
                        isShowChild: true,
                        isFolder: true,
                        children: [
                          {
                            id: '1-1-1-1',
                            pid: '1-1-1',
                            name: 'one-one-one-one',
                            state: false,
                            show: true,
                            isFolder: false
                          }
                        ]
                      }
                    ]
                  },
                  {
                    id: '1-2',
                    pid: '1',
                    name: 'one-two',
                    state: false,
                    show: true,
                    isFolder: false
                  }
                ]
              },
              {
                id: '2',
                pid: '0',
                name: 'two',
                state: false,
                show: true,
                isFolder: false
              }
            ]
          }
        ],
        copyTreeData: [
        ],
        checkedTreeData: []
      }
    },
    components: {
      treeItem
    },
    mounted () {
      let that = this
      that.setLoadingHide()
      // that.$on('checkedList', that.doChange)
    },
    watch: {

    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      // 通过传递过来的数据显示
      doChange (e) {
        console.log('e--------', e)
        this.checkedTreeData = e
      },
      moveData () {
        this.$refs.treeItem.doGetCheckedValue()
      },
      returnData () {
        this.$refs.treeItem.doRecoverOriginData()
      }
    }
  }
</script>
<style lang="scss">
@import "../sass/mixin.scss";
.launchTree-page {
  .treeItem-wrap {
    border: 1px solid #ccc;
    min-height: px2rem(200px);
  }
  .arrow-wrap {
    .arrow {
      display: inline-block;
      width: px2rem(80px);
      height: px2rem(80px);
      @include img('/static/images/xiangxiajiantou.png')
    }
    .arrow-down {
      transform: rotateZ(180deg);
    }
  }
}
</style>