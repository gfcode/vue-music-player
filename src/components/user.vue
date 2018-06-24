<template>
  <div id="user">
    user
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: {},
  data () {
    return {}
  },
  created () { },
  mounted () { },
  methods: {
    ...mapActions([]),
    ...mapMutations([])
  },
  computed: {
    ...mapGetters([])
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
#user {
  position: fixed;
  z-index: 5;
  top: 83px;
  bottom: 0;
  padding-bottom: 50px;
  width: 100vw;
}
</style>
