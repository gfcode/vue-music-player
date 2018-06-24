<template>
  <transition name="slide" mode="out-in">
    <div id="playlist">
      <loading :visible="loadingCtrl.isPlaylistDetailLoading" />
      <div class="playlist__bg-blur" :style="getBgImgStyle(playlistDetail.coverImgUrl)"></div>
      <div class="playlist__detail">
        <baseHeader :title="'歌单'" />
        <div class="detail__content">
          <div class="content__cover">
            <img v-lazy="playlistDetail.coverImgUrl">
            <div class="cover__play-count">
              <i class="iconfont icon-headset"></i>
              <span>{{ Math.floor(playlistDetail.playCount / 10000) }}万</span>
            </div>
          </div>
          <div class="content__info">
            <p class="info__des">{{playlistDetail.name}}</p>
            <div v-if="playlistDetail.creator" class="info__creator">
              <div class="creator__head-icon" :style="getBgImgStyle(playlistDetail.creator.avatarUrl)"></div>
              <p class="creator__nickname">
                {{playlistDetail.creator.nickname}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="playlist__list">
        <scroll class="list__scroll-wrapper" :data="[playlistDetail]">
          <ul class="list__scroll-content">
            <li class="list__item list__operation" @click="playAll()">
              <p class="item__count">
                <i class="iconfont icon-play"></i>
              </p>
              <p class="operation__play-all">播放全部
                <span class="music-sum">(共{{playlistDetail.trackCount}}首)</span>
              </p>
            </li>
            <li class="list__item" v-for="(item, index) in playlistDetail.tracks" :key="item.id" @click="playMusic(item)">
              <p class="item__count">{{index + 1}}</p>
              <div class="item__info">
                <p class="info__top">{{item.name}}</p>
                <div class="info__bottom">
                  <span class="artist" v-for="(artist, idxArtist) in item.artists" :key="idxArtist">
                    <span v-if="item.artists.length === idxArtist + 1">{{artist.name}}</span>
                    <span v-else>{{artist.name}} / </span>
                  </span>
                  <span class="album"> - {{item.album.name}}</span>
                </div>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import Loading from '@/base/loading'
import Scroll from '@/base/scroll'
import BaseHeader from '@/components/baseHeader'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: {
    Loading,
    Scroll,
    BaseHeader
  },
  data () {
    return {}
  },
  created () { },
  methods: {
    ...mapActions(['GET_PLAYER']),
    ...mapMutations(['SET_PLAYER_INI', 'SET_MUSIC_QUEUE', 'SET_PUSH_MUSIC_QUEUE']),
    getBgImgStyle (url) {
      return `background-image: url(${url})`
    },
    playMusic (detail) {
      this.SET_PUSH_MUSIC_QUEUE(detail)
    },
    playAll () {
      this.SET_MUSIC_QUEUE(this.playlistDetail.tracks)
    }
  },
  computed: {
    ...mapGetters(['stateCtrl', 'loadingCtrl', 'playlistDetail'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(80%, 0, 0);
  opacity: 0;
}
#playlist {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $color-bg-bright;
  .playlist__bg-blur {
    @include blur(20px);
    position: fixed;
    z-index: -1;
    top: 0;
    width: 100vw;
    height: 205px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.9;
  }
  .playlist__detail {
    height: 205px;
    .detail__content {
      display: flex;
      padding: 5px 5vw;
      .content__cover {
        position: relative;
        width: 40%;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
        .cover__play-count {
          @include icon__play-count;
        }
      }
      .content__info {
        box-sizing: border-box;
        width: 60%;
        padding: 5vw;
        .info__des {
          @include two-row-ellipsis;
          line-height: 1.5;
          color: $color-text-bright;
          font-size: $font-size-m-x;
        }
        .info__creator {
          display: flex;
          margin-top: 5vw;
          .creator__head-icon {
            overflow: hidden;
            width: 8vw;
            height: 8vw;
            background-size: cover;
            border-radius: 50%;
          }
          .creator__nickname {
            @include one-row-ellipsis;
            padding: 0 0 0 2vw;
            line-height: 8vw;
            color: $color-text-gray-bright;
          }
        }
      }
    }
  }
  .playlist__list {
    position: fixed;
    top: 205px;
    bottom: 0;
    padding-bottom: 50px;
    width: 100vw;
    .list__scroll-wrapper {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .list__scroll-content {
        position: relative;
        z-index: 15;
        background-color: $color-bg-bright;
        border-top-left-radius: 13px;
        border-top-right-radius: 13px;
        .list__operation {
          height: 6.5vh;
          border-radius: 5px;
          overflow: hidden;
          .icon-video-light {
            position: relative;
            right: -4px;
          }
          .operation__play-all {
            width: 100%;
            font-size: $font-size-m-x;
            line-height: 6.5vh;
            border-bottom: 1px solid $color-border-gray;
            .music-sum {
              color: $color-text-gray;
              font-size: $font-size-m;
            }
          }
        }
        .list__item {
          display: flex;
          height: 6.5vh;
          .item__count {
            width: 13vw;
            color: $color-text-gray;
            font-size: $font-size-l;
            line-height: 6.5vh;
            text-align: center;
          }
          .item__info {
            display: flex;
            flex-direction: column;
            width: 87vw;
            border-bottom: 1px solid $color-border-gray;
            .info__top {
              padding-top: 1vh;
              @include one-row-ellipsis;
            }
            .info__bottom {
              padding-top: 1vh;
              color: $color-text-gray;
              font-size: $font-size-s;
              @include one-row-ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>
