import fetch from 'node-fetch';
require('dotenv').config();

const {
  TWITCH_CLIENT_ID
} = process.env;

const getApiUrl = (user_query_string) => {
  var args = [].splice.call(user_query_string,0);
  let users = args.join("&user_login=");
  let url = `https://api.twitch.tv/helix/streams?user_login=${users}`;

  return url;
};

exports.handler = async (event) => {
  // We can retrive type of http method in event parameter
  const { httpMethod } = event;

  if (httpMethod === 'GET') {
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

  return { statusCode: 404 };
}
