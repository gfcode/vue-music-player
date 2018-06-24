<template>
  <div id="app">
    <the-search-bar />
    <the-tab />
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player />
  </div>
</template>

<script>
import TheTab from './components/theTab'
import TheSearchBar from './components/theSearchBar'
import Player from './components/player'
export default {
  components: {
    TheTab,
    TheSearchBar,
    Player
  },
  data () {
    return {}
  },
  mounted () { },
  methods: {},
  watch: {}
}
</script>
<style lang="scss">
@import 'assets/scss/index.scss';
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
