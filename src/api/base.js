import axios from 'axios'
import { HOST } from '@/utils/config'

const apis = {
  // 轮播图
  getBanner: () => {
    return axios.get(`${HOST}/banner`)
  },
  // 推荐歌单
  getRecommendPlaylist: () => {
    return axios.get(`${HOST}/personalized`)
  },
  // 推荐歌单详详情
  getRecommendPlaylistDetail: id => {
    return axios.get(`${HOST}/playlist/detail?id=${id}`)
  },
  // 推荐歌曲
  getRecommendMusic: () => {
    return axios.get(`${HOST}/personalized/newsong`)
  },
  // 排行榜
  getRank: idx => {
    return axios.get(`${HOST}/top/list?idx=${idx}`)
  },
  // 歌手榜
  getArtist: () => {
    return axios.get(`${HOST}/toplist/artist`)
  },
  // 获取歌曲
  getMusic: id => {
    return axios.get(`${HOST}/music/url?id=${id}`)
  },
  // 获取歌词
  getLyric: id => {
    return axios.get(`${HOST}/lyric?id=${id}`)
  }
}

export default apis
