<template>
  <div class="l_tree_container">
    <tree-item-com :model="treeData"></tree-item-com>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
  // 树组件
  Vue.component('tree-item-com',{
    template:`
    <ul class="l_tree">
      <li class="l_tree_branch" v-for="item in model">
        <div class="l_tree_click">
          <button type="button" class="l_tree_children_btn" v-if="item.children"  @click="toggle(item)">{{ !item.show ? '-' : '+' }}</button>
          <span class="l_folder">{{ item.name }}</span>
        </div>
        <tree-item-com v-show="!item.show" v-if="item.children" :model="item.children"></tree-item-com>
      </li>
    </ul>`,
    props:{
      model:{}
    },
    methods:{
      /* toggle:function(item){
        var idx = this.model.indexOf(item)
        Vue.set(this.model[idx], 'show', !item.show)
      } */
    }
  });
  export default {
    name: 'treeItem',
    props:{
      treeData: {}
    },
    data () {
      return {}
    },
    created () {
      console.log(this.treeData)
    }
  }

</script>
<style lang="scss">
</style>