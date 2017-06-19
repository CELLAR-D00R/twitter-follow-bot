console.log('The follow bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

// Setting up a user stream
var stream = T.stream('user');

// Anytime someone follows me
stream.on('follow', followed);

var text = process.argv[2];

function followed(eventMsg) {
	var r = Math.floor(Math.random()*100);
	console.log("Follow event!");
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt('@' + screenName + ' ' + text + '#'+r);
}


function tweetIt(txt) {

	var tweet = {
		status: txt
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
		if (err) {
			console.log("Something went wrong!");
		} else {
			console.log("Tweeté");
		}
	}
}