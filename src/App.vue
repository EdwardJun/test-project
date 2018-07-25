<template>
  <div id="app">
    <img src="./assets/8.png">
    <router-view/>
    <Spinner v-show="global.loading"></Spinner>
  </div>
</template>

<script>
import Global from './libs/global'
import Spinner from './components/spinner'
export default {
  data () {
    return {
      global: Global.data
    }
  },
  components: {
    Spinner
  },
  created () {
    let g = Global
    window.addEventListener('resize', () => {
      g.resizeWin()
    })
    g.resizeWin()
  }
}
</script>

<style lang="sass">
  @import './sass/reset.scss'
  @import './sass/mixin.scss'
  @import './sass/index.scss';
</style>
