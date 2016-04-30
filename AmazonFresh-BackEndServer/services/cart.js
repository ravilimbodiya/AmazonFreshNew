var mysql = require("./mysql");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Amazonfresh";

exports.addToCart = function(msg, callback){
	var query="select far_id, farmer_id, first_name, last_name, address, city, state, zipcode, email, approved from farmers where farmer_id = ?";
	console.log("Query is:"+query);
	var json_responses;
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
				mongo.connect(mongoURL, function() {
					
					console.log('Connected to mongo at: ' + mongoURL);
					var coll = mongo.collection('shopping_cart');
					console.log("Product adding to cart: "+msg.product.name);
					var params = {product: msg.product, quantity: msg.quantity, farmer: jsonParse[0]};
					coll.update({cust_id: msg.cust_id}, {$push : {items : params}}, {upsert: true}, function(err1, result) {
						  if(err1){
								json_responses = { statusCode: 401 };
								callback(null, json_responses);
							}
							else 
							{
								coll.findOne({cust_id: msg.cust_id}, function(err2, cart1) {
									if(err2){
										json_responses = {"statusCode" : 401};
										callback(null, json_responses);
									}
									else 
									{
										json_responses = {"statusCode" : 200, shoppingCart: cart1 };
										console.log(json_responses);
										callback(null, json_responses);
									}
								});
							}
					});
			  });
			}
			else {    
				console.log('Error occurred in getting farmer of this product.');
				json_responses = {"statusCode" : 401};
				callback(null, json_responses);
			}
		}  
	}, query, [msg.product.farmer_id]);
	
};

exports.removeItemFromCart = function(msg, callback){
	mongo.connect(mongoURL, function() {
		var json_responses;
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('shopping_cart');
		console.log("Product removing from cart: "+msg.product.name+" for cust_id: "+msg.cust_id);
		coll.update({cust_id: msg.cust_id}, {$pull : {items : msg.product}}, {upsert: true}, function(err1, result) {
			  if(err1){
					json_responses = { statusCode: 401 };
					callback(null, json_responses);
				}
				else 
				{
					coll.findOne({cust_id: msg.cust_id}, function(err2, cart1) {
						if(err2){
							json_responses = {"statusCode" : 401};
							callback(null, json_responses);
						}
						else 
						{
							json_responses = {"statusCode" : 200, shoppingCart: cart1 };
							console.log(json_responses);
							callback(null, json_responses);
						}
					});
				}
		});
  });
};