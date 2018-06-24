const getters = {
  stateCtrl: state => state.stateCtrl,
  loadingCtrl: state => state.loadingCtrl,
  player: state => state.player,
  musicUrl: state => state.player.musicUrl,
  currIdx: state => state.currIdx,
  musicQueue: state => state.musicQueue,
  banner: state => state.banner,
  recommendPlaylist: state => state.recommendPlaylist,
  playlistDetail: state => state.playlistDetail,
  recommendMusic: state => state.recommendMusic,
  rankList: state => state.rankList,
  artistList: state => state.artistList
}
export default getters
