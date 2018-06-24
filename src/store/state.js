let state = {
  stateCtrl: {
    isPlayerVisible: false
  },
  loadingCtrl: {
    isPlaylistDetailLoading: false,
    isLyricLoading: false
  },
  player: {
    detail: {
      name: '暂无播放',
      album: {
        picUrl: ''
      },
      artists: [
        {
          name: ''
        }
      ]
    },
    isPlay: false,
    musicId: '',
    musicUrl: '',
    musicLyric: ''
  },
  // 当前播放歌曲的索引
  currIdx: 0,
  // 播放列表
  musicQueue: [],
  banner: [],
  recommendPlaylist: [],
  playlistDetail: {},
  recommendMusic: [],
  rankList: [],
  artistList: []
}
export default state
