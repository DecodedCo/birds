$(function(){
	"use strict";

	$('#tweet1').click(function(){
		console.log('clicked');
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
	console.log('now!')
	$.ajax({
	    url: "https://api.twitter.com/1/statuses/oembed.json?id="+tweetID,
	            dataType: "jsonp",
	            success: function(data){
	            	console.log(data)

	            	var tweetContent = data.html.replace("<script async src=\"//platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>","")

	            	$('.twitterdiv').hide();
	            	$('.twitterdiv').prepend(tweetContent);
	            	twttr.widgets.load();
	            	var element = $('.twitterdiv');
	            	positionRandomly(element);
	                
	            }
	        });						
}

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
	var random = Math.floor((Math.random()*10)+1);
	var outerEdge = $(window).outerWidth();
	var ifWidth = $(element).width();
	var range = outerEdge - ifWidth;
	var left = range / random;
	var top = random*20;

	var topBottom = ["top","bottom"];
	topBottom = topBottom[Math.floor(Math.random() * topBottom.length)];
	topBottom = String(topBottom);
	console.log(topBottom);
	$(element).css({
		"top": top + 'px',
		"left": left + 'px'
	})
	$(element).fadeIn();
}