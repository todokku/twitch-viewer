<template>
  <section class="section">
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
</section>
</template>
<script>
import GameSearchResult from './game-search-result.vue'
export default {
  props: {
    searchResults: Array
  },
  // computed: {
  //   searchResults() {
  //     return this.$store.state.game_search_results;
  //   }
  // },
  components: {
    GameSearchResult
  }
}
</script>
