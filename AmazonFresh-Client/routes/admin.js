var ejs = require("ejs");
var mq_client = require('../rpc/client');

////////////////////   ***** start Farmer module ******* //////////////////////////////

exports.adminGetFarmerList = function(req, res){
    var startPosition = req.param('startPosition');
    console.log("startPosition =" + startPosition);
    var msg_payload = {
        "startPosition" : startPosition,
        "func" : "getFarmerList"
    };
    mq_client.make_request('adminFarmer_queue', msg_payload, function(err,results) {
        //console.log(results);
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ farmerList: results.farmerList,
						   Status: results.Status,
						   count: results.count});
        }
    });
};		// end adminGetFarmerList

exports.adminGetFarmerApprovalPendingList = function(req, res){
    var startPosition = req.param('startPosition');
    console.log("startPosition =" + startPosition);    
    var msg_payload = {
        "startPosition" : startPosition,
        "func" : "getFarmerApprovalPendingList"
    };
    mq_client.make_request('adminFarmer_queue', msg_payload, function(err,results) {
        if (err) {
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ farmerList: results.farmerList,
						   Status: results.Status,
						   count: results.count});
        }
    });
};		// end adminGetFarmerApprovalPendingList

exports.adminApproveFarmer = function(req, res){
    var pendingFarmerID = req.param('farmer');
    console.log("Farmer ID =" + pendingFarmerID);
    var msg_payload = {
        "farmer" : pendingFarmerID,
        "func" : "approveFarmer"
    };
    mq_client.make_request('adminFarmer_queue', msg_payload, function(err,results) {
        if (err) {
            res.status(500).send(null);
        } else {
            console.log(results.Message);
            res.send({ Message: results.Message,
                           Status: results.Status
                       });
        }
    });
};      // end adminApproveFarmer

exports.adminDisapproveFarmer = function(req, res){
    var pendingFarmerID = req.param('farmer');
    console.log("Farmer ID =" + pendingFarmerID);
    var msg_payload = {
        "farmer" : pendingFarmerID,
        "func" : "disApproveFarmer"
    };
    mq_client.make_request('adminFarmer_queue', msg_payload, function(err,results) {
        if (err) {
            res.status(500).send(null);
        } else {
            console.log(results.Message);
            res.send({ Message: results.Message,
                           Status: results.Status
                       });
        }
    });
};      // end adminDisapproveFarmer

exports.adminGetFarmerSearchList = function(req, res){
    var startPosition = req.param('startPosition');
    var searchCriteria = req.param('criteria');
    var q = req.param('q');
    //q = q.replace(/[^a-z0-9A-Z@_+-]/g, "");
    q = q.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
    console.log(searchCriteria + ":" + q );    
    if (q === null || q === undefined || q=== ''){
        res.send({ farmerList: null,
                    Status: 400,
                    Message: "Enter correct value"});
    }
    else{
        var msg_payload = {
            "startPosition" : startPosition,
            "searchCriteria" : searchCriteria,
            "q": q,
            "func" : "getFarmerSearchList"
        };
        mq_client.make_request('adminFarmer_queue', msg_payload, function(err,results) {
            if (err) {
                res.status(500).send(null);
            } else {
                console.log("about results" + results);
                res.send({ farmerList: results.farmerList,
                               Status: results.Status,
                               count: results.count});
            }
        });
    }
};      // end adminGetFarmerSearchList

////////////////////   ***** End Farmer module ******* //////////////////////////////

////////////////////   ***** start Customer module ******* //////////////////////////////

exports.adminGetCustomerList = function(req, res){
    var startPosition = req.param('startPosition');
    console.log("startPosition =" + startPosition);
    var msg_payload = {
        "startPosition" : startPosition,
        "func" : "getCustomerList"
    };
    mq_client.make_request('adminCustomer_queue', msg_payload, function(err,results) {
        //console.log(results);
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ customerList: results.customerList,
                           Status: results.Status,
                           count: results.count});
        }
    });
};      // end adminGetCustomerList

exports.adminGetCustomerApprovalPendingList = function(req, res){
    var startPosition = req.param('startPosition');
    console.log("startPosition =" + startPosition);    
    var msg_payload = {
        "startPosition" : startPosition,
        "func" : "getCustomerApprovalPendingList"
    };
    mq_client.make_request('adminCustomer_queue', msg_payload, function(err,results) {
        if (err) {
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ customerList: results.customerList,
                           Status: results.Status,
                           count: results.count});
        }
    });
};      // end adminGetCustomerApprovalPendingList

