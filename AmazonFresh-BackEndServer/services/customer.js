var mysql = require("./mysql");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Amazonfresh";
var hash = require('./encryption').hash;

exports.createCustomer = function(msg, callback){
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
	var query="insert into customers (customer_id, first_name, last_name, address, city, state, zipcode, email, cc_no, cc_name, cc_expiry, cvv, hash, salt) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
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

exports.deleteCustomer = function(msg, callback){
	var query="delete from customers where cust_id = ?";
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
			if(results.length > 0){
				var rows = results;
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				json_responses = {"statusCode" : 200, result: jsonParse};
				//console.log(jsonParse);
				callback(null, json_responses);
			}
			else {    
				console.log('Error occurred in deleting customer.');
				json_responses = {"statusCode" : 401};
				callback(null, json_responses);
			}
		}  
	}, query, [msg.custId]);
};

exports.getAllCustomers = function(msg, callback){
	var query="select * from customers";
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
			if(results.length > 0){
				var rows = results;
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				json_responses = {"statusCode" : 200, result: jsonParse};
				//console.log(jsonParse);
				callback(null, json_responses);
			}
			else {    
				console.log('Error occurred in getting all customers.');
				json_responses = {"statusCode" : 401};
				callback(null, json_responses);
			}
		}  
	}, query);
};

exports.generateBill = function(msg, callback){
	
};

exports.selectDeliveryDateTime = function(msg, callback){
	
};

exports.postReviewRating = function(msg, callback){
	mongo.connect(mongoURL, function() {
		var json_responses;
		var coll = mongo.collection('reviewrating');
		var jsonParams = {"cust_id" : msg.custId, "product_id" : msg.productId, "review" : msg.review, "rating": msg.rating};
		coll.insert(jsonParams, function(err,results){
			if(err){
				console.log("ERROR: "+err);
				json_responses = {"statusCode" : 401};
				callback(null, json_responses);
			}
			else 
			{
				json_responses = {"statusCode" : 200};
				callback(null, json_responses);
			}  
		});
	});
	
};
