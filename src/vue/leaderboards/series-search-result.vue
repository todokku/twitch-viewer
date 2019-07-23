<template>
  <a
    class="panel-block series-link"
    v-on:click="getGames"
  >
    {{series.names.international}}
  </a>
</template>
<script>
export default{
  props: {
    series: Object
  },
  methods: {
    getGames() {
      this.$store.dispatch("GET_LEADERBOARDS", this.series.id);
    }
  }
}
</script>
