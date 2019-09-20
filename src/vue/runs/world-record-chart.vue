<template>
  <div>
    <canvas
      style="height:400px;"
      v-bind:id="categoryId + 'Chart'">
    </canvas>
  </div>
</template>
<script>
import Utils from './store/utils.js'
export default {
  props: {
    runs: Array,
    categoryId: String,
    categoryName: String
  },
  data() {
    return {
      chartObject: null
    }
  },
  mounted() {
    this.createChart();
  },
  watch: {
    runs: function (val, oldVal) {
      this.createChart();
    }
  },
  methods: {
    createChart() {
      var ctx = document.getElementById(`${this.categoryId}Chart`).getContext('2d');
      var worldRecordData = this.runs.map(run => {
        return {
          x: run.date,
          y: run.times.realtime_t
        }
      });

      var chartOptions = {
        title: {
          display: true,
          text: this.categoryName
        },
        legend: {
          display: false
        },
        elements: {
          line: {
            tension: 0 //disables bezier curves
          }
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data){
              return Utils.fancyTimeFormat(tooltipItem.value);
            }
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            }
          }],
          yAxes: [{
            ticks: {
              callback: function(value, index, values){
                return Utils.fancyTimeFormat(value);
              }
            }
          }]
        }
      };
      this.chartObject = new Chart(ctx, {
        type: 'line',
        data: {
          datasets: [{
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            data: worldRecordData
          }]
        },
        options: chartOptions
      });
    }
  }
}
</script>
