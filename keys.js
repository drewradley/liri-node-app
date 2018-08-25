console.log('this is loaded');
// var Spotify = require('node-spotify-api');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
// var spotify = new Spotify(keys.spotify);