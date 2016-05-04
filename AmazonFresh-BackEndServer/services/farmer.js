var mysql = require("./mysql");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Amazonfresh";
var hash = require('./encryption').hash;

exports.createFarmer = function(msg, callback){
	
	var query1="select email, farmer_id from farmers where email = ? AND farmer_id = ?";
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
			}
		}  
	}, query1, [msg.email, msg.ssn]);
	
	
};



exports.editprofileFarmer = function(msg, callback){

	console.log('reached edit farmer');
	var updateprofilequery = "UPDATE farmers SET first_name='"+msg.lastname+"', last_name='"+msg.firstname+"', city='"+msg.city+"', state='"+msg.state+"', zipcode='"+msg.zipcode+"', contact='"+msg.contact+"' where far_id='"+msg.farmerId+"'";
	var json_responses;
	console.log("Query is:"+updateprofilequery);
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



exports.viewFarmerProfile = function(msg, callback){

	console.log('reached view farmer');
	var q = "select far_id, farmer_id, first_name, last_name, address, city, address, zipcode, email, contact, approved from farmers where farmer_id = ?";
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
	}, q, [msg.farmer_id]);


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
	
	//server side validation
	if(farmerId!="" && prodType!="" && prodName!="" && price!="" && description!="" && quantity!=""){
	
		// insert product into DBs		
		var query = "INSERT INTO product (farmer_id, name, price, quantity, description, ratings, image_url, product_type) " +
		"VALUES ('" + farmerId + "','" + prodName + "','" + price + "','" + quantity + "','" +	description + "','" + ratings + "','" + imgFile + "','" + prodType + "')";
		
		var json_responses;
		console.log("Query is: " + query);
		
		mysql.insertData(function(err, results){
			var json_responses;
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
		var json_responses;
		console.log('Error: Some field is null and failed server side validation');		
		json_responses = {"statusCode" : 401};
		callback(null, json_responses);
	}
};//end create farmer

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
				
				var productsRetrievedLength = jsonParse.length;
				var productIds = [];
				
				for(var p=0; p<productsRetrievedLength; p++){
					productIds.push(jsonParse[p].product_id);
					//console.log("PID: " + productIds[p]);
				}
				//console.log("Length: " + productsRetrievedLength);
				var feedback_arr = [];
				
				//To retrieve ratings and reviews for the farmer
				mongo.connect(mongoURL, function(){
					
					console.log('Connected to mongo at: ' + mongoURL);					
					var coll = mongo.collection('orders');

						coll.aggregate([
					                     { $match: { 'shoppingCart.items.0.farmer.farmer_id': farmerId} },
					                     { $group: 
												{ _id:null, 
												  totalEarnings: { $sum: "$amount" },
												  countOrder: { $sum: 1 }
												} 
										 }
					                   ]).toArray( function(err1, rows){
													if(err1)
													{
														console.log("No Orders");		
														json_responses = {"statusCode": 200, "result": jsonParse, "feedback": null};				
														callback(null, json_responses);	
													}
													else
													{
														console.log("Earning and Order: " + JSON.stringify(rows));
														if(rows.length>0){
															json_responses = {"statusCode": 200, "result": jsonParse, "chartData": rows};				
															callback(null, json_responses);		
														}
														else{
															json_responses = {"statusCode": 200, "result": jsonParse, "chartData": null};				
															callback(null, json_responses);
														}
																									
													}							
												});													
										
				}); //end mongo									
			}//end if
			else {    
				console.log('Error occurred in getting all products.');
				json_responses = {"statusCode" : 401};
				callback(null, json_responses);
			}
		}  
	}, query);
};

exports.viewFeedback = function(msg, callback){
	
	console.log("Inside view feedback server");
	var farmerId = msg.farmerId + "";
	var prodId = parseInt(msg.prodId);
	
	console.log("Farmer Id: " + farmerId);
	console.log("prodId " + prodId);
	
				//To retrieve ratings and reviews for the farmer
				mongo.connect(mongoURL, function(){
					
					console.log('Connected to mongo at: ' + mongoURL);					
					var coll = mongo.collection('farmer');

						coll.find({$and:[{farmer_id: farmerId, product_id: prodId}]}).toArray(function(err1, rows){
							if(err1)
							{
								console.log("No Feedback");
								json_responses = {"statusCode" : 200, "feedback": null};				
								callback(null, json_responses);
							}
							else
							{
								
								console.log("Feedback Row: " + JSON.stringify(rows));
								if(rows.length>0){	
									json_responses = {"statusCode": 200, "feedback": rows[0].feedback};
									console.log("Feedback:" + JSON.stringify(rows[0].feedback));
									callback(null, json_responses);		
								}
								else{
									json_responses = {"statusCode": 200, "feedback": null};		
									console.log("Feedback:" + rows.feedback);
									callback(null, json_responses);
								}																			
							}							
						});//end find																				
				}); //end mongo											
};


exports.updateProduct = function(msg, callback){

	console.log("Inside farmer.js submitAddProduct on server");
	var farmerId = msg.farmerId + "";
	var prodId = parseInt(msg.prodId);
	var prodName = msg.prodName + "";
	var price = msg.price + "";
	var quantity = msg.quantity + "";
	var description = msg.description + "";
	var ratings = 0;
	var imgFile = msg.imgFile + "";	
	var prodType = msg.prodType + "";
	
	//server side validation
	if(farmerId!="" && prodType!="" && prodName!="" && price!="" && description!="" && quantity!=""){
	
		// insert product into DBs		
		var query = "UPDATE product SET " + 
					"name='" + prodName + "', " +
					"price='" + price + "', " +
					"quantity='" + quantity + "', " +
					"description='" + description + "', " +
					"image_url='" + imgFile + "'" +
					"WHERE product_id=" + prodId + ";";
					
		
		var json_responses;
		console.log("Query is: " + query);
		
		mysql.insertData(function(err, results){
			var json_responses;
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
		var json_responses;
		console.log('Error: Some field is null and failed server side validation');		
		json_responses = {"statusCode" : 401};
		callback(null, json_responses);
	}
};//end update farmer


exports.deleteProduct = function(msg, callback){

	console.log("Inside farmer.js deleteProduct on server");
	var prodId = parseInt(msg.prodId);
	
	//server side validation
	if(prodId!=""){
	
		// delete product from DB		
		var query = "DELETE FROM product " + 					
					"WHERE product_id=" + prodId + ";";
					
		var json_responses;
		console.log("Query is: " + query);
		
		mysql.insertData(function(err, results){
			var json_responses;
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
		var json_responses;
		console.log('Error: Some field is null and failed server side validation');		
		json_responses = {"statusCode" : 401};
		callback(null, json_responses);
	}
};//end delete product