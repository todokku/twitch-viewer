import Vue from 'vue'
import RunsLayout from './runs-layout.vue'

import { store } from './store/RunsStore.js'

new Vue({
  el: '#app',
  store,
  components: {
    RunsLayout
  }
})
