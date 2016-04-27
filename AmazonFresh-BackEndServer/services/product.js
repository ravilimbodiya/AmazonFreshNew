/**
 * Created by Sourabh on 4/22/2016.
 */

var ejs = require("ejs");
var mysql = require('./mysql');


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

exports.listallProduct = function(msg, callback){

    var query="select * from product";
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

    var query="select * from product where name like '%?%' OR farmer_id like '%?%' OR price like '%?%' OR description like '%?%' OR reviews like '%?%' OR ratings like '%?%' OR prod_id like '%?%'";
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
    }, query, [msg.keyword,msg.keyword,msg.keyword,msg.keyword,msg.keyword,msg.keyword,msg.keyword]);

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

