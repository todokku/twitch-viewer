<template>
  <table class="table is-striped is-fullwidth">
    <thead>
      <tr>
        <th>Place</th>
        <th>Player</th>
        <th>Date</th>
        <th>Time</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <RunRow
        v-for="run in runs"
        v-bind:run="run"
        v-bind:key="run.id"
      >
    </RunRow>
    </tbody>
  </table>
</template>
<script>
import RunRow from './run-row.vue'
export default {
  props: {
    runs: Array
  },
  components: {
    RunRow
  }
}
</script>
