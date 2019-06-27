var speedruns = (function () {
  var view = [];

  function init() {
    cacheDom();
    bindEvents();
    fetchSpeedrunStreams("");
  };

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
    fetchSpeedrunStreams(params);
  }

  function handleNextButtonClick(){
    var cursor = view.pagination.cursor;
    var params = `&after=${cursor}`;
    fetchSpeedrunStreams(params);
  }

  function fetchSpeedrunStreams(additionalParams) {
    var url = `${API_BASE_URL}/streams?community_id=6e940c4a-c42f-47d2-af83-0a2c7e47c421`
      + additionalParams;

    $.ajax({
      url: url,
    })
    .done(function(response) {
      view = response;
      renderStreams();
    })
    .fail(function() {
      alert( "error" );
    });
  };

  function renderStreams() {
    var template = `
    <table class='table is-narrow is-striped'>
      <thead>
        <tr>
          <th>Name</th>
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
