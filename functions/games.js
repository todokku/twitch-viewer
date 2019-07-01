import fetch from 'node-fetch';
require('dotenv').config();

const {
  TWITCH_CLIENT_ID
} = process.env;

const getApiUrl = (ids) => {
  //netlify in production doesn't auto-parse parameters
  if(typeof(ids) == "string"){
    ids = ids.split(',').map(x => x.trim());
  }

  let game_ids = ids.join("&id=");
  let url = `https://api.twitch.tv/helix/games?id=${game_ids}`;

  return url;

};

exports.handler = async (event, context) => {
  const ids = event.queryStringParameters.id;

  const apiUrl = getApiUrl(ids);

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