exports.adminApproveCustomer = function(req, res){
    var pendingCustomerID = req.param('customer');
    console.log("Customer ID =" + pendingCustomerID);
    var msg_payload = {
        "customer" : pendingCustomerID,
        "func" : "approveCustomer"
    };
    mq_client.make_request('adminCustomer_queue', msg_payload, function(err,results) {
        if (err) {
            res.status(500).send(null);
        } else {
            console.log(results.Message);
            res.send({ Message: results.Message,
                           Status: results.Status
                       });
        }
    });
};      // end adminApproveCustomer

exports.adminDisapproveCustomer = function(req, res){
    var pendingCustomerID = req.param('customer');
    console.log("Customer ID =" + pendingCustomerID);
    var msg_payload = {
        "customer" : pendingCustomerID,
        "func" : "disApproveCustomer"
    };
    mq_client.make_request('adminCustomer_queue', msg_payload, function(err,results) {
        if (err) {
            res.status(500).send(null);
        } else {
            console.log(results.Message);
            res.send({ Message: results.Message,
                           Status: results.Status
                       });
        }
    });
};      // end adminDisapproveCustomer

exports.adminGetCustomerSearchList = function(req, res){
    var startPosition = req.param('startPosition');
    var searchCriteria = req.param('criteria');
    var q = req.param('q');
    q = q.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
    console.log(searchCriteria + ":" + q );    
    if (q === null || q === undefined || q=== ''){
        res.send({ customerList: null,
                    Status: 400,
                    Message: "Enter correct value"});
    }
    else{
        var msg_payload = {
            "startPosition" : startPosition,
            "searchCriteria" : searchCriteria,
            "q": q,
            "func" : "getCustomerSearchList"
        };
        mq_client.make_request('adminCustomer_queue', msg_payload, function(err,results) {
            if (err) {
                res.status(500).send(null);
            } else {
                console.log("about results" + results);
                res.send({ customerList: results.customerList,
                               Status: results.Status,
                               count: results.count});
            }
        });
    }
};      // end adminGetCustomerSearchList

////////////////////   ***** End Customer module ******* //////////////////////////////

////////////////////   ***** start Product module ******* //////////////////////////////

exports.adminGetProductList = function(req, res){
    var startPosition = req.param('startPosition');
    console.log("startPosition =" + startPosition);
    var msg_payload = {
        "startPosition" : startPosition,
        "func" : "getProductList"
    };
    mq_client.make_request('adminProduct_queue', msg_payload, function(err,results) {
        //console.log(results);
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ productList: results.productList,
                           Status: results.Status,
                           count: results.count});
        }
    });
};      // end adminGetProductList

exports.adminGetProductApprovalPendingList = function(req, res){
    var startPosition = req.param('startPosition');
    console.log("startPosition =" + startPosition);    
    var msg_payload = {
        "startPosition" : startPosition,
        "func" : "getProductApprovalPendingList"
    };
    mq_client.make_request('adminProduct_queue', msg_payload, function(err,results) {
        if (err) {
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ productList: results.productList,
                           Status: results.Status,
                           count: results.count});
        }
    });
};      // end adminGetProductApprovalPendingList

exports.adminApproveProduct = function(req, res){
    var pendingProductID = req.param('product');
    console.log("Product ID =" + pendingProductID);
    var msg_payload = {
        "product" : pendingProductID,
        "func" : "approveProduct"
    };
    mq_client.make_request('adminProduct_queue', msg_payload, function(err,results) {
        if (err) {
            res.status(500).send(null);
        } else {
            console.log(results.Message);
            res.send({ Message: results.Message,
                           Status: results.Status
                       });
        }
    });
};      // end adminApproveProduct

exports.adminDisapproveProduct = function(req, res){
    var pendingProductID = req.param('product');
    console.log("Product ID =" + pendingProductID);
    var msg_payload = {
        "product" : pendingProductID,
        "func" : "disApproveProduct"
    };
    mq_client.make_request('adminProduct_queue', msg_payload, function(err,results) {
        if (err) {
            res.status(500).send(null);
        } else {
            console.log(results.Message);
            res.send({ Message: results.Message,
                           Status: results.Status
                       });
        }
    });
};      // end adminDisapproveProduct

