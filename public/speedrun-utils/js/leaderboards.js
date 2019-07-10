var leaderboards = (function () {
  var games = [
    {
      id: 'ldej0x13',
      name: "King's Quest: Quest for the Crown"
    },
    {
      id: "268w856p",
      name: "King's Quest II: Romancing the Throne"
    },
    {
      id: "9do8331p",
      name: "King's Quest III: To Heir Is Human"
    },
    {
      id: "m1mnzjd2",
      name: "King's Quest IV: The Perils of Rosella"
    },
    {
      id: 'yd4kz56e',
      name: "King's Quest V: Absence Makes the Heart Go Yonder",
    },
    {
      id: '3dxk8v1y',
      name: "King's Quest VI: Heir Today Gone Tomorrow"
    },
    {
      id: "v1pxz768",
      name: "King's Quest VII: The Princeless Bride"
    },
    {
      id: "46w2e76r",
      name: "Mask of Eternity"
    }
  ];

  function init() {
    Promise.all(getGamePromises())
    .then(function(){
      return Promise.all(getLeaderboardPromises());
    })
    .then(() => {
      console.log(games);
      renderGames();
    })
  };

  function getGamePromises(){
    let gamePromises = [];

    games.forEach((g) => {
      gamePromises.push(
        fetchGameCategories(g.id)
        .then(function(response){
          g.categories = response.data;
        })
      )
    });

    return gamePromises;
  }

  function getLeaderboardPromises() {
    let leaderboardPromises = [];

    games.forEach((g) => {
      g.categories
        .filter(c => c.type == "per-game")
        .forEach((c) => {
        leaderboardPromises.push(
          fetchLeaderboard(g.id, c.id)
          .then(function(response){
            c.leaderboard = response.data;
          })
        )
      })
    })

    return leaderboardPromises;
  }

  function fetchGameCategories(game) {
    var url = `https://www.speedrun.com/api/v1/games/${game}/categories`;

    return $.ajax({url: url});
  }

  function fetchLeaderboard(game, category){
    var url = `https://www.speedrun.com/api/v1/leaderboards/${game}/category/${category}?embed=players`;
    return $.ajax({url: url});
  }

  function renderGames() {
    var template = `
    ${makeGameTemplate(games)}
    `;

    $("#game-target").html(template);
  };

  function makeGameTemplate(data){
    let newList = '';

    data.forEach(function(object){
      let category = object.categories.filter(c => c.type == "per-game");
      newList += `
      <section class="section">
        <div class="container">
          <h2 class="title is-3">${object.name}</h2>
          ${makeCategoryTemplate(category)}
        </div>
      </section>
      <hr/>`
    });
    return newList;
  }

  function makeCategoryTemplate(data) {
    let newList = '';
    data.forEach(function(object){
      newList += `
        <h3 class="title is-4">${object.name}</h3>
        <table class="table is-striped">
          <tbody>
            ${makeRunsTemplate(object.leaderboard.runs, object.leaderboard.players.data)}
          </tbody>
        </table>

      `;
    })
    return newList;
  }

  function makeRunsTemplate(runs, players){

    let newList = '';
    runs.forEach(function(object){
      newList += `
        <tr>
          <td>${object.place}</td>
          <td>${getPlayerNameFromRun(object.run, players)}</td>
          <td>${fancyTimeFormat(object.run.times.realtime_t)}</td>
          <td>${object.run.date}</td>
          <td>
            <a href="${object.run.videos.links[0].uri}">Link</a>
          </td>
        </tr>
      `;
    })
    return newList;
  }

  function getPlayerNameFromRun(run, players) {
    let player = players.find(x => x.id == run.players[0].id)
    if(player.names){
      return player.names.international;
    }
    else {
      return player.name;
    }
  }

  function fancyTimeFormat(time) {
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
}

  return {
    init: init
  }
})()
