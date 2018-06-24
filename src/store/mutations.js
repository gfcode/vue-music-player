import types from './types'

const mutation = {
  [types.SET_STATECTRL] (state, el) {
    state.stateCtrl[el] = !state.stateCtrl[el]
  },
  [types.SET_LOADINGCTRL] (state, el) {
    state.loadingCtrl[el] = !state.loadingCtrl[el]
  },
  [types.SET_PLAYER_INI] (state, payload) {
    const { el, val } = payload
    state.player[el] = val
  },
  [types.SET_CURR_IDX] (state, idx) {
    state.currIdx = idx
  },
  [types.SET_MUSIC_QUEUE] (state, list) {
    let cache = JSON.parse(JSON.stringify(list))
    state.musicQueue = cache
  },
  [types.SET_PUSH_MUSIC_QUEUE] (state, data) {
    // 当前列表如果存在则移至最前，否则左添加
    let isFind = state.musicQueue.findIndex(el => {
      return el.id === data.id
    })
    if (isFind !== -1) {
      state.musicQueue.splice(isFind, 1)
    }
    state.musicQueue.unshift(data)
  },
  [types.SET_DEL_MUSIC_QUEUE] (state, idx) {
    state.musicQueue.splice(idx, 1)
  },
  [types.SET_BANNER_LIST] (state, data) {
    state.banner = data.banners || []
  },
  [types.SET_RECOMMEND_PLAYLIST] (state, data) {
    state.recommendPlaylist = data.result.slice(0, 12) || []
  },
  [types.SET_PLAYLIST_DETAIL] (state, data) {
    state.playlistDetail = data.result || []
  },
  [types.SET_RECOMMEND_MUSIC] (state, data) {
    state.recommendMusic = data.result.slice(0, 9) || []
  },
  [types.SET_RANK_LIST] (state, data) {
    state.rankList.push(data.playlist)
  },
  [types.SET_ARTIST_LIST] (state, data) {
    state.artistList = data.result || []
  }
}

export default mutation
