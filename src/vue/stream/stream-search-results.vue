<template>
  <div class="container">
    <div class="columns">
      <div class="column is-half">
        <nav class="panel">
          <StreamSearchResult
            v-for="stream in searchResults"
            v-bind:key="stream.id"
            v-bind:stream="stream"
          >
        </StreamSearchResult>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>

import StreamSearchResult from './stream-search-result.vue'

export default {
  props: {
    searchResults: Array
  },
  components: {
    StreamSearchResult
  }
}
</script>
