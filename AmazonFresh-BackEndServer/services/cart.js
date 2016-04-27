var mysql = require("./mysql");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Amazonfresh";

exports.addToCart = function(msg, callback){
	mongo.connect(mongoURL, function() {
		var json_responses;
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('shopping_cart');
		console.log("Product adding to cart: "+msg.product.name);
		var params = {product: msg.product, quantity: msg.quantity};
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
};