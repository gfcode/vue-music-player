<template>
  <div>
    <transition name="slide">
      <div v-show="stateCtrl.isPlayerVisible" id="player">
        <!-- 无歌曲时默认背景 -->
        <div v-if="player.detail.album.picUrl == ''" class="player__bg--default"></div>
        <div v-else class="player__bg-blur" :style="getBgImgStyle(player.detail.album.picUrl)"></div>
        <!-- 顶部导航 -->
        <baseHeader :router=false :title="player.detail.name" :variable="'isPlayerVisible'" />
        <div class="play__content">
          <transition name="gradual">
            <div v-show="isLyricVisiable" @click="isLyricVisiable = false" class="content__lyric">
              <div v-if="loadingCtrl.isLyricLoading" class="lyric--none">
                <p class="lyric__item--none">正在加载...</p>
              </div>
              <scroll v-if="!loadingCtrl.isLyricLoading && lyric" class="lyric__scroll-wrapper" ref="elLyricList">
                <ul>
                  <li ref="elLyricLine" v-for="(line, idx) in lyric.lines" :key="idx" :class="{'lyric__item--active': idx === currLyricLine}">
                    {{line.txt}}
                  </li>
                </ul>
              </scroll>
            </div>
          </transition>
          <div v-show="!isLyricVisiable" class="content__cd">
            <div class="cd__probe">
              <div class="probe__item" :class="{'probe__item--playing': player.isPlay}"></div>
            </div>
            <div class="cd__disc">
              <div class="disc__item" :class="{'disc__item--playing': player.isPlay}" @click="isLyricVisiable = true">
                <div class="item__border"></div>
                <div class="item__album">
                  <img v-lazy="player.detail.album.picUrl">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="player__command">
          <div class="command__progress">
            <p class="progress__time">{{formateTime(currentTime)}}</p>
            <div class="progress__bar">
              <div class="progress__bar--played" :style="getProgressStyle()">
                <div class="progress__cursor"></div>
              </div>
            </div>
            <p class="progress__time">{{formateTime(durationTime)}}</p>
          </div>
          <div class="command__console">
            <i class="iconfont icon-singleplay"></i>
            <i @click="onPrevMusic()" class="iconfont icon-prevsong"></i>
            <i @click="onPlay()" class="iconfont btn-play" :class="{'icon-play': !player.isPlay, 'icon-pause': player.isPlay}"></i>
            <i @click="onNextMusic()" class="iconfont icon-nextsong"></i>
            <i @click="queueVisiable = !queueVisiable" class="iconfont icon-playlist"></i>
          </div>
        </div>
      </div>
    </transition>
    <!-- 底部miniPlayer -->
    <div id="mini-player" v-show="!stateCtrl.isPlayerVisible">
      <div class="mini-player__content" @click="openPlayer()">
        <div class="content__album" :class="{'content__album--playing': player.isPlay}">
          <img v-lazy="player.detail.album.picUrl">
        </div>
        <div class="content__info">
          <p class="info__title">{{player.detail.name}}</p>
          <div class="info__artist">
            <span v-if="player.detail.artists.length === 1">{{player.detail.artists[0].name}}</span>
            <span v-else v-for="item in player.detail.artists" :key="item.name">
              {{item.name}} /
            </span>
          </div>
        </div>
      </div>
      <div class="mini-player__command">
        <i @click="onPlay()" class="iconfont btn-play" :class="{'icon-play': !player.isPlay, 'icon-pause': player.isPlay}"></i>
        <i @click="queueVisiable = !queueVisiable" class="iconfont icon-playlist"></i>
      </div>
    </div>
    <!-- 播放列表 -->
    <transition name="slide" mode="out-in">
      <div v-if="queueVisiable" id="queue">
        <div @click="queueVisiable = false" class="queue__empty"></div>
        <scroll class="queue__scroll-wrapper">
          <ul>
            <li class="queue__item" v-for="(item, idx) in musicQueue" :key="idx">
              <p class="item__info" @click="playMusic(item)">
                <i v-if="currIdx === idx" class="item__info--active iconfont icon-volume"></i>
                <span :class="{'info__name--active': currIdx === idx}">{{item.name}}</span> -
                <span class="info__artist" v-for="(artist, index) in item.artists" :key="artist.name">
                  <span v-if="item.artists.length === index + 1">{{artist.name}}</span>
                  <span v-else>{{artist.name}} / </span>
                </span>
              </p>
              <i @click=delMusic(idx) class="item__del iconfont icon-del-x"></i>
            </li>
          </ul>
        </scroll>
      </div>
    </transition>
    <audio ref="audio" autoplay @canplay="canPlay" @ended="playEnd" @timeupdate="updateTime" :src="player.musicUrl"></audio>
  </div>
