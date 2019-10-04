<template>
  <section class="section">
    <div class="container">
      <div class="card" style="width:320px">
        <header class="card-header">
          <p class="card-header-title">
            {{stream.user_name}}
          </p>
        </header>
        <div class="card-image">
          <figure class="image">
            <img v-bind:src="streamThumbnail" alt="stream thumbnail">
          </figure>
        </div>
        <div class="card-content">
          <p>
            {{stream.title}}
          </p>
          <p>
            {{stream.viewer_count}} viewers
          </p>
        </div>
      </div>
      <GameInfo
        v-bind:game="stream.game"
      >
      </GameInfo>
      <GameSearchResults
        v-bind:search-results="gameSearchResults"
        v-if="showGameSearchResults"
      >
      </GameSearchResults>
      <Leaderboards></Leaderboards>
    </div>
  </section>
</template>
<script>
  import GameInfo from './game-info.vue'
  import GameSearchResults from './game-search-results.vue'
  import Leaderboards from './leaderboards.vue'

  export default {
    props: {
      stream: Object
    },
    computed: {
      streamThumbnail() {
        var thumbnail = this.stream.thumbnail_url;
        thumbnail =
          thumbnail
          .replace("{width}", "320")
          .replace("{height}", "180");
        return thumbnail;
      },
      gameThumbnail() {
        var thumbnail = this.stream.game.box_art_url;
        thumbnail =
          thumbnail
          .replace("{width}", "188")
          .replace("{height}", "250");
        return thumbnail;
      },
      gameSearchResults () {
        return this.$store.state.game_search_results;
      },
      showGameSearchResults() {
        return this.$store.state.game_search_results.length > 1;
      }
    },
    components: {
      GameInfo,
      GameSearchResults,
      Leaderboards
    }
  }
</script>
