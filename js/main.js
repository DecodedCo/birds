$(function(){
	"use strict";

	$('#tweet1').click(function(){
		$('.video-stream').css({
			'top': 'auto',
			'left': 'auto'
		}).animate({
			'width': 864,
			'height': 512,
			'bottom': '0px',
			'right': '0px'
		})
	})

	var fullScreenVideo = function(element){
		$(element).animate({
			'width': '100%',
			'height': '100%'
		})
	}

	$('#video').click(function(){
		fullScreenVideo('.video-stream');
	});

	resizeLayout();

	searchRecentTweets();
})

$(window).resize(function(){
	resizeLayout();
})


function resizeLayout() {
	var windowWidth = $('body').innerWidth();
	//var remainingWidth = windowWidth - $('#meta-container').outerWidth();
	//$('#video-container').css('width',remainingWidth);
}

function displayTweet(tweetID) {
	$.ajax({
	    url: "https://api.twitter.com/1/statuses/oembed.json?id="+tweetID,
	            dataType: "jsonp",
	            success: function(data){

	            	var tweetContent = data.html.replace("<script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>","")

	            	$('.twitterdiv').hide();
	            	$('.twitterdiv').prepend(tweetContent);
	            	twttr.widgets.load();
	            	var element = $('.twitterdiv');
	            	positionRandomly(element);

	            }
	        });
}


function displayRecentTweet(tweetID) {
	$.ajax({
	    url: "https://api.twitter.com/1/statuses/oembed.json?id="+tweetID,
	            dataType: "jsonp",
	            success: function(data){


	            	var randomNumber = Math.floor(Math.random() * 50000) + 2000;


	            	var tweetContent = data.html.replace("<script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>","")

	            	var div = $('<div class="recenttwitterdiv">')
	            	$('#wrapper').append(div);

	            	div.prepend(tweetContent);
	            	twttr.widgets.load();
	            	positionRandomly(div);

	            	setTimeout(function(){
	            		div.remove();
	            	}, randomNumber)

	            }
	        });
}


function searchRecentTweets() {


	$.ajax({
	    url: "/nodejs/data.json",
	    dataType: "json",
      success: function(data){


      	var firstTenTweets = _.filter(data, function(item,iterator){
      		if (iterator < 10) {
      			return item;
      		}
      	})

      	var remainderTweets = _.filter(data, function(item,iterator){
      		if (iterator > 10) {
      			return item;
      		}
      	})

      	// for each item in firstTen, one straight away
      	// then randomly popping up over 3 minutes

      	for(var i=0; i < firstTenTweets.length; i++) {
      	    (function(i) {
      	        setTimeout(function() {
      	            displayRecentTweet(firstTenTweets[i]);
      	        }, 4000 * i); // <-- You need to multiply by i here.
      	    })(i);
      	}



      	// for the rest, randomly spaced throughout entire length

      }, // End on success
      error: function(message) {
      	console.log(message);
      }
  });


} // end searchRecentTweets

function removeTweet() {
	$('.twitterdiv').html('');
}

function addIframe(url, title, id){
	$('#wrapper').prepend('<div class="external-website" id="'+id+'"><h3><a href="'+url+'" target="new">'+ title +'</a></h3><iframe src="'+url+'"></iframe>');
	var element = $('.external-website');
	positionRandomly(element);
}
function removeIframe(id) {
	$('div#'+id).remove();
}


function addYoutube(id) {
	$('.youtube-wrapper').hide();
	$('.youtube-wrapper').prepend('<iframe src="http://www.youtube.com/embed/'+ id +'?autoplay=1" frameborder="0" allowfullscreen autoplay></iframe>');
	var element = $('.youtube-wrapper');
	positionRandomly(element);
}

function removeYoutube(){
	$('.youtube-wrapper').fadeOut().html("");
}

function positionRandomly(element) {
	setTimeout(function(){
		var random = Math.floor((Math.random()*10)+1);
		var outerEdge = $(window).outerWidth();
		var windowHeight = $(window).height();

		var ifWidth = $(element).width();
		var ifHeight = $(element).height();
		var heightRange = windowHeight - ifHeight;

		var range = outerEdge - ifWidth;

		var left = Math.floor((Math.random()*range)+1);
		var top = Math.floor((Math.random()*heightRange)+1);
		console.log(top);
		var topBottom = ["top","bottom"];
		topBottom = topBottom[Math.floor(Math.random() * topBottom.length)];
		topBottom = String(topBottom);
		$(element).css({
			"top": top + 'px',
			"left": left + 'px'
		})
		$(element).fadeIn();
	},500);

}