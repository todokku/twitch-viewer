export default {
  mapRunsToView(runs, players) {
    let runView = runs
      .map(r => {
        return {
          place: r.place,
          id: r.run.id,
          date: r.run.date,
          weblink: r.run.weblink,
          playersObject: r.run.players,
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
        players.push(rp.name);
      }
    })

    return players;
  },
  runPromise(game_id) {
    return new Promise((resolve, reject) => {
      this.getRuns(`https://www.speedrun.com/api/v1/runs?game=${game_id}&embed=players,category`, [], resolve, reject)
    })
  },
  getRuns(url, runs, resolve, reject){
    $.ajax({url: url})
    .then(response => {
      const retrievedRuns = runs.concat(response.data);
      var nextPageUrl = response.pagination.links.find(x => x.rel == "next");
      if(nextPageUrl) {
        this.getRuns(nextPageUrl.uri, retrievedRuns, resolve, reject)
      }
      else {
        resolve(retrievedRuns);
      }
    })
    .catch(error => {
      console.log(error)
      reject('Something wrong. Please refresh the page and try again.')
    });
  }
}
