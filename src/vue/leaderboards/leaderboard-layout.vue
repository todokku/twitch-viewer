<template>
  <div>
    <section class="section>">
      <div class="container">
        <h1 class="title">Series Leaderboards</h1>
        <div class="columns">
          <div class="column is-half">
          <SeriesSearch></SeriesSearch>
          </div>
        </div>
      </div>
    </section>
    <Game
      v-for="game in games"
      v-bind:game="game"
      v-bind:key="game.id"
    >
    </Game>
  </div>
</template>

<script>
import Game from './game.vue'
import SeriesSearch from './series-search.vue'

export default {
  computed: {
    games() {
      return this.$store.getters.view;
    }
  },
  components: {
    Game,
    SeriesSearch
  }
}
</script>
