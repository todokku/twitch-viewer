import fetch from 'node-fetch';
require('dotenv').config();

const {
  TWITCH_CLIENT_ID
} = process.env;

const getApiUrl = (from_id, pagination_cursor) => {
  var url = `https://api.twitch.tv/helix/users/follows?`;

  if(from_id){
    url += `from_id=${from_id}`;
  };

  if(pagination_cursor){
    url += `&after=${pagination_cursor}`;
  }

  return url;
};

exports.handler = async (event) => {
  // We can retrive type of http method in event parameter
  const { httpMethod } = event;

  if (httpMethod === 'GET') {
    const from_id = event.queryStringParameters.from_id;
    const pagination_cursor = event.queryStringParameters.pagination_cursor;
    const apiUrl = getApiUrl(from_id, pagination_cursor);
    console.log(apiUrl);

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
