import fetch from 'node-fetch';
require('dotenv').config();

const {
  TWITCH_CLIENT_ID
} = process.env;

const getApiUrl = (user_login) => {
  //netlify in production doesn't auto-parse parameters
  console.log(user_login);
  if(typeof(user_login) == "string"){
    user_login =
      user_login
      .split(',')
      .map(x =>
        x.trim()
      );
    console.log(user_login);
  }

  let users = user_login.join("&user_login=");
  let url = `https://api.twitch.tv/helix/streams?user_login=${users}`;

  return url;
};

exports.handler = async (event, context) => {
  const user_login = event.queryStringParameters.user_login;

  const apiUrl = getApiUrl(user_login);

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
