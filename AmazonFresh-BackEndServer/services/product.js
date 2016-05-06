/**
 * Created by Sourabh on 4/22/2016.
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Amazonfresh";


exports.createProduct = function(msg, callback){

    /*  var farmerId = msg.farmerId;
     var productName = msg.productName;
     var price  = msg.productPrice;
     var description = msg.productDescription;
     var reviews  = msg.productReviews;
     var ratings = msg.productRatings;*/
    var dummyforautoincrement = "NULL";


    // insert user into db
    var query="insert into customers (product_id, farmer_id, name, price, description, reviews, ratings, prod_id) values (?,?,?,?,?,?,?,?)";
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
                console.log('Error occurred in creating product.');
                json_responses = {"statusCode" : 401};
                callback(null, json_responses);
            }
        }
    }, query, [dummyforautoincrement, msg.farmerId, msg.productName, msg.productPrice, msg.productDescription, msg.productReviews, msg.productRatings, msg.prod_id]);

};

exports.deleteProduct = function(msg, callback){

    var query="delete from product where product_id = ?";
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
                console.log('Error occurred in deleting product.');
                json_responses = {"statusCode" : 401};
                callback(null, json_responses);
            }
        }
    }, query, [msg.prod_id]);


};
exports.postReviewRating = function(msg, callback){

    console.log(msg.toString());
   mongo.connect(mongoURL, function() {
      var json_responses;
      console.log('Connected to mongo at: ' + mongoURL);
      var coll = mongo.collection('reviews_rating');
      console.log("inserting reviews and ratings");
         //var q = {customer_id: msg.cust_id, ratings: msg.rating, review: msg.reviewComment};
       coll.find({product_id: msg.prodId}).count(function(err, count) {
            console.log("There are " + count + " records.");
           if(count==0){
               console.log('reached count 0'+count);
               coll.insert({product_id: msg.prodId}, {product_id: msg.prodId, farmer_id: msg.farmerId},{$push : {feedback : {customer_id: msg.cust_id, ratings: msg.rating, review: msg.reviewComment}}}, function(err1, result) {
              /* coll.update({product_id:msg.prodId},{product_id: msg.prodId, farmer_id:msg.farmerId},{$push:{feedback:[{customer_id: msg.cust_id,ratings: msg.rating,review: msg.reviewComment}]}}, function(err1, result) {*/

               if(err1){

                       console.log('reached insert query fail');
                       json_responses = { statusCode: 401 };
                       callback(null, json_responses);
                   }
                   else
                   {
                       console.log('reached insert query success');
                       console.log('reached count 1+');
                       json_responses = {"statusCode" : 200};
                       console.log(json_responses);
                       callback(null, json_responses);
                   }
               });


           }else{
                console.log('reaching update query')
               coll.update({product_id:msg.prodId},{product_id: msg.prodId, farmer_id:msg.farmerId},{feedback:[{customer_id: msg.cust_id,ratings: msg.rating,review: msg.reviewComment}]}, function(err1, result) {
               /*coll.update({product_id: msg.prodId})*/
                   if(err1){
                       console.log('reached update query fail');
                       json_responses = { statusCode: 401 };
                       callback(null, json_responses);
                   }
                   else
                   {
                       console.log('reached update query success');
                       json_responses = {"statusCode" : 200};
                       console.log(json_responses);
                       callback(null, json_responses);
                   }
               });


           }

        });




  });  
}
exports.listallProduct = function(msg, callback){

    var query="select * from product LIMIT 50";
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
                console.log('Error occurred in getting all products.');
                json_responses = {"statusCode" : 401};
                callback(null, json_responses);
            }
        }
    }, query);


};

exports.updateProduct = function(msg, callback){

//Yet to implement



};

exports.searchProductbyattribute = function(msg, callback){

    var query="select * from product where name like '%"+msg.keyword+"%' OR description like '%"+msg.keyword+"%'";
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
                console.log('Error occurred in display product.');
                json_responses = {"statusCode" : 401};
                callback(null, json_responses);
            }
        }
    }, query);

};

exports.displayProduct = function(msg, callback){

    var query="select * from product where product_id = ?";
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
                console.log('Error occurred in display product.');
                json_responses = {"statusCode" : 401};
                callback(null, json_responses);
            }
        }
    }, query, [msg.prod_id]);

};


exports.getAllReviewsByProductId = function(msg, callback){

	mongo.connect(mongoURL, function() {
		var json_responses;
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('reviews_rating');
		console.log("getting reviews and ratings");
		
			coll.find({product_id: msg.prod_id}, function(err1, result) {
			  if(err1){
					json_responses = { statusCode: 401 };
					callback(null, json_responses);
				}
				else 
				{
					json_responses = {"statusCode" : 200, reviews: result };
					console.log(json_responses);
					callback(null, json_responses);
				}
		});
  });	

};


exports.postReviewRating = function(msg, callback){

	mongo.connect(mongoURL, function() {
		var json_responses;
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('reviews_rating');
		console.log("inserting reviews and ratings");
			var q = {customer_id: msg.cust_id, ratings: msg.rating, review: msg.reviewComment};
			coll.update({product_id: msg.prodId}, {product_id: msg.prodId, farmer_id: msg.farmerId, $push : {feedback : {customer_id: msg.cust_id, ratings: msg.rating, review: msg.reviewComment}}}, {upsert: true}, function(err1, result) {
			  if(err1){
					json_responses = { statusCode: 401 };
					callback(null, json_responses);
				}
				else 
				{
					json_responses = {"statusCode" : 200};
					console.log(json_responses);
					callback(null, json_responses);
				}
		});
  });	

};