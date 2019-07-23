import Vue from 'vue'
import LeaderboardLayout from './leaderboard-layout.vue'

import { store } from './store/LeaderboardStore.js'

new Vue({
  el: '#app',
  store,
  components: {
    LeaderboardLayout
  }
})
