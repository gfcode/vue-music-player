<template>
  <div id="search">
    <div class="search__opt">
    </div>
    <div class="search__body">
      <i class="iconfont icon-search"></i>
      <input class="body__input" type="text" placeholder="搜索音乐、歌手...">
    </div>
    <div class="search__opt">
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
#search {
  display: flex;
  width: 100%;
  height: 45px;
  justify-content: space-between;
  align-items: center;
  background-color: $color-theme-red;
  .search__opt {
    width: 35px;
    height: 30px;
  }
  .search__body {
    position: relative;
    display: flex;
    flex: 1;
    margin: 0 10px;
    .iconfont {
      z-index: 5;
      position: absolute;
      left: 10px;
      top: 7px;
    }
    .body__input {
      flex: 1;
      padding: 0 0 0 35px;
      height: 30px;
      border-radius: 20px;
      font-size: $font-size-m-s;
      outline: none;
    }
  }
}
</style>
