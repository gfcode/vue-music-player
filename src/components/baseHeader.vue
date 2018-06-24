<template>
  <div id="header">
    <i class="iconfont icon-back" v-if="router" @click="onRouterBack()"></i>
    <i class="iconfont icon-hide" v-else @click="onHidden()"></i>
    <!-- <i class="iconfont icon-back" v-else @click="onHidden()"></i> -->
    <p class="header__title">{{title}}</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    /**
     * 返回是否基于路由
     */
    router: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '标题'
    },
    /**
     * 要该变的状态变量名
     */
    variable: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  created () { },
  methods: {
    ...mapMutations(['SET_STATECTRL']),
    onRouterBack () {
      this.$router.back()
    },
    onHidden () {
      this.SET_STATECTRL(this.variable)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
#header {
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: $color-text-bright;
  .iconfont {
    position: absolute;
    top: 1px;
    left: 4vw;
  }
  .header__title {
    width: 70vw;
    margin: 0 15vw;
    font-size: $font-size-m-x;
    @include one-row-ellipsis;
  }
}
</style>
