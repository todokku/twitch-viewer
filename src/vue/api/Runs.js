export default {
  mapRunsToView(runs, players) {
    let runView = runs
      .map(r => {
        return {
          place: r.place,
          date: r.run.date,
          weblink: r.run.weblink,
          players: this.getPlayersFromRun(r.run.players, players),
          time: this.fancyTimeFormat(r.run.times.realtime_t)
        }
      });

    return runView;
  },
  fancyTimeFormat(time) {
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  },
  getPlayersFromRun(runPlayers, allPlayers) {
    let players = [];

    runPlayers
    .forEach(rp => {
      let player = allPlayers.find(ap => ap.id == rp.id);
      if(player.names){
        players.push(player.names.international);
      }
      else {
        players.push(player.name);
      }
    })

    return players;
  }
}
