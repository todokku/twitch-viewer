<template>
  <a
    class="panel-block game-link"
    v-on:click="handleClick"
  >
    {{game.names.international}}
  </a>
</template>
<script>
export default {
  props: {
    game: Object
  },
  methods: {
    handleClick() {
      this.$store.dispatch("GET_RUNS", this.game.id);
    }
  }
}
</script>
