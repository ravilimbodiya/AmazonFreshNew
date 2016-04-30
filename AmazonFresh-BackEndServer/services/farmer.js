var mysql = require("./mysql");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Amazonfresh";
var hash = require('./encryption').hash;

exports.createFarmer = function(msg, callback){
	// when you create a user, generate a salt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
	// and hash the password                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
	var saltGen;
	var hashGen;
	hash(msg.password, function(err, salt, hash){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
	  if (err) {
		  throw err;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
	  }
	  // store the salt & hash in the "db"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	  saltGen = salt; 
	  console.log('salt: '+salt);
	  hashGen = hash.toString(); 
	  console.log('hash: '+hash);
	
	
	// insert user into db
	var query="insert into farmers (farmer_id, first_name, last_name, address, city, state, zipcode, email, cc_no, cc_name, cc_expiry, cvv, hash, salt) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	var json_responses;
	console.log("Query is:"+query);
	
	mysql.fetchData(function(err,results){
		if(err){
			console.log("ERROR: "+err);
			json_responses = {"statusCode" : 401};
			callback(null, json_responses);
		}
		else 
		{
				var rows = results;
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				json_responses = {"statusCode" : 200, result: jsonParse};
				//console.log(jsonParse);
				callback(null, json_responses);
			
		}  
	}, query, [msg.ssn, msg.firstName, msg.lastName, msg.address, msg.city, msg.state, msg.zipcode, msg.email, msg.cc_no, msg.cc_name, msg.cc_expiry, msg.cvv, hashGen, saltGen]);
	
	}); 
};