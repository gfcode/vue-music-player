<template>
  <div id="rank">
    <scroll class="rank__scroll-wrapper">
      <div class="rank__content">
        <div class="content__item" v-for="item in rankList" :key="item.id">
          <div class="item__cover">
            <img v-lazy=item.coverImgUrl>
          </div>
          <div class="item__summary">
            <ul v-for="(list, idx) in item.tracks" :key="list.id">
              <li v-if="idx < 3" class="summary__item">
                {{`${idx + 1}.${list.name}`}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import Loading from '@/base/loading'
import Scroll from '@/base/scroll'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: {
    Loading,
    Scroll
  },
  data () {
    return {}
  },
  created () {
    for (let idx = 0; idx < 24; idx++) {
      this.GET_RANK(idx)
    }
  },
  methods: {
    ...mapActions(['GET_RANK']),
    ...mapMutations([])
  },
  computed: {
    ...mapGetters(['rankList'])
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
#rank {
  position: fixed;
  z-index: 5;
  top: 83px;
  bottom: 0;
  padding-bottom: 50px;
  width: 100vw;
  .rank__scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .rank__content {
      .content__item {
        display: flex;
        justify-content: space-between;
        padding: 5px 0 0 5px;
        .item__cover {
          flex: none;
          width: 30vw;
          height: 30vw;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .item__summary {
          flex: 1;
          margin-left: 10px;
          padding-top: 10px;
          line-height: 2;
          border-bottom: 1px solid $color-border-gray;
          .summary__item {
            width: 75%;
            @include one-row-ellipsis;
          }
        }
      }
    }
  }
}
</style>
