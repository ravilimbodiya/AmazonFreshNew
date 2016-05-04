var mysql = require("./mysql");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Amazonfresh";
var hash = require('./encryption').hash;

exports.createCustomer = function(msg, callback){
	
	var query1="select email, customer_id from customers where email = ? AND customer_id = ?";
	var json_responses1;
	console.log("Query is:"+query1);
	
	mysql.fetchData(function(err1,results1){
		if(err1){
			console.log("ERROR: "+err1);
			json_responses1 = {"statusCode" : 401};
			callback(null, json_responses1);
		}
		else 
		{
			if(results1.length > 0){
				json_responses1 = {"statusCode" : 402, "msg": "The account is already exist. Please try to Login."};
				callback(null, json_responses1);
			}
			else {    
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
			}
		}  
	}, query1, [msg.email, msg.ssn]);
	
	
	
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

exports.editprofileCustomer = function(msg, callback){

	console.log('reached edit farmer');
	var updateprofilequery = "UPDATE customers SET first_name='"+msg.lastname+"', last_name='"+msg.firstname+"', city='"+msg.city+"', state='"+msg.state+"', zipcode='"+msg.zipcode+"', contact='"+msg.contact+"' where far_id='"+msg.customerId+"'";
	var json_responses;
	console.log("Query is:"+query);
	console.log(msg.city);
	mysql.fetchData(function(err,results){
		if(err){
			console.log("ERROR: "+err);
			json_responses = {"statusCode" : 401};
			callback(null, json_responses);
		}
		else
		{

			/*	var rows = results;
			 var jsonString = JSON.stringify(results);
			 var jsonParse = JSON.parse(jsonString);*/
			console.log('reached else');
			json_responses = {"statusCode" : 200};
			//console.log(jsonParse);
			callback(null, json_responses);

		}
	}, updateprofilequery, []);


};

exports.viewCustomerProfile = function(msg, callback){

	console.log('reached view customer');
	var q = "select cust_id, customer_id, first_name, last_name, address, city, address, zipcode, email, contact, approved from customers where customer_id = ?";
	var json_responses;
	console.log("Query is:"+q);
	mysql.fetchData(function(err,results){
		if(err){
			console.log("ERROR: "+err);
			json_responses = {"statusCode" : 401};
			callback(null, json_responses);
		}
		else
		{

			var jsonString = JSON.stringify(results);
			var jsonParse = JSON.parse(jsonString);
			console.log('reached else');
			json_responses = {"statusCode" : 200, user: jsonParse};
			//console.log(jsonParse);
			callback(null, json_responses);

		}
	}, q, [msg.cust_id]);


};