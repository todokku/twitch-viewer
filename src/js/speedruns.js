var speedruns = (function () {
  var view = [];

  function init() {
    cacheDom();
    bindEvents();
    getPageData("");
  };

  function getPageData(streamParams){
    fetchSpeedrunStreams(streamParams)
    .then(function(response){
      view = response;
      return getGames();
    })
    .then(function(response){
      games = response.data;
      mapGamesToStreams(games);
      renderStreams();
    })
    .fail(x => alert("error"));
  }

  function cacheDom() {
    $backButton = $("#back-button");
    $nextButton = $("#next-button");
  };

  function bindEvents(){
    $nextButton.on("click", handleNextButtonClick);
    $backButton.on("click", handleBackButtonClick);
  };

  function handleBackButtonClick(){
    var cursor = view.pagination.cursor;
    var params = `&before=${cursor}`;
    getPageData(params);
  }

  function handleNextButtonClick(){
    var cursor = view.pagination.cursor;
    var params = `&after=${cursor}`;
    getPageData(params);
  }

  function fetchSpeedrunStreams(additionalParams) {
    var url = `${API_BASE_URL}/streams?community_id=6e940c4a-c42f-47d2-af83-0a2c7e47c421`
      + additionalParams;

    return $.ajax({
      url: url,
    })
  };

  function getGames() {
    var games = view.data.map(x => x.game_id);
    var game_ids = games.join("&id=");
    var url = `${API_BASE_URL}/games?id=${game_ids}`;

    return $.ajax({
      url: url,
    });
  }

  function mapGamesToStreams(games){
    games.forEach(x => {
      var streams = view.data.filter(obj => {
        return obj.game_id == x.id;
      })
      console.log(streams);

      streams.forEach(y => y.game_name = x.name);
    });
  }

  function renderStreams() {
    var template = `
    <table class='table is-narrow is-striped'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Game</th>
          <th>Title</th>
          <th>Viewers</th>
        </tr>
      </thead>
      <tbody>
        ${makeTemplate(view.data)}
      </tbody>
    </table>
    `;

    $("#target").html(template);
  };

  function makeTemplate(data){
    let baseUrl = "https://www.twitch.tv/"
    let newList = '';
    data.forEach(function(object){
      newList += `<tr>
                  <td>
                    <a href="${baseUrl + object.user_name}">
                      ${object.user_name}
                    </a>
                  </td>
                  <td>${object.game_name}</td>
                  <td>${object.title}</td>
                  <td>${object.viewer_count}</td>
                  </tr>`
    });
    return newList;
  }

  return {
    init: init
  }
})()

speedruns.init();
