import fetch from 'node-fetch';
require('dotenv').config();

const {
  TWITCH_CLIENT_ID
} = process.env;

const getApiUrl = (user_login, community_id, before, after) => {
  if(user_login){
    //netlify in production doesn't auto-parse parameters
    if(typeof(user_login) == "string"){
      user_login =
        user_login.split(',').map(x => x.trim());
    }

    let users = user_login.join("&user_login=");
    let url = `https://api.twitch.tv/helix/streams?user_login=${users}`;

    return url;
  }
  else if(community_id){
    let url = `https://api.twitch.tv/helix/streams?community_id=${community_id}`;
    if(before){
      url += `&before=${before}`;
    }
    else if(after){
      url += `&after=${after}`;
    }
    return url;
  }
};

exports.handler = async (event, context) => {
  const user_login = event.queryStringParameters.user_login;
  const community_id = event.queryStringParameters.community_id;
  const before = event.queryStringParameters.before;
  const after = event.queryStringParameters.after;

  const apiUrl = getApiUrl(user_login, community_id, before, after);

  const response = await fetch(
    apiUrl,
    {
      headers: {
        'content-type': 'application/json',
        'Client-ID': TWITCH_CLIENT_ID
      }
    }
  )

 const userData = await response.text();

 return {
    statusCode: 200,
    body: userData,
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Headers": "Content-Type",
      'content-type': 'application/json'
    }
  };
}
