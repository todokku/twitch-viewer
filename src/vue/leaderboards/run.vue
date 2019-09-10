<template>
  <tr>
    <td>
      {{run.place}}
    </td>
    <td>
      {{formatPlayers}}
    </td>
    <td>
      {{run.date}}
    </td>
    <td style="text-align: right;">
      {{run.time}}
    </td>
    <td>
      <a v-bind:href="run.weblink">
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
