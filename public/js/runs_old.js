var runs = (function () {
  var game_id = "3dxk8v1y";
  var runApiOffset = 0;

  //dom elements
  var $form = null;
  var $gameNameInput = null;
  var $gameLinks = null;

  function init() {
    cacheDom();
    bindEvents();
  };

  //dom caching
  function cacheDom(){
    $form = $("#form");
    $gameNameInput = $form.find("#gameNameInput");
  }

  function cacheGameDom(){
    $gameLinks = $(".game-link");
  }

  //event binding
  function bindEvents(){
    $form.on("submit", fetchGames);
  }

  function bindGameEvents() {
    $gameLinks.on("click", handleGameClick)
  }

  //click handlers
  function handleGameClick(evt) {
    game_id = $(evt.target).data("id");

    runPromise()
    .then((response) => {
      const grouped = groupBy(response, run => run.category.data.name);
      const groupedRuns = Array.from(grouped);

      renderRunCategories(groupedRuns);
      renderWorldRecordCategories(groupedRuns);
    });
  }

  function fetchGames(evt){
    evt.preventDefault();
    var game_name = $gameNameInput.val();

    $.ajax({url: `https://www.speedrun.com/api/v1/games?name=${game_name}`})
    .then(response => {
      renderGames(response.data);
      cacheGameDom();
      bindGameEvents();
    })
  }

  function runPromise() {
    return new Promise((resolve, reject) => {
      getRuns(`https://www.speedrun.com/api/v1/runs?game=${game_id}&embed=players,category`, [], resolve, reject)
    })
  }

  function getRuns(url, runs, resolve, reject){
    $.ajax({url: url})
    .then(response => {
      const retrievedRuns = runs.concat(response.data);
      var nextPageUrl = response.pagination.links.find(x => x.rel == "next");
      if(nextPageUrl) {
        getRuns(nextPageUrl.uri, retrievedRuns, resolve, reject)
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

  function worldRecords(runs) {
    runs.sort((a,b) => {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateA - dateB;
    });

    console.log(runs);

    var worldRecords = [];

    worldRecords.push(runs[0]);
    runs.forEach(x => {
      var lastEl = worldRecords[worldRecords.length - 1];
      if(x.times.realtime_t < lastEl.times.realtime_t) {
        worldRecords.push(x);
      }
    })
    return worldRecords;
  }

  //https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  }

  //rendering

  function renderGames(games){
    var template = `
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <nav class="panel">
            ${makeGameTemplate(games)}
          </nav>
        </div>
      </div>
    </div>
    `;

    $("#games-target").html(template);
  }

  function makeGameTemplate(data){
    let newList = '';

    data.forEach(function(game){
      newList += `
        <a class="panel-block game-link" data-id="${game.id}">
          ${game.names.international}
        </a>
      `;
    })

    return newList;
  }

  function renderRunCategories(categories){
    let newList = '';

    categories.forEach(function(category){
      var runs = category[1];

      newList += `
      <section class="section">
        <div class="container">
          <h2 class="title is-3">${category[0]}</h2>
          ${renderRuns(runs)}
        </div>
      </section>
      <hr/>`
    });
    $("#runs-target").html(newList);
  }

  function renderRuns(runs) {
    var template = `
    <table class='table is-narrow is-striped'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Category</th>
          <th>Time</th>
          <th>Status</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        ${makeRunTemplate(runs)}
      </tbody>
    </table>
    `;

    return template;
  };

  function makeRunTemplate(data){
    let newList = '';

    data.forEach(function(object){
      var playerName = "";
      if(object.players.data[0].names){
        playerName = object.players.data[0].names.international;
      }
      else {
        playerName = object.players.data[0].name;
      }

      newList += `
      <tr>
        <td>${playerName}</td>
        <td>${object.date}</td>
        <td>${object.category.data.name}</td>
        <td>${fancyTimeFormat(object.times.realtime_t)}</td>
        <td>${object.status.status}</td>
        <td><a href="https://www.speedrun.com/${object.game}/run/${object.id}">Link</a></td>
      <tr/>`
    });
    return newList;
  }

  function renderWorldRecordCategories(categories){
    let template = `
    <div class="container">
      <h2 class="title is-3">World Record Progression</h2>
    </div>
    `;

    categories.forEach(function(category){
      var verifiedRuns = category[1]
        .filter(x => x.status.status == "verified");
      var worldRecordRuns = worldRecords(verifiedRuns);

      template += `
      <section class="section">
        <div class="container">
          <h2 class="title is-3">${category[0]}</h2>
          ${renderWorldRecords(worldRecordRuns)}
          <div style="position: relative; height: 40vh; width: 80vh">
            <canvas id="${category[0]}Chart"></canvas>
          </div>
        </div>
      </section>
      <hr/>`
    });

    $("#wrs-target").html(template);

    categories.forEach(function(category){
      var verifiedRuns = category[1]
        .filter(x => x.status.status == "verified");
      var worldRecordRuns = worldRecords(verifiedRuns);

      var ctx = document.getElementById(`${category[0]}Chart`).getContext('2d');
      var worldRecordData = worldRecordRuns.map(run => {
        return {
          x: run.date,
          y: run.times.realtime_t
        }
      });

      var chartOptions = {
        title: {
          display: true,
          text: category[0]
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
              return fancyTimeFormat(tooltipItem.value);
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
                return fancyTimeFormat(value);
              }
            }
          }]
        }
      };
      var myChart = new Chart(ctx, {
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
    });
  }

  function renderWorldRecords(runs) {
    var template = `
    <table class='table is-narrow is-striped'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Category</th>
          <th>Time</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        ${makeWRTemplate(runs)}
      </tbody>
    </table>
    `;

    return template;
  }

  function makeWRTemplate(data){
    let newList = '';

    data.forEach(function(object){
      var playerName = "";
      if(object.players.data[0].names){
        playerName = object.players.data[0].names.international;
      }
      else {
        playerName = object.players.data[0].name;
      }

      newList += `
      <tr>
        <td>${playerName}</td>
        <td>${object.date}</td>
        <td>${object.category.data.name}</td>
        <td>${fancyTimeFormat(object.times.realtime_t)}</td>
        <td><a href="https://www.speedrun.com/${object.game}/run/${object.id}">Link</a></td>
      <tr/>`
    });
    return newList;
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
