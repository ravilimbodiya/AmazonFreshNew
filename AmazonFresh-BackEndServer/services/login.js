var hash = require('./encryption').hash;
var mysql = require('./mysql');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Amazonfresh";

//Check login - called when '/checklogin' POST call given from AngularJS module in login.ejs
exports.checkLogin = function(msg, callback) {
		var json_responses;
		if (!module.parent)
			console.log('authenticating %s:%s', msg.email, msg.password);

		var getUser;
		if(msg.userType === 'customer'){
			getUser = "select * from customers where email=?";
		} else if(msg.userType === 'farmer'){
			getUser = "select * from farmers where email=?";
		}
		console.log("Query is:"+getUser);
		
		mysql.fetchData(function(err,results){
			if(err){
				console.log("ERROR: "+err);
				json_responses = {"statusCode" : 401};
				callback(null, json_responses);
			}
			else 
			{
				if(results.length > 0){
					var rows = results;
					var jsonString = JSON.stringify(results);
					var jsonParse = JSON.parse(jsonString);
					// apply the same algorithm to the POSTed password, applying                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
					  // the hash against the pass / salt, if there is a match we                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
					  // found the user                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
					  hash(pass, rows[0].salt, function(err, hash){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
					    if (err) {
					    	console.log("ERROR: "+err);
					    	json_responses = {"statusCode" : 401};
					    	callback(null, json_responses);
					    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
					    if (hash.toString() == rows[0].hash){
						   
						        	//console.log(result);
						        	console.log(jsonParse);
						        	req.session.user = jsonParse;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
					                req.session.success = 'Authenticated as ' + jsonParse.firstName                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
					                  + ' click to <a href="/logout">logout</a>.';  
					                res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
					                json_responses = {"statusCode" : 200, "userObj" : jsonParse};
					                callback(null, json_responses);
						            
					    } else {
					    	req.session.error = 'Authentication failed';
					    	//res.render('login', { title: 'Twitter' , alertClass: 'alert-danger', msg: 'Email/Password combination is Invalid.'});
					    	json_responses = {"statusCode" : 401, "msg" : "Email/Password combination is Invalid."};
					    	callback(null, json_responses);
					    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
					                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
					  });
				}
				else {    
					console.log("Invalid Login");
					//res.render('login', { title: 'Twitter' , alertClass: 'alert-danger', msg: 'The email and password you entered did not match our records. Please double-check and try again.'});
					json_responses = {"statusCode" : 401, "msg" : "The email and password you entered did not match our records. Please double-check and try again."};
					callback(null, json_responses);
				}
			}  
		}, getUser, [msg.email]);
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