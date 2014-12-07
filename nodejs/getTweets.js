var Twitter = require('mtwitter');
var fs = require('fs');
var embedTweets = {};

var twitter = new Twitter({
  consumer_key: '05iXWPDYAWVlFGHeYRwtA',
  consumer_secret: 'alcd7nesaL1L1HxwcrYvCdK3CK5YH8fJjm1nQOjU',
  access_token_key: '18974419-FBAapWG8GBl7jDsScrc7QETX3id1aqlLSt2BKyvAz',
  access_token_secret: 'gZNpAdl2d4RbnqwxhXoEBRwjSclq2uOEP2cYhI13MKI'
});

var jsonArray = [];
var jsonObject = {}


var latestTweetId = ''




function getTweets() {
    twitter.get('search/tweets',{q: '#birds2013', count: 100}, function(err, data) {

        if (data) {

          for (var i in data.statuses) {
              var twitterID = data.statuses[i].id_str;
              jsonArray[i] = twitterID;
          }
          jsonArray.reverse();
          for (var i=0; i<jsonArray.length;i++) {
            jsonObject[i] = jsonArray[i]

          }

          latestTweetId = jsonArray[jsonArray.length-1]
          // latestTweetId = '541377423464747008'
          // console.log(latestTweetId)

          var newData = JSON.stringify(jsonObject);

          fs.writeFile('./data.json', newData, function(error){
              if (error) {    }
          });
        } else {
        }
    });

}

getTweets();


setInterval(function() {

    getTweets();



}, 180000);

setInterval(function(){
  getBrandNewTweets();
}, 40000)



var newTweetsObject = {};

function getBrandNewTweets() {

    // runs every 25 seconds, gets latestTweetId from the last one in the main poller or
    // from the most recent one its found
    twitter.get('search/tweets',{q: '#birds2013', count: 1, since_id:latestTweetId}, function(err, data) {

        if (data) {
          for (var i in data.statuses) {
              var twitterID = data.statuses[i].id_str;
              newTweetsObject[i] = twitterID;
          }

          latestTweetId = newTweetsObject[0]

          var newData = JSON.stringify(newTweetsObject);

          fs.writeFile('./new-data.json', newData, function(error){
              if (error) {    }
          });
        } else {
        }
    });

}





