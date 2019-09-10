<template>
  <div class="column is-two-thirds-tablet">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">World Record Progression</p>
      </header>
      <div class="card-content">
    <table class='table is-narrow is-striped is-fullwidth'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        <WorldRecordRunRow
          v-for="run in worldRecordRuns"
          v-bind:key="run.id"
          v-bind:run="run"
        >
      </WorldRecordRunRow>
      </tbody>
    </table>
    <WorldRecordChart
      v-bind:runs="worldRecordRuns"
      v-bind:category-id="categoryId"
      v-bind:category-name="categoryName"
    >
    </WorldRecordChart>
    </div>
  </div>
  </div>
</template>
<script>
import WorldRecordRunRow from './world-record-run-row.vue'
import WorldRecordChart from './world-record-chart.vue'

export default {
  props: {
    runs: Array,
    categoryId: String,
    categoryName: String
  },
  computed: {
    worldRecordRuns() {
      let verifiedRuns =
        this.runs.filter(r => r.status.status == "verified");

      verifiedRuns.sort((a,b) => {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateA - dateB;
      });

      var worldRecords = [];

      worldRecords.push(verifiedRuns[0]);
      verifiedRuns.forEach(x => {
        var lastEl = worldRecords[worldRecords.length - 1];
        if(x.times.realtime_t < lastEl.times.realtime_t) {
          worldRecords.push(x);
        }
      })
      return worldRecords;
    }
  },
  components: {
    WorldRecordRunRow,
    WorldRecordChart
  }
}
</script>