exports.adminGetProductSearchList = function(req, res){
    var startPosition = req.param('startPosition');
    var searchCriteria = req.param('criteria');
    var q = req.param('q');
    q = q.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
    console.log(searchCriteria + ":" + q );    
    if (q === null || q === undefined || q=== ''){
        res.send({ productList: null,
                    Status: 400,
                    Message: "Enter correct value"});
    }
    else{
        var msg_payload = {
            "startPosition" : startPosition,
            "searchCriteria" : searchCriteria,
            "q": q,
            "func" : "getProductSearchList"
        };
        mq_client.make_request('adminProduct_queue', msg_payload, function(err,results) {
            if (err) {
                res.status(500).send(null);
            } else {
                console.log("about results" + results);
                res.send({ productList: results.productList,
                               Status: results.Status,
                               count: results.count});
            }
        });
    }
};      // end adminGetProductSearchList

////////////////////   ***** End Customer module ******* //////////////////////////////

////////////////////   ***** Start Billing module ******* //////////////////////////////

exports.adminGetBillingList = function(req, res){
    var startPosition = req.param('startPosition');
    var	msg_payload = {
                "startPosition" : startPosition,
                "func" : "getBillingList"
            };
    
    console.log("startPosition =" + startPosition);
    mq_client.make_request('adminBilling_queue', msg_payload, function(err,results) {
        //console.log(results);
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ billingList: results.orders,
                           Status: results.Status,
                       //    count: results.count,
                       Message: results.Message,
                       });
        }
    });
};      // end adminGetBillingList

exports.adminGetBillingSearchList = function(req, res){
    var startPosition = req.param('startPosition');
    var searchCriteria = req.param('criteria');
    var q = req.param('q');
    q = q.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
    console.log(searchCriteria + ":" + q );    
    if (q === null || q === undefined || q=== ''){
        res.send({ billingList: null,
                    Status: 400,
                    Message: "Enter correct value"});
    }
    else{
        var msg_payload;
        if(req.param('criteria') === 'billId'){
        	msg_payload = {
                    "startPosition" : startPosition,
                    "searchCriteria" : searchCriteria,
                    "q": q,
                    "func" : "getBillingSearchListByBillId"
                };
        }
        else {
        	msg_payload = {
                    "startPosition" : startPosition,
                    "searchCriteria" : searchCriteria,
                    "q": q,
                    "func" : "getBillingSearchListByCustId"
                };
        }
        mq_client.make_request('adminBilling_queue', msg_payload, function(err,results) {
            if (err) {
                res.status(500).send(null);
            } else {
                console.log("about results" + results);
                res.send({ billingList: results.orders,
                               Status: results.Status,
                               Message:results.Message,
                               count: results.count,
                           });
            }
        });
    }
};      // end adminGetBillingSearchList

////////////////////   ***** End Billing module ******* //////////////////////////////

////////////////////***** Start Stats module ******* //////////////////////////////

exports.adminGetRevenuePerWeek = function(req, res){
    console.log("adminGetRevenuePerWeek");
    var date = req.param('date')
    var days = req.param('days')
    console.log("date: " + date + "  days:" + days);
    var msg_payload = {
            "date" : date,
            "days" : 7,
            "func" : "getRevenuePerWeek"
        };
        mq_client.make_request('adminStats_queue', msg_payload, function(err,results) {
            if (err) {
                res.status(500).send(null);
            } else {
                console.log("about results" + results.totalRevenueOnTheDay);
                res.send({  day1Revenue:  results.totalRevenueOnTheDay,
                            Status: results.Status
                           });
            }
        });

    /*var resp ={};
    var day1 = {},  day2 = {}, day3 = {},  day4 = {}, day5 = {}, day6 = {}, day7 = {};
    day1.date ="2016-03-12";   day1.revenue = 120;
    day2. date ="2016-03-13";    day2.revenue = 125;
    day3.date ="2016-03-14";   day3.revenue = 120;
    day4. date ="2016-03-15";    day4.revenue = 125;
    day5.date ="2016-03-16";   day5.revenue = 120;
    day6. date ="2016-03-17";    day6.revenue = 125;
    day7. date ="2016-03-18";    day7.revenue = 125;
    resp.day1 = day1;    resp.day2 = day2; resp.day3 = day3;    resp.day4 = day4;
    resp.day5 = day5;    resp.day6 = day6; resp.day7 = day7; 
    
    res.send({ Message: "success testGraph from rabbitClientNode",
               Status: 200,
               res:resp
              }); */

};      // end adminGetRevenuePerWeek

exports.adminGetRidesPerArea = function(req, res){
    console.log("adminGetRevenuePerWeek");
    var states = req.param('states')
    var count = req.param('count')
    console.log("States " + states + "  count:" + count);
    var msg_payload = {
            "states" : states,
            "count" : count,
            "func" : "getRidesPerArea"
        };
        mq_client.make_request('adminStats_queue', msg_payload, function(err,results) {
            if (err) {
                res.status(500).send(null);
            } else {
                console.log("about results: " + results.Status);
                res.send(  results
                           );
            }
        });

};      // end adminGetRidesPerArea



