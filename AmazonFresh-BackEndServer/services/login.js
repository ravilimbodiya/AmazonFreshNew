var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/twitterdb";

exports.checkLogin = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	var username = req.param("username");
	var password = req.param("password");
	console.log(password +" is the object");
	var json_responses;

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.findOne({username: username, password:password}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				req.session.username = user.username;
				console.log(req.session.username +" is the session");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});
};


function handle_request(msg, callback){

	var username = msg.username;
	var password = msg.password;
	//var res = {};
	console.log("In handle request:"+ msg.username);

	console.log("password:"+password);

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.findOne({username: username, password:password}, function(err, user){
			if (user) {
				// This way subsequent requests will know the user is logged in.
				//req.session.username = user.username;
				//console.log(req.session.username +" is the session");
				json_responses = {"statusCode" : 200};
				//res.send(json_responses);

			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
			}
		});
	});
	callback(null, json_responses);
}

exports.handle_request = handle_request;