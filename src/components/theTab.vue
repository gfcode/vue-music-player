<template>
  <div id="tab">
    <ul class="tab__body">
      <li class="item" :class="tabItemStyle" v-for="data in tabData" :key="data.name" @click="gotoUrl(data.url)">
        {{data.name}}
      </li>
    </ul>
    <div class="tab__decorate" :class="tabLineStyle">
      <div class="line"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabData: [
        {
          name: '推荐',
          url: '/recommend'
        },
        {
          name: '排行',
          url: '/rank'
        },
        {
          name: '我的',
          url: '/user'
        }
      ],
      tabItemStyle: 'tabItemStyle',
      tabLineStyle: 'tabLineStyle0'
    }
  },
  methods: {
    gotoUrl (url) {
      switch (url) {
        case '/recommend':
          this.tabLineStyle = 'tabLineStyle0'
          break
        case '/rank':
          this.tabLineStyle = 'tabLineStyle1'
          break
        case '/user':
          this.tabLineStyle = 'tabLineStyle2'
          break
      }
      this.$router.push({ path: url })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
#tab {
  background-color: $color-theme-red;
  height: 38px;
  .tab__body {
    display: flex;
    .item {
      flex: 1;
      height: 28px;
      line-height: 36px;
      color: $color-text-bright;
      font-weight: 500;
      text-align: center;
    }
  }
  .tab__decorate {
    display: flex;
    justify-content: center;
    width: 33.333%;
    height: 3px;
    transition: all 0.375s;
    .line {
      flex: 0 1 auto;
      width: 28px;
      height: 3px;
      border-radius: 5px;
      background: $color-bg-bright;
    }
    &.tabLineStyle0 {
      transform: translate3d(0, 0, 0);
    }
    &.tabLineStyle1 {
      transform: translate3d(100%, 0, 0);
    }
    &.tabLineStyle2 {
      transform: translate3d(200%, 0, 0);
    }
  }
}
</style>
