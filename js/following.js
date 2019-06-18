var following = (function () {
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

  function fetchFollowedChannels(id, additionalParams) {
    var url = `https://api.twitch.tv/helix/users/follows?from_id=${id}${additionalParams}`;
    $.ajax({
      url: url,
      headers: { "Client-ID": "y7uxb2z0n44qqypemc79gaw0w35w0i" }
    })
    .done(function(response) {
      followed_channels = [...followed_channels, ...response.data];

      if(response.data.length == 20) {
        var pagination_cursor = response.pagination.cursor;
        var params = `&after=${pagination_cursor}`;
        fetchFollowedChannels(id, params);
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
    var url = `https://api.twitch.tv/helix/streams?user_login=${user_query_string}`;

    $.ajax({
      url: url,
      headers: { "Client-ID": "y7uxb2z0n44qqypemc79gaw0w35w0i" }
    })
    .done(function(response) {
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
    $multiTwitchButton = $("#createMultiTwitchLink");
    $multiTwitchLinkInput = $("#multiTwitchLink");
    $copyMultiTwitchLink = $("#copyMultiTwitchLink");
  }

  function bindLiveEvents() {
    $multiTwitchButton.on("click", handleMultiTwitchButtonClick);
    $copyMultiTwitchLink.on("click", copyMultiTwitchLink);
  }

  function handleMultiTwitchButtonClick(evt){
    var selectedChannels = getSelectedChannels();
    var multiTwitchLink = `http://www.multitwitch.tv/${selectedChannels.join('/')}`;
    $multiTwitchLinkInput.val(multiTwitchLink);
  }

  function copyMultiTwitchLink(){
    $multiTwitchLinkInput.select();
    document.execCommand("copy");
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

    <div class="field is-grouped">
    <div class="control">
      <button class="button is-link" id="createMultiTwitchLink">Create MultiTwitch Link</button>
    </div>
    <div class="control">
      <input type="text" class="input" id="multiTwitchLink"/>
    </div>
    <div class="control">
      <a href="#" id="copyMultiTwitchLink">Copy</a>
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

  return {
    init: init
  }
})()
