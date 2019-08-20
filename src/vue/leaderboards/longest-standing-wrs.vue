<template>
  <section class="section">
    <div
      v-if="games.length > 0"
      class="container"
    >
      <h2 class="title is-3">Longest Standing World Records</h2>
      <table class="table is-striped">
        <tbody>
          <LongestStandingRow
            v-for="record in records"
            v-bind:record="record"
            v-bind:key="record.id"
          >
          </LongestStandingRow>
        </tbody>
      </table>
  </div>
</section>
</template>
<script>
  import LongestStandingRow from './longest-standing-row.vue'

  export default {
    props: {
      games: Array
    },
    computed: {
      records() {
        let worldRecords = [];
        this.games.forEach(g => {
          g.categories.forEach(c => {
            if(c.runs != undefined && c.runs.length > 0){

            let worldRecordRun =
              c.runs[0];

              let record = {
                id: worldRecordRun.id,
                game: g.name,
                category: c.name,
                date: worldRecordRun.date,
                player: worldRecordRun.players.join(', '),
                link: worldRecordRun.weblink,
                time: worldRecordRun.time
              }

              worldRecords.push(record);
            }
          })
        })

        worldRecords = worldRecords.sort((a,b) => {
          var dateA = new Date(a.date);
          var dateB = new Date(b.date);
          return dateA - dateB;
        });
        return worldRecords;
      }
    },
    components: {
      LongestStandingRow
    }
  }
</script>
