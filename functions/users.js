import fetch from 'node-fetch';
require('dotenv').config();

const {
  TWITCH_CLIENT_ID
} = process.env;

const getApiUrl = (login, id) => {
  if(login){
    return `https://api.twitch.tv/helix/users?login=${login}`;
  }
  else {
    return `https://api.twitch.tv/helix/users?id=${id}`;
  }
};

exports.handler = async (event) => {
  // We can retrive type of http method in event parameter
  const { httpMethod } = event;

  if (httpMethod === 'GET') {
    const login = event.queryStringParameters.name;
    const id = event.queryStringParameters.id;
    const apiUrl = getApiUrl(login, id);

    const response = await fetch(
      apiUrl,
      {
        headers: {
          'content-type': 'application/json',
          'Client-ID': 'y7uxb2z0n44qqypemc79gaw0w35w0i'
        }
      }
    )
    const userData = await response.text();
    return { statusCode: 200, body: userData };
  }

  return { statusCode: 404 };
}
