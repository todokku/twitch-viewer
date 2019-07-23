<template>
  <tr>
    <td>
      {{run.place}}
    </td>
    <td>
      {{formatPlayers}}
    </td>
    <td>
      {{run.time}}
    </td>
    <td>
      {{run.date}}
    </td>
    <td>
      <a v-bind:href="run.place">
        Link
      </a>
    </td>
  </tr>
</template>
<script>
export default {
  props: {
    run: Object
  },
  computed: {
    formatPlayers() {
      return this.run.players.join(', ');
    }
  }
}
</script>
