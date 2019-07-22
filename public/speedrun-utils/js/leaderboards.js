var leaderboards = (function () {

  var series_id = "";

  //dom elements
  var $form = null;
  var $seriesNameInput = null;
  var $seriesLinks = null;

  function init() {
    cacheDom();
    bindEvents();

    const urlParams = new URLSearchParams(window.location.search);
    const series_id_param = urlParams.get('series_id');
    if(series_id_param){
      series_id = series_id_param;
      startRender();
    }
  };

  //dom caching
  function cacheDom(){
    $form = $("#form");
    $seriesNameInput = $form.find("#seriesNameInput");
  }

  function cacheSeriesDom(){
    $seriesLinks = $(".series-link");
  }

  //event binding
  function bindEvents(){
    $form.on("submit", fetchSeries);
  }

  function bindSeriesEvents() {
    $seriesLinks.on("click", handleSeriesClick)
  }

  //click handling
  function handleSeriesClick(evt) {
    series_id = $(evt.target).data("id");
    startRender();
  }

  function startRender() {
    fetchGames(series_id)
    .then(response => {
      games =
        response.data
        .sort((a,b) => {
          var dateA = new Date(a["release-date"]);
          var dateB = new Date(b["release-date"]);
          return dateA - dateB;
        })
        .map(x => {
          return {
            id: x.id,
            name: x.names.international
          }
        });

        getLeaderboards();
    })
  }

  //DAL
  function fetchSeries(evt){
    evt.preventDefault();
    var series_query = $seriesNameInput.val();

    $.ajax({url: `https://www.speedrun.com/api/v1/series?name=${series_query}`})
    .then(response => {
      renderSeries(response.data);
      cacheSeriesDom();
      bindSeriesEvents();
    })
  }

  function fetchGames(series_id){
    return $.ajax({url: `https://www.speedrun.com/api/v1/series/${series_id}/games`});
  }

  function getLeaderboards(){
    Promise.all(getGamePromises())
    .then(function(){
      return Promise.all(getLeaderboardPromises());
    })
    .then(() => {
      renderLeaderboards();
    })
  }

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
    var url = `https://www.speedrun.com/api/v1/leaderboards/${game}/category/${category}?embed=players,variables`;
    return $.ajax({url: url});
  }

  //rendering
  function renderSeries(series){
    var template = `
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <nav class="panel">
            ${makeSeriesTemplate(series)}
          </nav>
        </div>
      </div>
    </div>
    `;

    $("#series-target").html(template);
  }

  function makeSeriesTemplate(data){
    let newList = '';

    data.forEach(function(series){
      newList += `
        <a class="panel-block series-link" data-id="${series.id}">
          ${series.names.international}
        </a>
      `;
    })

    return newList;
  }

  function renderLeaderboards() {
    var template = `
    <div class="container">
      <a href="./leaderboards.html?series_id=${series_id}">Permalink</a>
    </div>
    ${makeLeaderboardTemplate(games)}
    `;

    $("#leaderboard-target").html(template);
  };

  function makeLeaderboardTemplate(data){
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
            <a href="${getVideoUrlFromRun(object.run)}">Link</a>
          </td>
        </tr>
      `;
    })
    return newList;
  }

  //utils
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

  function getVideoUrlFromRun(run) {
    if(run.videos == null){
      return "";
    }
    else if(run.videos.links){
      return run.videos.links[0].uri;
    }
    else {
      return run.videos.text;
    }
  }

  return {
    init: init
  }
})()
