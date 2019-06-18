var users = (function () {
  var user = {};

  function init() {
    cacheDom();
    bindEvents();
  };

  function cacheDom() {
    $searchForm = $("#form");
    $usernameInput = $("#usernameInput");
  };

  function bindEvents(){
    $searchForm.on("submit", handleSearchFormSubmit);
  };

  function handleSearchFormSubmit(evt){
    evt.preventDefault();
    var login = $usernameInput.val();
    fetchUserData(login);
  }

  function fetchUserData(login) {
    var url = `https://api.twitch.tv/helix/users?login=${login}`;
    $.ajax({
      url: url,
      headers: { "Client-ID": "y7uxb2z0n44qqypemc79gaw0w35w0i" }
    })
    .done(function(response) {
      user = response.data[0];
      render();
    })
    .fail(function() {
      alert( "error" );
    });
  };

  function render() {
    var template = `
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="${user.profile_image_url}" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">${user.display_name}</p>
            </div>
          </div>

          <div class="content">
            <table>
              <tbody>
                <tr>
                  <td class="has-text-weight-bold">ID</td>
                  <td>${user.id}</td>
                </tr>
                <tr>
                  <td class="has-text-weight-bold">View Count</td>
                  <td>${user.view_count}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    $("#target").html(template);
  };

  return {
    init: init
  }
})()
