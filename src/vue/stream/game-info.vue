<template>
  <section class="section">
    <div class="container">
      <div class="card" style="width:256px">
        <div class="card-image">
        <figure class="image">
          <img v-bind:src="thumbnail" alt="game boxart">
        </figure>
        </div>
        <div class="card-content">
          <p class="title is-5">{{game.names.international}}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    game: Object
  },
  computed: {
    thumbnail() {
      if(!this.game.assets) {
        return "";
      }
      return this.game.assets['cover-large'].uri;
    }
  }
}
</script>
