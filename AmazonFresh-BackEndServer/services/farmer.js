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

exports.submitAddProduct = function(msg, callback){

	console.log("Inside farmer.js submitAddProduct on server");
	var farmerId = msg.farmerId;
	var prodName = msg.prodName;
	var price = msg.price;
	var quantity = msg.quantity;
	var description = msg.description;
	var ratings = 0;
	var imgFile = msg.imgFile;	
	var prodType = msg.prodType;
	//var prodId = msg.prodId;
	
	
	//server side validation
	if(farmerId!="" && prodType!="" && prodName!="" && price!="" && description!="" && quantity!=""){
	
		// insert product into DBs		
		var query = "INSERT INTO product (farmer_id, name, price, quantity, description, ratings, image_url, product_type) " +
		"VALUES ('" + farmerId + "','" + prodName + "','" + price + "','" + quantity + "','" +	description + "','" + ratings + "','" + imgFile + "','" + prodType + "')";
		
		var json_responses;
		console.log("Query is: " + query);
		
		mysql.insertData(function(err, results){
			if(err){
				console.log("ERROR: " + err);
				json_responses = {"statusCode" : 401};
				callback(null, json_responses);
			}
			else 
			{
				json_responses = {"statusCode" : 200};
				callback(null, json_responses);
			}  
		}, query);
	}
	else{
		console.log('Error: Some field is null and failed server side validation');
		json_responses = {"statusCode" : 401};
		callback(null, json_responses);
	}
};//end create customer

exports.loadProducts = function(msg, callback){
	
	var farmerId = msg.farmerId;
	
	var query="select * from product where farmer_id ='" + farmerId + "';";
	var json_responses;
	console.log("Query is: " + query);
	
	mysql.fetchData(function(err, results){
		if(err){
			console.log("ERROR: " + err);
			json_responses = {"statusCode" : 401};
			callback(null, json_responses);
		}
		else 
		{
			if(results.length > 0){
				var rows = results;
				var jsonString = JSON.stringify(results);
				var jsonParse = JSON.parse(jsonString);
				json_responses = {"statusCode" : 200, "result": jsonParse};				
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