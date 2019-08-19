<template>
  <div class="container">
    <div class="columns">
      <div class="column is-half">
        <nav class="panel">
          <GameSearchResult
            v-for="game in searchResults"
            v-bind:key="game.id"
            v-bind:game="game"
          >
          </GameSearchResult>
        </nav>
      </div>
    </div>
  </div>
</template>
<script>
import GameSearchResult from './game-search-result.vue'
export default {
  computed: {
    searchResults() {
      return this.$store.state.game_search_results;
    }
  },
  components: {
    GameSearchResult
  }
}
</script>
