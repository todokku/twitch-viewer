<template>
  <div class="card" style="width:188px">
    <div class="card-image">
    <figure class="image">
      <img v-bind:src="thumbnail" alt="game boxart">
    </figure>
    </div>
    <div class="card-content">
      <p class="title is-5">{{game.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    game: Object
  },
  computed: {
    thumbnail(){
      var thumbnail = this.game.box_art_url;
      thumbnail =
        thumbnail
        .replace("{width}", "188")
        .replace("{height}", "250");
      return thumbnail;
    }
  }
}
</script>
