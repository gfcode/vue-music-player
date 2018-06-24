<template>
  <div id="recommend">
    <scroll class="scroll-wrapper" :data="recommendPlaylist">
      <div>
        <div v-show="banner.length" class="recommend__decorate">
          <p class="decorate__text">( ゜- ゜)つロ 乾杯~</p>
        </div>
        <slide v-if="banner.length" class="recommend__slide">
          <div v-for="item in banner" :key="item.id">
            <img :src="item.picUrl">
          </div>
        </slide>
        <p class="recommend__title">推荐歌单
          <i class="iconfont icon-front"></i>
        </p>
        <ul class="recommend__list">
          <li class="list__item" v-for="item in recommendPlaylist" :key=item.id @click="viewList(item.id)">
            <div class="item__play-count">
              <i class="iconfont icon-headset"></i>
              <span>{{ Math.floor(item.playCount / 10000) }}万</span>
            </div>
            <img class="item__cover" v-lazy="item.picUrl" alt="">
            <p class="item__des">{{item.name}}</p>
          </li>
        </ul>
        <p class="recommend__title">推荐歌曲
          <i class="iconfont icon-front"></i>
        </p>
        <ul class="recommend__list">
          <li class="list__item" v-for="item in recommendMusic" :key=item.id @click="playMusic(item.song)">
            <img class="item__cover" v-lazy="item.song.album.picUrl" alt="">
            <div class="item__album">
              <p class="album__name">{{item.song.album.name}}</p>
              <p class="album__artist">
                <span v-for="artist in item.song.artists" :key="artist.id">
                  {{artist.name}}
                </span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import Scroll from '@/base/scroll'
import Slide from '@/base/slide'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: {
    Scroll,
    Slide
  },
  data () {
    return {}
  },
  created () {
    this.GET_BANNER()
    this.GET_RECOMMEND_PLAYLIST()
    this.GET_RECOMMEND_MUSIC()
  },
  methods: {
    ...mapActions(['GET_BANNER', 'GET_RECOMMEND_PLAYLIST', 'GET_RECOMMEND_PLAYLIST_DETAIL', 'GET_RECOMMEND_MUSIC']),
    ...mapMutations(['SET_STATECTRL', 'SET_PLAYER_INI', 'SET_PUSH_MUSIC_QUEUE']),
    viewList (id) {
      this.$router.push({ path: `/recommend/${id}` })
      this.GET_RECOMMEND_PLAYLIST_DETAIL(id)
    },
    playMusic (detail) {
      this.SET_PUSH_MUSIC_QUEUE(detail)
    }
  },
  computed: {
    ...mapGetters(['banner', 'recommendPlaylist', 'recommendMusic'])
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
#recommend {
  position: fixed;
  z-index: 5;
  top: 83px;
  bottom: 0;
  padding-bottom: 50px;
  width: 100vw;
  .scroll-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .recommend__decorate {
      position: fixed;
      top: -32vh;
      width: 100vw;
      height: 50vh;
      background: $color-theme-red;
      .decorate__text {
        position: relative;
        top: 28vh;
        color: $color-text-bright;
        text-align: center;
      }
    }
    .recommend__slide {
      width: 96vw;
      margin: 0 auto;
      border-radius: 3px;
      box-shadow: 0 2px 10px #888;
      overflow: hidden;
    }
    .recommend__title {
      margin: 2vh 1vh;
      font-size: $font-size-m;
      font-weight: bold;
    }
    .recommend__list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      .list__item {
        position: relative;
        width: 32vw;
        .item__play-count {
          @include icon__play-count;
        }
        .item__cover {
          width: 100%;
          border-radius: 2px;
        }
        .item__des {
          @include two-row-ellipsis;
          height: 35px;
          font-size: $font-size-s;
          line-height: 1.5;
          letter-spacing: 1px;
        }
        .item__album {
          font-size: $font-size-s;
          line-height: 1.5;
          .album__name {
            @include one-row-ellipsis;
          }
          .album__artist {
            @include one-row-ellipsis;
            color: $color-text-gray;
          }
        }
      }
    }
  }
}
</style>
