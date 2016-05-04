var mq_client = require('../rpc/client');
var ejs = require("ejs");


exports.redirectToeditprofile = function(req, res){

	res.render("editProfile");
};

exports.editProfilefarmer = function(req, res){

var user={};
user = req.param("user");
console.log(user);

var msg_payload = {
	farmerId 	 : req.session.user[0].far_id,
	lastname 	 : user.last_name,
	firstname 	 : user.first_name,
	city		 : user.city,
	state		 : user.state,
	phonenumber  : user.phonenumber,
	zipode		 : user.zipcode,
	contact		 : user.contact


};
console.log(msg_payload);
mq_client.make_request('editprofileFarmer_queue', msg_payload, function(err, results){

	console.log("Result returned from server");
	if(err){
		throw err;
	}
	else
	{
		if(results.statusCode == 200){
			console.log("Farmer Profile updated");
			res.send({"statusCode":200});
		}
		else {

			console.log("Farmer Profile was not able to update");
			res.send({"statusCode":401});
		}
	}
});


};

exports.getcurrentFarmer = function(req, res){

	console.log('reached getcurrent routes');
	console.log(req.session.user[0]);
	res.send({"statusCode": 200, "user": req.session.user[0]});

};

exports.farmerDashboard = function farmerDashboard(req,res) {
	
	//req.session.fmr_id = req.session.user[0].farmer_id;
	//console.log("Farmer Id: " + req.session.fmr_id);
	
	ejs.renderFile('./views/farmerDashboard.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
};

//Redirect to the add product page
exports.renderAddProduct = function renderAddProduct(req, res) {

	console.log("inside renderAddProduct in routes");
	var type = req.param('type');
	console.log("Type: " + type);
	if(type !== null){
		req.session.prodType = type;		
		res.send({"statusCode":"200"});
	}
	else{
		res.send({statusCode:"401"});
	}
};

//Renders the add product page
exports.addProduct = function(req,res)
{
	console.log("Render add product page...");
	res.render('farmerAddProduct',{"prodType":req.session.prodType});
};

//To insert new product into database
exports.submitAddProduct = function(req, res)
{
	console.log("inside submitAddProduct in routes");
	console.log("Product type: " + req.session.prodType);
	console.log("Farmer Id: " + req.session.user[0].farmer_id);
	//var prodId = this.IDGenerator();
	//alert("ProductId: " + prodId);
	
	var msg_payload = {
						farmerId 	 : req.session.user[0].farmer_id,
						prodType 	 : req.session.prodType,
						prodName 	 : req.param("prodName"),
						price 	 	 : req.param("price"),
						description  : req.param("description"),
						imgFile  	 : req.param("imgFile") || null,
						quantity	 : req.param("quantity")
	};
	
	mq_client.make_request('addFarmerProduct_queue', msg_payload, function(err, results){
		
		console.log("Result returned from server");
		if(err){
			//throw err;
			res.send({"statusCode":401});
		}
		else 
		{
			if(results.statusCode == 200){
				console.log("Added product successfully");
				res.send({"statusCode":200});
			}
			else {    
				
				console.log("Product could not be added");
				res.send({"statusCode":401});
			}
		}  
	});
		
};



exports.loadProducts = function loadProducts(req, res) {
    mq_client.make_request('loadProducts_queue', {'farmerId' : req.session.user[0].farmer_id}, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            res.send({'statusCode': 400});
            //throw err;
        } else {
            if (results.statusCode == 200) {            	
                res.send({'statusCode' : 200, 'rows' : results.result, 'chartDataR' : results.chartData});
            } else {
                console('Error Occurred!');
                res.send({'statusCode': 400});
            }
        }
    });
};

exports.viewFeedback = function viewFeedback(req, res){
	console.log("inside viewFeedback in routes");
	var prodId = req.param("prodId");
	console.log("Product Id:" + prodId);
	var msg_payload = { 'farmerId' : req.session.user[0].farmer_id, 'prodId' : prodId};
	
	mq_client.make_request('viewFeedback_queue', msg_payload, function(err, results){
		
		
		if(err){
			//throw err;
			res.send({"statusCode":401});
		}
		else 
		{
			console.log("Feedback returned from server");
			if(results.statusCode == 200){				
				res.send({"statusCode":200, "feedback" : results.feedback});
			}
			else {    
				res.send({"statusCode":401});
			}
		}  
	});
		
};


exports.renderFeedback = function renderFeedback(req, res) {
	console.log("ProdId in render feedback: " + req.param('prodId'));
    res.render('viewFeedback',{'prodId': req.param('prodId')});
};

exports.renderEditProduct = function renderEditProduct(req, res) {
	console.log("In render Edit Product");

	/*prodName = prodObj.name;
	prodPrice = prodObj.price;
	prodDesc = prodObj.description;
	prodQuan = prodObj.quantity;
	prodImg = prodObj.image_url;
	prodObjType = prodObj.product_type;*/
	
	req.session.prodObj = req.param("prodObj");		
	res.send({"statusCode":"200"});
	
    ///res.render('farmerEditProduct',{'prodObj': req.param('prodObj')});
};

exports.farmerEditProduct = function farmerEditProduct(req, res) {
	console.log("In Farmer Edit Product");
 	console.log(req.session.prodObj);	
	res.render('farmerEditProduct', {prod:req.session.prodObj});

};

exports.submitUpdateProduct = function(req, res)
{
	console.log("inside submitUpdateProduct in routes");
	console.log("Product type: " + req.session.prodType);
	console.log("Farmer Id: " + req.session.user[0].farmer_id);
	console.log("Prod Id in update: " + req.session.prodObj.product_id);
	
	var msg_payload = {
						farmerId 	 : req.session.user[0].farmer_id,
						prodId		 : req.session.prodObj.product_id,
						prodType 	 : req.param("prodType"),
						prodName 	 : req.param("prodName"),
						price 	 	 : req.param("price"),
						description  : req.param("description"),
						imgFile  	 : req.param("imgFile") || null,
						quantity	 : req.param("quantity")
	};
	
	mq_client.make_request('submitUpdateProduct_queue', msg_payload, function(err, results){
		
		console.log("Result returned from server");
		if(err){
			//throw err;
			res.send({"statusCode":401});
		}
		else 
		{
			if(results.statusCode == 200){
				console.log("Updated product successfully");
				res.send({"statusCode":200});
			}
			else {    
				
				console.log("Product could not be Updated");
				res.send({"statusCode":401});
			}
		}  
	});
		
};


exports.deleteProduct = function deleteProduct(req, res) {
	console.log("ProdId in delete product: " + req.param('prodId'));
	mq_client.make_request('deleteProduct_queue', {'prodId' : req.param('prodId')}, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            res.render('deleteError');
            //throw err;
        } else {
            if (results.statusCode == 200) {            	
                res.render('farmerDashboard');
            } else {
                console('Error Occurred!');
                res.render('deleteError');
            }
        }
    });
    
};