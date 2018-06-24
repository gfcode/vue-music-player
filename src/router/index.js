import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend'
import Rank from '@/components/rank'
import User from '@/components/user'
import Playlist from '@/components/playlist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Playlist
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/user',
      component: User
    }
  ]
})
