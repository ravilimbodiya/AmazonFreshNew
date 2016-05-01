var mq_client = require('../rpc/client');
var ejs = require("ejs");
/*
//Generate Random Ids to insert as prod_id in database
function IDGenerator() {
	 
	 this.length = 8;
	 this.timestamp =+ new Date;
	 
	 var _getRandomInt = function( min, max ) {
		return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
	 };
	 
	 this.generate = function() {
		 var ts = this.timestamp.toString();
		 var parts = ts.split( "" ).reverse();
		 var id = "";
		 
		 for( var i = 0; i < this.length; ++i ) {
			var index = _getRandomInt( 0, parts.length - 1 );
			id += parts[index];	 
		 }
		 
		 return id;
	 };	 
}*/


exports.farmerDashboard = function farmerDashboard(req,res) {
	
	req.session.fmr_id = req.session.user[0].farmer_id;

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
		
		//the below line is to be commented while integration
		//req.session.fmr_id = "277-72-7879";
		
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
	//var prodId = this.IDGenerator();
	//alert("ProductId: " + prodId);
	var msg_payload = {
						farmerId 	 : req.session.fmr_id,
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
			throw err;
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
    mq_client.make_request('loadProducts_queue', {'farmerId' : req.session.fmr_id}, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            res.send({'statusCode': 400});
            throw err;
        } else {
            if (results.statusCode == 200) {
            	console.log("Anisha: " + results.result);
                res.send({'statusCode': 200, rows: results.result});
            } else {
                console('Error Occurred!');
                res.send({'statusCode': 400});
            }
        }
    });
};