var mysql = require("./mysql");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Amazonfresh";

exports.placeOrder = function(msg, callback){
	
	mongo.connect(mongoURL, function() {
		var json_responses;
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('orders');
		console.log("order creation ");
		var orderNum = Math.floor((Math.random() * 10000000000));
		var params = {	order_id: orderNum,
						cust_id: msg.customerObj.cust_id, 
						customer_id: msg.customerObj.customer_id, 
						customer_first_name: msg.customerObj.first_name, 
						customer_last_name: msg.customerObj.last_name, 
						customer_email: msg.customerObj.email,
						customer_address: msg.customerObj.address,
						customer_city: msg.customerObj.city,
						customer_state: msg.customerObj.state,
						customer_zipcode: msg.customerObj.zipcode,
						shoppingCart: msg.shoppingCartObj,
						amount: msg.amount,
						delivery_address: msg.deliveryAddress,
						delivery_zipcode:   msg.deliveryZipcode,
						delivery_date : msg.deliveryDate,
						delivery_time: msg.deliveryTime,
						payment_method:  msg.paymentMethod,
						card_number:  msg.cardNumber};
		
			coll.insert(params, function(err1, result) {
			  if(err1){
					json_responses = { statusCode: 401 };
					callback(null, json_responses);
				}
				else 
				{
					coll.findOne({order_id: orderNum}, function(err2, order) {
						if(err2){
							json_responses = {"statusCode" : 401};
							callback(null, json_responses);
						}
						else 
						{
							json_responses = {"statusCode" : 200, order: order, message: "Order placed successfully." };
							console.log(json_responses);
							callback(null, json_responses);
						}
					});
						
				}
		});
  });	
};

exports.getAllOrders = function(msg, callback){
	
	mongo.connect(mongoURL, function() {
		var json_responses;
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('orders');
		console.log("order retrival ");
		
			coll.find({}, function(err1, result) {
			  if(err1){
					json_responses = { statusCode: 401 };
					callback(null, json_responses);
				}
				else 
				{
					json_responses = {"statusCode" : 200, orders: result };
					console.log(json_responses);
					callback(null, json_responses);
				}
		});
  });	
};

exports.getAllOrdersByCustId = function(msg, callback){
	
	mongo.connect(mongoURL, function() {
		var json_responses;
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('orders');
		console.log("order retrival ");
		
			coll.find({cust_id: msg.cust_id}).toArray(function(err1, result) {
			  if(err1){
					json_responses = { statusCode: 401 };
					callback(null, json_responses);
				}
				else 
				{
					json_responses = {"statusCode" : 200, orders: result };
					console.log(json_responses);
					callback(null, json_responses);
				}
		});
  });	
};