exports.getAllOrdersForAdmin = function getAllOrdersForAdmin(req, res){
	
	    mq_client.make_request('getAllOrdersForAdmin_queue', '', function (err, results) {
	        if (err) {
	            console.log('Err: ' + err);
	            res.send({'statusCode': 400});
	            throw err;
	        } else {
	            if (results.Status === 200) {
	            	var zipcodes = [];
	            	for(var i = 0; i < results.orders.length; i++){
	            		for(var j = 0; j < results.orders[i].shoppingCart.items.length; j++){
	            			var zip_json = {farmerZip: results.orders[i].shoppingCart.items[j].farmer.zipcode, customerZip: results.orders[i].customer_zipcode};
	            			zipcodes.push(zip_json);
		            	}
	            	}
	                res.send({zipcodes: zipcodes, allOrders: results.allOrders});
	            } else {
	                console('Error Occured in getting all orders for Admin!');
	                res.send({'statusCode': 400});
	            }
	        }
	    });
};

////////////////////***** Start DynamicPricing module ******* //////////////////////////////

exports.adminGetUniqueProductTypes = function(req, res){
    var msg_payload = {
        "func" : "getUniqueProductTypes"
    };
    mq_client.make_request('adminDynamicPricing_queue', msg_payload, function(err,results) {
        //console.log(results);
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ productTypes: results.productTypes,
                        Status: results.Status,
                        Message: results.Message
                    });
        }
    });
};      // end adminGetUniqueProductTypes

exports.adminGetUniqueProducts = function(req, res){
    var msg_payload = {
        "func" : "getUniqueProducts"
    };
    mq_client.make_request('adminDynamicPricing_queue', msg_payload, function(err,results) {
        //console.log(results);
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ products: results.products,
                        Status: results.Status,
                        Message: results.Message
                    });
        }
    });
};      // end adminGetUniqueProducts

exports.adminApplyDPForProductType = function(req, res){
    console.log("adminApplyDPForProductType");
    productType = req.param('productType');
    percentage = req.param('percentage');
    var msg_payload = {
        "productType" : productType,
        "percentage": percentage,
        "func" : "applyDPForProductType"
    };
    mq_client.make_request('adminDynamicPricing_queue', msg_payload, function(err,results) {
        //console.log(results);
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ Status: results.Status,
                       Message: results.Message,
                       });
        }
    });
};      // end adminApplyDPForProductType

exports.adminApplyDPForProduct = function(req, res){
    console.log("adminApplyDPForProduct");
    product = req.param('product');
    percentage = req.param('percentage');
    var msg_payload = {
        "product" : product,
        "percentage": percentage,
        "func" : "applyDPForProduct"
    };
    mq_client.make_request('adminDynamicPricing_queue', msg_payload, function(err,results) {
        //console.log(results);
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ Status: results.Status,
                       Message: results.Message,
                       });
        }
    });
};      // end adminApplyDPForProductType
////////////////////   ***** end DynamicPricing module ******* //////////////////////////////

exports.viewFarmerProfile = function(req, res){
	var msg_payload = {
	        "farmer_id" : req.param('farmerId')
	    };
	    mq_client.make_request('viewFarmerProfile_queue', msg_payload, function(err,results) {
	        //console.log(results);
	        if (err) {
	            //console.log(err);
	            res.status(500).send(null);
	        } else {
	            console.log("about results" + results);
	            res.render('viewProfile', {user: results[0].user});
	        }
	    });
};

exports.viewCustomerProfile = function(req, res){
	var msg_payload = {
	        "cust_id" : req.param('custId')
	    };
	    mq_client.make_request('viewCustomerProfile_queue', msg_payload, function(err,results) {
	        //console.log(results);
	        if (err) {
	            //console.log(err);
	            res.status(500).send(null);
	        } else {
	            console.log("about results" + results);
	            res.render('viewProfile', {user: results[0].user});
	        }
	    });
};
exports.deleteCustomer = function deleteCustomer(req, res) {
	console.log("CustId in delete product: " + req.param('custId'));
	mq_client.make_request('deleteCustomer_queue', {'custId' : req.param('custId')}, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            res.render('deleteError');
            //throw err;
        } else {
            if (results.statusCode == 200) {            	
                res.render('adminDashboard');
            } else {
                console('Error Occurred!');
                res.render('deleteError');
            }
        }
    });
};