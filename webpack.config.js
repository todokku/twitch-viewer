require("dotenv").config();

const webpack = require("webpack");
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    users: "./js/users.js"
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './src/js'),
   },
  plugins: [
    new webpack.DefinePlugin({
      TWITCH_CLIENT_ID: JSON.stringify(process.env.TWITCH_CLIENT_ID),
      API_BASE_URL: JSON.stringify(process.env.API_BASE_URL)
    })
  ]
};