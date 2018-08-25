require("dotenv").config();
var fs = require('fs');

var moment = require('moment');
var request = require('request');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var command= process.argv[2];
var commandName = process.argv[3];
if(!command)return;
for(var i=4;i<process.argv.length; i++)
  {
    commandName+="+"+process.argv[i];
    // console.log(commandName)
  }
  

if(command=="spotify-this-song")
    SpotifyThis();
if(command=="movie-this")
  MovieThis();
if(command=="concert-this")
  ConcertThis();
if(command=="do-what-it-says")
  doWhatItSays();  
function SpotifyThis()
{
  var spotify = new Spotify(keys.spotify);
    var song = commandName;
   if(!song)
   {
    //    console.log(12345);
       song ="the+sign";
       artist="ace+of+base"
    //    console.log
    spotify.search({ type: 'track', query: song, type: 'artist', query: artist }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      //  console.log(data)
      var songs = data.tracks.items;
      
        // songs.forEach(song =>
        for (var i=0;i,songs.length;i++)   
          {
            if(i>0)return;
          console.log(" * Artist(s): "+songs[i].artists[0].name) 
          console.log(" * The song's name: "+songs[i].name)
          console.log(" * A preview link of the song from Spotify: "+songs[i].href)
    
          console.log(" * The album that the song is from: "+songs[i].album.name)
          console.log('----------------^^^^^^^^^^^^^^^^^^^----------------')
        }
      });
   }
  else{
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      //  console.log(data)
      var songs = data.tracks.items;
      
      for (var i=0;i,songs.length;i++)   
      {
        if(i>0)return;
      console.log(" * Artist(s): "+songs[i].artists[0].name) 
      console.log(" * The song's name: "+songs[i].name)
      console.log(" * A preview link of the song from Spotify: "+songs[i].href)

      console.log(" * The album that the song is from: "+songs[i].album.name)
      console.log('----------------^^^^^^^^^^^^^^^^^^^----------------')
    }
      });
  }
}
function MovieThis()
{
    var title= commandName;
    if(!title)title="blade+runner"
  // Then run a request to the OMDB API with the movie specified
  request(`http://www.omdbapi.com/?t=${title}&y=&plot=short&tomatoes=true&apikey=trilogy`, function(error, response, body) {

    if (!error && response.statusCode === 200) {
      // console.log(body);
      console.log(`* Title of the movie: ${JSON.parse(body).Title}
      * Year the movie came out: ${JSON.parse(body).Year}
      * IMDB Rating of the movie: ${JSON.parse(body).imdbRating}
      * Rotten Tomatoes Rating of the movie: ${JSON.parse(body).Ratings[1].Value}
      * Country where the movie was produced: ${JSON.parse(body).Country}
      * Language of the movie: ${JSON.parse(body).Language}
      * Plot of the movie: ${JSON.parse(body).Plot}
      * Actors in the movie: ${JSON.parse(body).Actors}`);
      console.log('----------------^^^^^^^^^^^^^^^^^^^^^^^^^^----------------')
    }
  });

}

function ConcertThis()
{
  
  // var bandsintown = require('bandsintown')(codingbootcamp);
    var artist= commandName;
    if(!artist)artist="vnv+nation"

    request(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`, function(error, response, body) {

      if (!error && response.statusCode === 200) {
        var bandArray = JSON.parse(body)
        if(bandArray.length<1)
        {
          console.log("No results found");
        }
        // console.log(body)
        // bandArray.forEach(function(event){
          for(var i=0;i<bandArray.length; i++){
            if(i>1)return;//sometimes I don't want to look a gazillion results when I'm working
            var dateTime = new Date(bandArray[i].datetime);
            dateTime = moment(dateTime).format("MM/DD/YYYY"); 
            var StateOrCountry = bandArray[i].venue.region;
            if(StateOrCountry=="")StateOrCountry = bandArray[i].venue.country;
          console.log
        (`-------------vvvvvvvvvvvvvvvvvvvvvvvv--------------      
          * Name of the venue: ${bandArray[i].venue.name}

          * Venue location: ${bandArray[i].venue.city+", "+StateOrCountry}
     
          * Date of the Event: ${dateTime}`)
         console.log("-------------^^^^^^^^^^^^^^^^^^--------------")
        }
    }
  });

}

function doWhatItSays(){
  fs.readFile('random.txt', 'utf8', function(err, data){
      data = data.split(',');
      console.log(data[1]);
      commandName=data[1];
      SpotifyThis();
  })
}

