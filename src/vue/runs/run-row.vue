<template>
  <tr>
    <td>{{playerName}}</td>
    <td>{{run.date}}</td>
    <td>{{runTimeFormatted}}</td>
    <td>{{run.status.status}}</td>
    <td><a href="https://www.speedrun.com/${object.game}/run/${object.id}">Link</a></td>
  </tr>
</template>

<script>
  import Utils from './store/utils.js'
  export default {
    props: {
      run: Object
    },
    computed: {
      runTimeFormatted() {
        return Utils.fancyTimeFormat(this.run.times.realtime_t);
      },
      playerName() {
        if(this.run.players.data[0].names){
          return this.run.players.data[0].names.international;
        }
        else {
          return this.run.players.data[0].name;
        }
      }
    }
  }
</script>
