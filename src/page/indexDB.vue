<template>
  <div class="indexDB-page">
    <div v-for="(session, sessionIndex) in sessionList" :key="sessionIndex">{{session.name}} -- {{session.age}}</div>
    <button @click="addData()">增加数据</button>
    <button @click="updateDataByName()">修改数据1</button>
    <button @click="updateDataById()">修改数据2</button>
    <button @click="deleteDataById()">删除数据1</button>
    <button @click="deleteDataByName()">删除数据2</button>
    <button @click="deleteIndexDB()">删除数据库</button>
    <div>
      <!-- <textarea type="text" class="chatInput"/> -->
      <div class="chatInput" contenteditable="true"></div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Global from '../libs/global'
import idb from '../libs/idb.js'

  export default {
    data () {
      return {
        global: Global.data,
        sessionList: [
          {
            id: '1001',
            name: '小北哥哥',
            age: 30
          },
          {
            id: '1002',
            name: '黑寡妇',
            age: 33
          },
          {
            id: '1003',
            name: '白寡妇',
            age: 28
          },
          {
            id: '1004',
            name: '白寡妇',
            age: 50
          }
        ]
      }
    },
    mounted () {
      let that = this
      that.setLoadingHide()
      // if (idb) idb.saveSession(that.sessionList) // 增加方法
    },
    methods: {
      setLoadingHide () {
        let that = this
        setTimeout(() => {
          that.global.loading = false
        },500)
      },
      addData () {
        let that = this
        if (idb) idb.saveSession(that.sessionList) // 增加方法
      },
      updateDataByName () {
        let that = this
        idb.updateSessionByName('白寡妇', 28)
      },
      updateDataById () {
        let that = this
        idb.updateSessionById('1001', 11)
      },
      deleteDataById () {
        let that = this
        idb.deleteDataById('1001')
      },
      deleteDataByName () {
        let that = this
        idb.deleteDataByName('白寡妇')
      },
      deleteIndexDB () {
        let that = this
        idb.deleteIndexDB()
      }
    }
  }
</script>
<style lang="scss">
@import "../sass/mixin.scss";
.indexDB-page {
  .chatInput {
    width: px2rem(500px);
    min-height: px2rem(50px);
    line-height: px2rem(50px);
    border: 1px solid #ccc;
    outline: 0;
    font-size: 12px;
    text-align: left;
    /* width: 400px;  
    min-height: 20px;  
    max-height: 300px;  
    _height: 120px;  
    margin-left: auto;  
    margin-right: auto;  
    padding: 3px;  
    outline: 0;  
    border: 1px solid #a0b3d6;  
    font-size: 12px;  
    line-height: 24px;  
    padding: 2px;  
    word-wrap: break-word;  
    overflow-x: hidden;  
    overflow-y: auto;  
    border-color: rgba(82, 168, 236, 0.8);  
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6); */
  }
}
</style>