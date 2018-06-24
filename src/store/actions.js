import { ERR_OK } from '@/utils/config'
import apis from '@/api/base'
import types from './types'

const actions = {
  // 推荐
  async [types.GET_BANNER] ({ commit }) {
    const { status, data } = await apis.getBanner()
    if (status === ERR_OK) {
      commit(types.SET_BANNER_LIST, data)
    } else {
      console.log('getBanner error')
    }
  },
  async [types.GET_RECOMMEND_PLAYLIST] ({ commit }) {
    const { status, data } = await apis.getRecommendPlaylist()
    if (status === ERR_OK) {
      commit(types.SET_RECOMMEND_PLAYLIST, data)
    } else {
      console.log('getRecommendPlaylist error')
    }
  },
  async [types.GET_RECOMMEND_PLAYLIST_DETAIL] ({ commit }, id) {
    commit(types.SET_LOADINGCTRL, 'isPlaylistDetailLoading')
    commit(types.SET_PLAYLIST_DETAIL, { result: [] })
    const { status, data } = await apis.getRecommendPlaylistDetail(id)
    if (status === ERR_OK) {
      commit(types.SET_PLAYLIST_DETAIL, data)
      commit(types.SET_LOADINGCTRL, 'isPlaylistDetailLoading')
    } else {
      console.log('getRecommendPlaylist error')
    }
  },
  async [types.GET_RECOMMEND_MUSIC] ({ commit }) {
    const { status, data } = await apis.getRecommendMusic()
    if (status === ERR_OK) {
      commit(types.SET_RECOMMEND_MUSIC, data)
    } else {
      console.log('getRecommendMusic error')
    }
  },
  async [types.GET_RANK] ({ commit }, idx) {
    const { status, data } = await apis.getRank(idx)
    if (status === ERR_OK) {
      commit(types.SET_RANK_LIST, data)
    } else {
      console.log('getRank error')
    }
  },
  async [types.GET_ARTIST] ({ commit }) {
    const { status, data } = await apis.getArtist()
    if (status === ERR_OK) {
      commit(types.SET_ARTIST_LIST, data)
    } else {
      console.log('getArtist error')
    }
  },
  // 获取music_id对应的URL
  async [types.GET_MUSIC_URL] ({ state, commit }) {
    const { status, data } = await apis.getMusic(state.player.musicId)
    if (status === ERR_OK) {
      commit(types.SET_PLAYER_INI, { el: 'musicUrl', val: data.data[0].url })
    } else {
      console.log('getMusic error')
    }
  },
  async [types.GET_MUSIC_LYRIC] ({ state, commit }) {
    commit(types.SET_LOADINGCTRL, 'isLyricLoading')
    const { status, data } = await apis.getLyric(state.player.musicId)
    if (status === ERR_OK) {
      commit(types.SET_PLAYER_INI, { el: 'musicLyric', val: data.lrc.lyric || '' })
    } else {
      console.log('getLyric error')
    }
    commit(types.SET_LOADINGCTRL, 'isLyricLoading')
  },
  // 获取当前播放列表下idx对应的Music
  async [types.GET_IDX_MUSIC] ({ state, commit, dispatch }, idx) {
    commit(types.SET_PLAYER_INI, { el: 'musicId', val: state.musicQueue[idx].id })
    commit(types.SET_PLAYER_INI, { el: 'detail', val: state.musicQueue[idx] })
    dispatch(types.GET_MUSIC_URL)
  }
}

export default actions
