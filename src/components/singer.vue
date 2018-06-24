<template>
  <div>
    singer
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  created () {
    this.getArtist()
  },
  methods: {
    ...mapActions(['getArtist']),
    ...mapMutations([])
  },
  computed: {
    ...mapGetters(['artistList'])
  }
}
</script>
<style lang="scss" scoped>
</style>
