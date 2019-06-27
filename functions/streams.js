import fetch from 'node-fetch';
require('dotenv').config();

const {
  TWITCH_CLIENT_ID
} = process.env;

const getApiUrl = (user_query_string) => {
  let users = user_query_string.join("&user_login=");
  let url = `https://api.twitch.tv/helix/streams?user_login=${users}`;

  //let url = `https://api.twitch.tv/helix/streams?user_login=billbull`;

  return url;
};

exports.handler = async (event) => {
  // We can retrive type of http method in event parameter
  const { httpMethod } = event;

  if (httpMethod === 'GET') {
    const user_login = event.queryStringParameters.user_login;
    //const apiUrl = getApiUrl(user_login);

    // const response = await fetch(
    //   apiUrl,
    //   {
    //     headers: {
    //       'content-type': 'application/json',
    //       'Client-ID': TWITCH_CLIENT_ID
    //     }
    //   }
    // )
    //const userData = await response.text();

    const body = {
      data: user_login,
      type: typeof(user_login)
    };

    return {
      statusCode: 200,
      body: JSON.stringify(body),//userData,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Content-Type",
        'content-type': 'application/json'
      }
    };
  }

  return { statusCode: 404 };
}