</template>

<script>
import Loading from '@/base/loading'
import Scroll from '@/base/scroll'
import BaseHeader from '@/components/baseHeader'
import Lyric from 'lyric-parser'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: {
    Loading,
    Scroll,
    BaseHeader
  },
  data () {
    return {
      queueVisiable: false,
      isLyricVisiable: false,
      currentTime: '0',
      durationTime: '0',
      percent: '',
      lyric: null,
      currLyricLine: 0
    }
  },
  created () { },
  methods: {
    ...mapActions(['GET_MUSIC_URL', 'GET_IDX_MUSIC', 'GET_MUSIC_LYRIC']),
    ...mapMutations(['SET_STATECTRL', 'SET_PLAYER_INI', 'SET_CURR_IDX', 'SET_PUSH_MUSIC_QUEUE', 'SET_DEL_MUSIC_QUEUE']),
    getBgImgStyle (url) {
      return `background-image: url(${url})`
    },
    getProgressStyle () {
      return `width:${this.percent}%`
    },
    formateTime (time) {
      let duration = parseInt(time)
      let minute = parseInt(duration / 60)
      let sec = parseInt(duration % 60)
      if (minute === 0) {
        minute = '00'
      } else if (minute < 10) {
        minute = `0${minute}`
      }
      sec = sec < 10 ? `0${sec}` : sec
      return `${minute}:${sec}`
    },
    canPlay () {
      const elAudio = this.$refs.audio
      this.currentTime = elAudio.currentTime
      this.durationTime = elAudio.duration
      this.SET_PLAYER_INI({ el: 'isPlay', val: true })
    },
    playEnd () {
      this.SET_PLAYER_INI({ el: 'isPlay', val: false })
      this.onNextMusic()
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    onPlay () {
      const elAudio = this.$refs.audio
      if (this.lyric) {
        this.lyric.togglePlay()
      }
      if (this.player.isPlay) {
        elAudio.pause()
        this.SET_PLAYER_INI({ el: 'isPlay', val: false })
      } else {
        elAudio.play()
        this.SET_PLAYER_INI({ el: 'isPlay', val: true })
      }
    },
    onPrevMusic () {
      if (this.currIdx !== 0) {
        this.SET_CURR_IDX(this.currIdx - 1)
      }
    },
    onNextMusic () {
      if (this.currIdx < this.musicQueue.length - 1) {
        this.SET_CURR_IDX(this.currIdx + 1)
      }
    },
    openPlayer () {
      this.isLyricVisiable = false
      this.SET_STATECTRL('isPlayerVisible')
    },
    playMusic (detail) {
      this.SET_PUSH_MUSIC_QUEUE(detail)
    },
    delMusic (idx) {
      this.SET_DEL_MUSIC_QUEUE(idx)
    },
    initLyric () {
      if (this.lyric) {
        this.lyric.stop()
        this.lyric = null
      }
      this.GET_MUSIC_LYRIC().then(() => {
        this.lyric = new Lyric(this.player.musicLyric, this.lyricHandler)
        if (this.player.isPlay) {
          this.currLyricLine = 0
          this.lyric.play()
        }
      })
    },
    lyricHandler ({ lineNum, txt }) {
      this.currLyricLine = lineNum
      let currLineEl = this.$refs.elLyricLine[lineNum - 8]
      if (lineNum > 8) {
        this.$refs.elLyricList.scrollToElement(currLineEl, 1000)
      } else {
        // 其他行时不滚动
        this.$refs.elLyricList.scrollTo(0, 0, 1000)
      }
    }
  },
  computed: {
    ...mapGetters(['stateCtrl', 'loadingCtrl', 'currIdx', 'player', 'musicUrl', 'musicQueue'])
  },
  watch: {
    currentTime () {
      this.percent = Math.floor(this.currentTime / this.durationTime * 100 * 100) / 100
    },
    // 歌曲地址改变时重新获取lyric
    musicUrl () {
      this.initLyric()
    },
    // 当前播放idx变化时更新当前idx下歌曲的信息
    currIdx () {
      this.GET_IDX_MUSIC(this.currIdx)
    },
    // 播放列表改变时默认播放第一首
    musicQueue () {
      this.SET_CURR_IDX(0)
      this.GET_IDX_MUSIC(this.currIdx)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(0, 80%, 0);
  opacity: 0;
}

@keyframes disc-rotate {
  100% {
    -webkit-transform: rotateZ(360deg);
  }
}
@-webkit-keyframes disc-rotate {
  100% {
    -webkit-transform: rotateZ(360deg);
  }
}
#player {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $color-bg-bright;
  .player__bg--default {
    @include blur(70px);
    position: fixed;
    z-index: -1;
    top: 0;
    width: 100vw;
    height: 100vh;
    opacity: 0.9;
    background-color: #000;
  }
  .player__bg-blur {
    @include blur(70px);
    position: fixed;
    z-index: -1;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.5;
  }
  .play__content {
    width: 100vw;
    height: 65vh;
    overflow: hidden;
    .content__lyric {
      &.gradual-enter-active,
      &.gradual-leave-active {
        transition: all 0.3s;
        opacity: 1;
      }
      &.gradual-enter,
      &.gradual-leave-to {
        opacity: 0;
      }
      .lyric--none {
        position: relative;
        margin-top: 20px;
        width: 100vw;
        height: 65vh;
        color: $color-text-bright;
        .lyric__item--none {
          position: absolute;
          top: 50%;
          width: 100%;
          text-align: center;
        }
      }
      .lyric__scroll-wrapper {
        margin-top: 20px;
        padding: 0 10vw;
        width: 80vw;
        height: 65vh;
        color: $color-text-bright;
        text-align: center;
        line-height: 2;
        overflow: hidden;
        .lyric__item--active {
          color: $color-theme-red;
        }
      }
    }
    .content__cd {
      position: relative;
      top: 0;
      left: 0;
      padding-bottom: 10vh;
      width: 100vw;
      overflow: hidden;
      .cd__probe {
        position: absolute;
        z-index: 1;
        top: -40px;
        left: 40vw;
        transform: scale(0.8);
        .probe__item {
          width: 124px;
          height: 187px;
          background: url('../assets/images/disc-probe.png') no-repeat center;
          transition: all 0.3s;
          transform-origin: 22px 22px;
          -ms-transform-origin: 22px 22px;
          -webkit-transform-origin: 22px 22px;
          transform: rotateZ(-25deg);
          -ms-transform: rotateZ(-25deg);
          -webkit-transform: rotateZ(-25deg);
        }
        .probe__item--playing {
          transform: rotateZ(5deg);
          -ms-transform: rotateZ(5deg);
          -webkit-transform: rotateZ(5deg);
        }
      }
      .cd__disc {
        margin-top: 2vh;
        transform: scale(0.8);
        .disc__item {
          position: relative;
          top: 45px;
          left: 0;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          box-shadow: 0 0 10px #000;
          overflow: hidden;
          -webkit-animation: disc-rotate 20s linear infinite;
          -ms-animation: disc-rotate 20s linear infinite;
          animation: disc-rotate 20s linear infinite;
          -webkit-animation-play-state: paused;
          -ms-animation-play-state: paused;
          animation-play-state: paused;
          .item__border {
            width: 100%;
            height: 100%;
            background: url('../assets/images/disc.png') no-repeat center;
          }
          .item__album {
            position: absolute;
            z-index: -1;
            top: 58px;
            left: 58px;
            width: 245px;
            height: 245px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .disc__item--playing {
          -webkit-animation-play-state: running;
          -ms-animation-play-state: running;
          animation-play-state: running;
        }
      }
    }
  }
  .player__command {
    position: fixed;
    bottom: 0;
    .command__progress {
      display: flex;
      justify-content: space-around;
      width: 100vw;
      .progress__time {
        text-align: center;
        color: $color-text-bright;
        font-size: $font-size-s-x;
      }
      .progress__bar {
        margin-top: 3px;
        width: 60vw;
        height: 3px;
        background-color: $color-bg-gray;
        .progress__bar--played {
          position: relative;
          width: 0%;
          height: 3px;
          background-color: $color-theme-red;
          .progress__cursor {
            position: absolute;
            top: -5px;
            right: 0px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: $color-theme-red;
            border: 5px solid $color-bg-bright;
            box-shadow: 0 0 10px #222;
          }
        }
      }
    }
    .command__console {
      display: flex;
      justify-content: space-around;
      margin: 4vh 3vw 5vh 3vw;
      color: #fff;
      .icon-singleplay {
        margin-top: 12px;
        font-size: 22px;
        border-radius: 50%;
        &:active {
          box-shadow: 0 0 50px #ccc;
        }
      }
      .icon-prevsong {
        @extend .icon-singleplay;
        margin-top: 7px;
        font-size: 35px;
      }
      .btn-play {
        @extend .icon-singleplay;
        margin-top: 0;
        font-size: 50px;
      }
      .icon-nextsong {
        @extend .icon-singleplay;
        margin-top: 7px;
        font-size: 35px;
      }
      .icon-playlist {
        @extend .icon-singleplay;
        margin-top: 14px;
        font-size: 22px;
      }
    }
  }
}
#mini-player {
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 200;
  bottom: 0;
  width: 100vw;
  height: 50px;
  box-shadow: 0 0 10px #ccc;
  background-color: #fff;
  .mini-player__content {
    display: flex;
    box-sizing: border-box;
    padding: 10px 15px;
    width: 75vw;
    height: 50px;
    .content__album {
      flex: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      -webkit-animation: disc-rotate 20s linear infinite;
      -ms-animation: disc-rotate 20s linear infinite;
      animation: disc-rotate 20s linear infinite;
      -webkit-animation-play-state: paused;
      -ms-animation-play-state: paused;
      animation-play-state: paused;
      img {
        width: 100%;
      }
    }
    .content__album--playing {
      -webkit-animation-play-state: running;
      -ms-animation-play-state: running;
      animation-play-state: running;
    }
    .content__info {
      flex: 1;
      margin: 0 0 0 15px;
      overflow: hidden;
      .info__title {
        @include one-row-ellipsis;
      }
      .info__artist {
        @include one-row-ellipsis;
        @include artist;
        margin-top: 5px;
      }
    }
  }
  .mini-player__command {
    display: flex;
    justify-content: space-around;
    width: 25vw;
    height: 50px;
    .btn-play {
      margin-top: 9px;
      font-size: 32px;
    }
    .icon-playlist {
      margin: 16px 15px 0 15px;
      font-size: 18px;
    }
  }
}

#queue {
  z-index: 205;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  width: 100vw;
  .queue__empty {
    width: 100vw;
    height: 40vh;
  }
  .queue__scroll-wrapper {
    width: 100vw;
    height: 60vh;
    overflow: hidden;
    background-color: $color-bg-bright;
    border-top-left-radius: 13px;
    border-top-right-radius: 13px;
    box-shadow: 0 0 15px #ccc;
    .queue__item {
      display: flex;
      justify-content: space-between;
      padding: 0 7vw;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid $color-border-gray;
      .item__info {
        @include one-row-ellipsis;
        .info__name--active {
          color: $color-theme-red;
        }
        .info__artist {
          @include artist;
        }
      }
      .item__info--active {
        margin: 5px 5px 0 0;
      }
      .item__del {
        margin-left: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
