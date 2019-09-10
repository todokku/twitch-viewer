<template>
  <div class="column is-one-third-tablet">
    <div class="card">
      <div class="card-content">
        <canvas
          style="height:400px;width:400px"
          v-bind:id="categoryId + 'ActiveRunnerChart'">
        </canvas>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    runs: Array,
    categoryId: String
  },
  data() {
    return {
      chartObject: null
    }
  },
  mounted() {
    this.createChart();
  },
  updated() {
    this.chartObject.destroy();
    this.createChart();
  },
  computed: {
    players() {
      var players = this.runs
      .map(r => {
        return this.playerNameByRun(r);
      });

      return players;
    },
    playerCount() {
      const counts = Object.create(null);

      this.players.forEach(btn => {
        counts[btn] = counts[btn] ? counts[btn] + 1 : 1;
      });

      let playerCounts = [];
      Object.keys(counts)
        .forEach(c => {
          var x = {
            player: c,
            count: counts[c]
          }

          playerCounts.push(x);
        });

      playerCounts.sort(function(a, b){ return b.count - a.count});

      return playerCounts.slice(0,5);
    }
  },
  methods: {
    playerNameByRun(run) {
      if(run.players.data[0].names){
        return run.players.data[0].names.international;
      }
      else {
        return run.players.data[0].name;
      }
    },
    createChart() {
      var chartData = this.playerCount.map(x => x.count);
      var chartLabels = this.playerCount.map(x => x.player);

      var ctx = document.getElementById(`${this.categoryId}ActiveRunnerChart`).getContext('2d');

      var chartOptions = {
        title: {
          display: true,
          text: 'Top 5 Most Active Runners'
        }
      };
      this.chartObject = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: chartLabels,
          datasets: [{
            // backgroundColor: 'rgb(75, 192, 192)',
            // borderColor: 'rgb(75, 192, 192)',
            // fill: false,
            data: chartData,
            backgroundColor: [
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(153, 102, 255)'
            ],
            label: 'Runs'
          }]
        },
        options: chartOptions
      });
    }
  }
}
</script>
