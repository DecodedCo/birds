var Twitter = require('mtwitter');
var fs = require('fs');
var embedTweets = {};

var twitter = new Twitter({
  consumer_key: '05iXWPDYAWVlFGHeYRwtA',
  consumer_secret: 'alcd7nesaL1L1HxwcrYvCdK3CK5YH8fJjm1nQOjU',
  access_token_key: '18974419-FBAapWG8GBl7jDsScrc7QETX3id1aqlLSt2BKyvAz',
  access_token_secret: 'gZNpAdl2d4RbnqwxhXoEBRwjSclq2uOEP2cYhI13MKI'
});

var jsonObject = {};










function getTweets() {
    twitter.get('search/tweets',{q: '#birds2013'}, function(err, data) {


        for (var i in data.statuses) {
            console.log(data.statuses[i]);
            var twitterID = data.statuses[i].id_str;
            jsonObject[i] = twitterID;
        }
        var newData = JSON.stringify(jsonObject);
        fs.writeFile('./data.json', newData, function(error){
            if (error) { console.log(error) }
            else { console.log('The file was saved') }
        });
    });

}

getTweets();


setInterval(function() {

    getTweets();


}, 7200000);





