<template>
  <div class="tree-wrap">
    <!-- <ul>
      <li>
        <div>
          <button type="button">+</button>
          <span>{{treeData.name}}</span>
        </div>
        <tree-item  v-for="(item, itemIndex) in treeData.children" :key="itemIndex" v-if="treeData.children.length > 0" :treeData="item"></tree-item>
      </li>
    </ul> -->
    <div class="tree-con">
      <div v-for="(treeItem, treeItemIndex) in treeData" :key="treeItemIndex">
        <div class="tree-line" v-show="treeItem.show">
          <span class="toggleButton" v-if="treeItem.children" @click.stop="doToggle">{{(treeItem.children) && treeItem.isShowChild && !openShow ? '+' : '-'}}</span>
          <span class="space" v-else></span>
          <label>
            <input type="checkbox" name="" class="check" ref="check" :value="treeItem.id" :id="treeItem.id" :pid="treeItem.pid" v-model="treeItem.state" @click="doCheck($event, treeItem)" />
            <span class="img-folder" v-if="treeItem.children"></span>
            <span class="img-file" v-else></span>
            {{treeItem.name}}
          </label>
        </div>
        <tree-item v-show="openShow" v-if="treeItem.children" :treeData="treeItem.children" :originalTreeData="originalTreeData"></tree-item>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
  // 树组件
  export default {
    name: 'treeItem',
    props:{
      treeData: {}, // 点击同层级的数据 treeData
      originalTreeData: {} // 完整实时数据 treeData
    },
    data () {
      return {
        openShow: false,
        eventObj: '', // 当前点击的对象
        checkedTreeData: [], // 选中的值
        isShowChild: false,
        returnIdsList: [] // 点击返回箭头存储的id 值
      }
    },
    computed: {
    },
    created () {
    },
    filters: {
    },
    watch: {
      /* 'originalTreeData': {
        handler (newVal, oldVal) {
          console.log('originalTreeData------old', oldVal)
          console.log('originalTreeData------new', newVal)
        },
        deep: true
      } */
    },
    methods: {
      /**
       * 用来控制是否显示子元素
       */
      doToggle () {
        let that = this
        that.openShow = !that.openShow
      },
      // 点击了多选框
      /**
       * 点击多选框操作
       * @param event 当前 doc 对象
       * @param item 当前数据对象
       */
      async doCheck (event, item) {
        let that = this
        that.eventObj = event
        await that.doCheckedChild(event)
        await that.doCheckParent(event)
      },
      /**
       * 获取选中的值 --- 针对于 originalTreeData 数据
       * 逻辑：1. 循环当前所有实时数据，把其中没有选中的数据删除
       * 向下循环
       */
      doGetCheckedValue () {
        let that = this
        let selectTreeData = JSON.parse(JSON.stringify(that.originalTreeData))
        // 向下循环
        for (let i = 0; i < selectTreeData.length; i++) {
          if (!selectTreeData[i].state) {
            selectTreeData.splice(i, 1)
          }
          if (selectTreeData.length > 0 && selectTreeData[i].children) {
            that.recursionCheckedValue(selectTreeData[i].children)
          }
        }

        // 将选中的数据改变状态为未选中 --- 向下循环
        for (let i = 0; i < selectTreeData.length; i++) {
          if (selectTreeData[i].state) {
            selectTreeData[i].state = false
          }
          if (selectTreeData[i].children) {
            that.recursionCancelChildCheck(selectTreeData[i].children)
          }
        }
        // 将逻辑删除移动后的文件
        that.removeChildFile(that.originalTreeData)

        // 将移动后的数据恢复显示 --- 向下循环
        for (let i = 0; i < selectTreeData.length; i++) {
          if (selectTreeData[i].isFolder && !selectTreeData[i].isShowChild) {
            selectTreeData[i].isShowChild = true
          }
          if (!selectTreeData[i].show) {
            selectTreeData[i].show = true
          }
          if (selectTreeData[i].children) {
            that.recursionRecoverShow(selectTreeData[i].children)
          }
        }
        that.checkedTreeData = selectTreeData
        that.$emit('checkedList', that.checkedTreeData)
      },
      /**
       * 递归循环所有数据，将没有选中的数据删除掉 --- 向下循环
       * 这是处理移动过去的数据 checkedTreeData
       */
      recursionCheckedValue (selectTreeData) {
        let that = this
        for (let i = 0; i < selectTreeData.length; i++) {
          if (!selectTreeData[i].state) {
            selectTreeData.splice(i, 1)
          }
          // 有种情况为第二条数据已经删除了，但循环下标还是为 2，所以要判断为 2 下标的数据还是否存在
          if (selectTreeData[i] && selectTreeData[i].children) {
            that.recursionCheckedValue(selectTreeData[i].children)
          }
        }
      },
      /**
       * 递归循环数据，将选中的数据改为未选中 --- 向下循环
       * 这是处理移动过去的数据 checkedTreeData
       */
      recursionCancelChildCheck (obj) {
        let that = this
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].state) {
            obj[i].state = false
          }
          if (obj[i].children) {
            that.recursionCancelChildCheck(obj[i].children)
          }
        }
      },
      /**
       * 递归循环恢复显示 ---向下循环
       * 只针对于移动过去的数据 checkedTreeData
       */
      recursionRecoverShow (obj) {
        let that = this
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].isFolder && !obj[i].isShowChild) {
            obj[i].isShowChild = true
          }
          if (!obj[i].show) {
            obj[i].show = true
          }
          if (obj[i].children) {
            that.recursionRecoverShow(obj[i].children)
          }
        }
      },
      /**
       * 点击返回箭头
       * 逻辑：1. 将选中的数据的id 存储起来 --- 向下循环
       *      2. 逻辑删除选中的文件 --- 向下循环
       *      3. 将存储选中的id 数组与原始数据对比，如果包含并且这个对象为不显示的 则将其显示出来 --- 向下循环
       *     3.1 将存储选中的id 数组与原始数据对比，如果这个对象是一个文件夹并且不显示下级元素 则将其按钮改为显示按钮
       */
      doRecoverOriginData () {
        let that = this
        that.returnIdsList = []
        for (let i = 0; i < that.checkedTreeData.length; i++) {
          if (that.checkedTreeData[i].state) {
            that.returnIdsList.push(that.checkedTreeData[i].id)
          }
          if (that.checkedTreeData[i].children) {
            that.recursionChooseIds(that.checkedTreeData[i].children)
          }
        }

        that.removeChildFile(that.checkedTreeData)

        for (let i = 0; i < that.originalTreeData.length; i++) {
          if (that.returnIdsList.includes(that.originalTreeData[i].id) && !that.originalTreeData[i].show) {
            that.originalTreeData[i].show = true
          }
          if (that.returnIdsList.includes(that.originalTreeData[i].id) && that.originalTreeData[i].isFolder && !that.originalTreeData[i].isShowChild) {
            that.originalTreeData[i].isShowChild = true
          }
          if (that.originalTreeData[i].children) {
            that.doAccordingIdRecoverShow(that.originalTreeData[i].children)
          }
        }
      },
      /**
       * 递归存储已勾选的id --- 向下循环
       * 针对于返回的数据
       */
      recursionChooseIds (obj) {
        let that = this
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].state) {
            that.returnIdsList.push(obj[i].id)
          }
          if (obj[i].children) {
            that.recursionChooseIds(obj[i].children)
          }
        }
      },
      /**
       * 根据id 把隐藏的元素显示 --- 针对于原始数据 originalTreeData
       */
      doAccordingIdRecoverShow (obj) {
        let that = this
        for (let i = 0; i < obj.length; i++) {
          if (that.returnIdsList.includes(obj[i].id) && !obj[i].show) {
            obj[i].show = true
          }
          if (that.returnIdsList.includes(obj[i].id) && obj[i].isFolder && !obj[i].isShowChild) {
            obj[i].isShowChild = true
          }
          if (obj[i].children) {
            that.doAccordingIdRecoverShow(obj[i].children)
          }
        }
      },
      /**
       * @param obj 需要删除的子元素数据
       * 递归逻辑删除选中的子元素文件
       */
      removeChildFile (obj) {
        let that = this
        for (let i = 0; i < obj.length; i++) {
          // 当前对象状态为选中，且是一个文件
          if (obj[i].state && !obj[i].isFolder) {
            obj[i].show = false
          }
          if (obj[i].children) {
            that.recursionRemoveChildFile(obj[i])
          }
        }
      },
      /**
       * 递归删除文件
       * 因为这个方法需要改变 父对象的 isShowChild 属性
       * @param obj 是一个父元素对象
       */
      recursionRemoveChildFile (obj) {
        let that = this
        for (let i = 0; i < obj.children.length; i++) {
          let count = 0
          if (obj.children[i].state && !obj.children[i].isFolder) {
            count = count + 1
            obj.children[i].show = false
          }
          if (obj.children[i].children) {
            that.recursionRemoveChildFile(obj.children[i])
          }
          if (count == obj.children.length) {
            obj.isShowChild = false
          }
        }
      },
      /**
       * 当点击了多选框时判断该文件夹下是否有子文件，有则跟其状态一致
       */
      doCheckedChild (obj) {
        return new Promise((resolve, reject) => {
          let that = this
          obj = obj.currentTarget
          let objState = obj.checked
          let objId = obj.id
          let isChild = obj.parentElement.parentElement.nextElementSibling // 判断是否有子元素
          if (isChild) {
            for (let i = 0; i < that.treeData.length; i++) { // 第一次循环
              if (that.treeData[i].children) { // 改变数据
                let child = that.treeData[i].children
                that.recursionForChild(child, objState)
              }
            }
          }
          resolve()
        })
      },
      /**
       * 递归寻找子元素改变选中状态
       * 循环回调，该方法适用于解析多层数据
       * @param obj 递归的对象
       * @param objState 选中的状态
       */
      recursionForChild (obj, objState) { // 符合条件多次循环
        let that = this
        for (let i = 0; i < obj.length; i++) {
          obj[i].state = objState
          if (obj[i].children) {
            that.recursionForChild(obj[i].children, objState)
          }
        }
      },
      /**
       * 改变父元素的状态
       * 两种规则：
       *   1-1. 当我点击取消元素时，查看同级子元素是否有选中状态，如果有则不改变父元素状态，如果没有则取消父元素状态，继续往上一级判断。
       *   1-2. 查看父级是否是选中状态，如果不是则停止，如果是则取消，然后重复执行 1-1操作
       *   2. 选中父元素，当点击选中子元素时，该父元素直到最外层父元素也会选中
       * @param obj 点击元素
       */
      doCheckParent (obj) {
        let that = this
        let state = obj.currentTarget.checked
        let childPid = obj.currentTarget.getAttribute('pid')
        that.recursionChangelParent(that.originalTreeData, childPid, state)
      },
      /**
       * 递归改变父节点选中状态
       * @param obj 循环的对象
       * @param childPic 子元素的父 id
       * @param state 子元素的选中状态 true 为选中状态  false 为未选中状态
       */
      recursionChangelParent (obj, childPid, state) {
        let that = this
        for (let i = 0; i < obj.length; i++) {
          if (obj[i].id !== childPid && obj[i].children) { // 循环一直找到点击元素的父节点
            that.recursionChangelParent(obj[i].children, childPid, state)
          } else if (obj[i].id === childPid && obj[i].children) {
            if (state) {
              if (!obj[i].state) {
                obj[i].state = true
              }
              that.recursionChangelParent(that.originalTreeData, obj[i].pid, state)
            } else {
              let flag = false
              for (let j = 0; j < obj[i].children.length; j++) {
                if (obj[i].children[j].id === that.eventObj.currentTarget.getAttribute('id')) { // 因为当点击时获取treeData 数据里的state 是不准确的，是点击之前的状态，所以当判断点击元素的选中状态应该使用元素本身属性 checked
                  if (that.eventObj.currentTarget.checked == true) {
                    flag = true
                  }
                } else if (obj[i].children[j].state === true) {
                  flag = true
                }
              }
              if (!flag && obj[i].state) { // 当点击元素的同级节点都没有选中 && 其父元素状态为选中则将其父元素的选中状态改为 false,然后在继续往上级判断
                obj[i].state = false
                that.recursionChangelParent(that.originalTreeData, obj[i].pid, state)
              }
            }
          }
        }
      }
    }
  }

</script>
<style lang="scss">
@import "../sass/mixin.scss";
.tree-wrap {
  // padding: px2rem(10px) 0 0 0;
  .tree-con {
    padding-left: px2rem(50px);
    text-align: left;
    .tree-line {
      display: flex;
      align-items: center;
    }
    .toggleButton {
      display: inline-block;
      margin-right: px2rem(15px);
      text-align: center;
      width: px2rem(35px);
      height: px2rem(35px);
      line-height: px2rem(35px);
      border: 1px solid #ccc;
      color: #ccc;
      border-radius: px2rem(3px);
      vertical-align: middle;
    }
    .space {
      display: inline-block;
      margin-right: px2rem(15px);
      width: px2rem(35px);
      height: px2rem(35px);
    }
    .img-folder {
      display: inline-block;
      margin-left: px2rem(10px);
      width: px2rem(40px);
      height: px2rem(40px);
      vertical-align: middle;
      @include img('/static/images/wenjianjia.png')
    }
    .img-file {
      display: inline-block;
      margin-left: px2rem(10px);
      width: px2rem(40px);
      height: px2rem(40px);
      vertical-align: middle;
      @include img('/static/images/wenjian.png')
    }
  }
}
</style>