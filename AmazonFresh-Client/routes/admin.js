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
    console.log("startPosition =" + startPosition);
    var msg_payload = {
        "startPosition" : startPosition,
        "func" : "getBillingList"
    };
    mq_client.make_request('adminBilling_queue', msg_payload, function(err,results) {
        //console.log(results);
        if (err) {
            //console.log(err);
            res.status(500).send(null);
        } else {
            console.log("about results" + results);
            res.send({ //billingList: results.billingList,
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
        var msg_payload = {
            "startPosition" : startPosition,
            "searchCriteria" : searchCriteria,
            "q": q,
            "func" : "getBillingSearchList"
        };
        mq_client.make_request('adminBilling_queue', msg_payload, function(err,results) {
            if (err) {
                res.status(500).send(null);
            } else {
                console.log("about results" + results);
                res.send({ //billingList: results.billingList,
                               Status: results.Status,
                               Message:results.Message,
                               count: results.count,
                           });
            }
        });
    }
};      // end adminGetBillingSearchList

////////////////////   ***** End Billing module ******* //////////////////////////////

////////////////////   ***** Start Stats module ******* //////////////////////////////

exports.testGraph = function(req, res){
    console.log("testGraph");
    date = req.param('date')
    days = req.param('days')
    console.log("date: " + date + "  days:" + days);
    var s1 = [[2002, 112000], [2003, 122000], [2004, 104000], [2005, 99000], [2006, 121000], 
    [2007, 148000], [2008, 114000], [2009, 133000], [2010, 161000], [2011, 173000]];
    var s2 = [[2002, 10200], [2003, 10800], [2004, 11200], [2005, 11800], [2006, 12400], 
    [2007, 12800], [2008, 13200], [2009, 12600], [2010, 13100]];

    res.send({ Message: "success testGraph from rabbitClientNode",
               Status: 200,
               s1:s1,
               s2:s2
              });

};      // end testGraph

////////////////////   ***** end Stats module ******* //////////////////////////////
