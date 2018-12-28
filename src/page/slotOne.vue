<template>
  <div class="slotOne-page">
    123
    <slotTest1 :buttonNameArray="buttonNameArray">
      <template>
        <p slot="headerSlot">是否确认支付</p>
      </template>
    </slotTest1>
    <!-- <treeMenu></treeMenu> -->
    <div>
      <treeMenu :treeData="testdata"></treeMenu>
    </div>
    <router-link to="/launchTree">跳转到treeMenu</router-link>
  </div>
</template>
<script>
  import Global from '../libs/global'
  import SlotTest1 from '../components/slotTest1.vue'
  import treeMenu from '../components/treeMenu.vue'

  export default {
    name: 'slotOne',
    data () {
      return {
        global: Global.data,
        buttonNameArray: ['取消', '确认'],
        testdata:[
          {
            name:"一级菜单",
            children:[
              {
                name:'二级菜单',
                children:[
                  {
                      name:'三级菜单'
                  },
                  {
                      name:'三级菜单'
                  }
                ]
              },
              {
                name:'二级菜单',
                children:[
                  {
                    name:'三级菜单',
                    children:[
                      {
                        name:'四级菜单'
                      },
                      {
                        name:'四级菜单'
                      },
                      {
                        name:'四级菜单'
                      }
                    ]
                  },
                  {
                    name:'三级菜单',
                    children:[
                      {
                        name:'四级菜单',
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    components: {
      SlotTest1, treeMenu
    },
    created () {
    },
    mounted () {
      let that = this
      that.setLoadingHide()
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
  @import "../sass/page/slotOne.scss"
</style>
