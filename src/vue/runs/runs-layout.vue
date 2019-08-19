<template>
  <div>
  <section class="section">
    <div class="container">
      <h1 class="title">Speedruns and WR Progressions</h1>
        <form id="form">
          <div class="field is-grouped">
            <div class="control">
              <input
                class="input"
                type="text"
                id="gameNameInput"
                placeholder="Game"
                v-model="game"
              >
            </div>
            <div class="control">
              <input
                type="submit"
                class="button is-link"
                value="Find Games"
                v-on:click.prevent="handleButtonClick"
              />
            </div>
          </div>
        </form>
        <GameSearchResults></GameSearchResults>
      </div>
    </section>
    <Game></Game>
  </div>
</template>
<script>

import GameSearchResults from './game-search-results.vue'
import Game from './game.vue'

export default {
  data() {
    return {
      game: ""
    }
  },
  methods: {
    handleButtonClick() {
      let game_name = this.game;

      this.$store.dispatch("SEARCH_GAMES", game_name);
    }
  },
  components: {
    GameSearchResults,
    Game
  }
}
</script>
