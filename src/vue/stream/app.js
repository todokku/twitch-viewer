import Vue from 'vue'
import StreamLayout from './stream-layout.vue'

import { store } from './store/StreamStore.js'

new Vue({
  el: '#app',
  store,
  components: {
    StreamLayout
  }
})
