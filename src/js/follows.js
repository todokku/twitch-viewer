var follows = (function () {
  var followed_channels = [];
  var live_streams = [];
  var followed_count = 0;
  var user_id;
  var $searchForm;
  var $userIdInput;
  var $liveCheckBoxes;

  function init() {
    cacheDom();
    bindEvents();
  };

  function cacheDom() {
    $searchForm = $("#form");
    $userIdInput = $("#user-id-input");
  };

  function bindEvents(){
    $searchForm.on("submit", handleSearchFormSubmit);
  };

  function handleSearchFormSubmit(evt){
    evt.preventDefault();
    resetData();
    user_id = $userIdInput.val();
    fetchFollowedChannels(user_id, "");
  }

  function resetData(){
    followed_channels = [];
    live_streams = [];
    followed_count = 0;
    user_id = 0;
  }

  function fetchFollowedChannels(id, after) {
    var url = `${API_BASE_URL}/follows?from_id=${id}`;

    if(after) {
      url += `&after=${after}`;
    }

    $.ajax({
      url: url,
    })
    .done(function(response) {
      followed_channels = [...followed_channels, ...response.data];

      if(response.data.length == 20) {
        var pagination_cursor = response.pagination.cursor;
        fetchFollowedChannels(id, pagination_cursor);
      }
      else {
        fetchLiveStreams();
      }

    })
    .fail(function(response) {
      console.log(response);
      alert( "error" );
    });
  };

  function fetchLiveStreams(){
    var user_logins = followed_channels.map(x => x.to_name);
    var user_query_string = user_logins.join("&user_login=");
    var url = `${API_BASE_URL}/streams?user_login=${user_query_string}`;

    $.ajax({
      url: url
    })
    .done(function(response) {
      console.log(response);
      // if(typeof(response) == "string"){
      //   response = JSON.parse(response);
      // }

      live_streams = response.data;

      renderLive();
      cacheLiveDom();
      bindLiveEvents();
    })
    .fail(function(response) {
      console.log(response);
      alert( "error" );
    });
  }

  function cacheLiveDom(){
    $liveCheckBoxes = $(".live-stream-checkbox");
    $createLinksButton = $("#createLinksButton");
    $multiTwitchLink = $("#multiTwitchLink");
  }

  function bindLiveEvents() {
    $createLinksButton.on("click", handleCreateLinksButtonClick);
  }

  function handleCreateLinksButtonClick(evt){
    var selectedChannels = getSelectedChannels();
    var multiTwitchLink = `http://www.multitwitch.tv/${selectedChannels.join('/')}`;
    $multiTwitchLink.attr('href', multiTwitchLink);

    renderChatLinks();
  }

  function getSelectedChannels()
  {
    var selectedCheckboxes =
      $liveCheckBoxes
      .filter(function(i, el){
        return el.checked
      });

    var selectedCheckBoxArray =
      $.makeArray(selectedCheckboxes);

    var selectedChannels =
      selectedCheckBoxArray
      .map(x => x.value);

    return selectedChannels;
  }

  function renderFollowed() {
    var template = `
    <table class='table is-narrow is-striped'>
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        ${makeFollowedTemplate(followed_channels)}
      </tbody>
    </table>
    `;

    $("#followed-target").html(template);
  };

  function makeFollowedTemplate(data){
    let baseUrl = "https://www.twitch.tv/"
    let newList = '';
    data.forEach(function(object){
      newList += `<tr>
                  <td>
                    <a href="${baseUrl + object.to_name}">
                      ${object.to_name}
                    </a>
                  </td>
                  <td>${object.to_id}</td>
                  </tr>`
    });
    return newList;
  }

  function renderLive() {
    var template = `
    <h2 class="title is-4">Live Streams</h2>
    <table class='table is-narrow is-striped'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Viewers</th>
          <th>Add to List</th>
        </tr>
      </thead>
      <tbody>
        ${makeLiveTemplate(live_streams)}
      </tbody>
    </table>

    <div class="field">
      <div class="control">
        <button class="button is-link" id="createLinksButton">Create Links</button>
      </div>
    </div>

    <div class="field">
      <label class="label">MultiTwitch</label>
      <div class="control">
        <a id="multiTwitchLink">MultiTwitch Link</a>
      </div>
    </div>
    `;

    $("#live-target").html(template);
  };

  function makeLiveTemplate(data){
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
                  <td>
                  <label class="checkbox">
                    <input
                      type="checkbox"
                      class="live-stream-checkbox"
                      value="${object.user_name}"
                    >
                  </label>
                  </td>
                  </tr>`
    });
    return newList;
  }

  function renderChatLinks(){
    var template = `
      <div class="field">
        <label class="label">Chat Links</label>
        <div class="control">
          ${makeChatLinksTemplate(getSelectedChannels())}
        </div>
      </div>
    `;

    $("#live-chat-links").html(template);
  }

  function makeChatLinksTemplate(data){
    console.log(data);
    let newList = '';
    data.forEach(function(name){
      newList += `
      <div class="field is-grouped">
        <a
          href="https://www.twitch.tv/popout/${name}/chat?darkpopout"
        >
          ${name}
        </a>
      </div>
      `
    });
    return newList;
  }

  return {
    init: init
  }
})()

follows.init();