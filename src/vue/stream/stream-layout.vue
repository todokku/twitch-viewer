<template>
  <div>
  <section class="section">
    <div class="container">
      <h1 class="title">Stream Info</h1>
        <form id="form">
          <div class="field is-grouped">
            <div class="control">
              <input
                class="input"
                type="text"
                id="userInput"
                placeholder="Channel"
                v-model="user"
              >
            </div>
            <div class="control">
              <input
                type="submit"
                class="button is-link"
                value="Find Stream"
                v-on:click.prevent="handleButtonClick"
              />
            </div>
          </div>
        </form>
        <StreamSearchResults
          v-bind:search-results="stream_search_results"
          v-if="stream_search_results.length > 1"
        >
        </StreamSearchResults>
      </div>
    </section>
    <StreamSection
      v-bind:stream="stream"
    >
    </StreamSection>
  </div>
</template>
<script>

import StreamSearchResults from './stream-search-results.vue'
import StreamSection from './stream.vue'

export default {
  data() {
    return {
      user: ""
    }
  },
  computed: {
    stream() {
      return this.$store.state.stream;
    },
    stream_search_results() {
      return this.$store.state.stream_search_results;
    }
  },
  methods: {
    handleButtonClick() {
      this.$store.dispatch("SEARCH_STREAMS", this.user);
    }
  },
  components: {
    StreamSearchResults,
    StreamSection
  }
}
</script>
