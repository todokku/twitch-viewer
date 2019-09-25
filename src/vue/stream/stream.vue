<template>
  <section class="section">
    <div class="container">
      <GameInfo
        v-bind:game="stream.game"
      >
      </GameInfo>
      <div class="card" style="width:320px">
        <header class="card-header">
          <p class="card-header-title">
            itsJabo
          </p>
        </header>
        <div class="card-image">
          <figure class="image">
            <img v-bind:src="streamThumbnail" alt="stream thumbnail">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img v-bind:src="gameThumbnail" alt="game thumbnail">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-5">{{stream.game.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import GameInfo from './game-info.vue'

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
      }
    },
    components: {
      GameInfo
    }
  }
</script>
