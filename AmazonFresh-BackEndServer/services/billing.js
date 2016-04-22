var mysql = require("./mysql");

exports.deleteBill = function(msg, callback){
	var query="delete from bills where bill_id = ?";
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
				console.log('Error occurred in deleting bill.');
				json_responses = {"statusCode" : 401};
				callback(null, json_responses);
			}
		}  
	}, query, [msg.billId]);
};

exports.searchBill = function(msg, callback){
	var query="select * from bills where bill_id = ?";
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
				console.log('Error occurred in deleting bill.');
				json_responses = {"statusCode" : 401};
				callback(null, json_responses);
			}
		}  
	}, query, [msg.billId]);
};