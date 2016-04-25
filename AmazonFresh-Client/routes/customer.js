var mq_client = require('../rpc/client');

exports.createCustomer = function createCustomer(req, res) {
    var msg_Payload = {
        'customerId': req.param('customerId'),
        'firstName': req.param('firstName'),
        'lastName': req.param('lastName'),
        'address': req.param('address'),
        'city': req.param('city'),
        'state': req.param('state'),
        'zipcode': req.param('zipcode'),
        'email': req.param('email'),
        'cc_no': req.param('cc_no'),
        'cc_name': req.param('cc_name'),
        'cc_expiry': req.param('cc_expiry'),
        'cvv': req.param('cvv')
    };

    if(req.param('userType') === 'customer'){
	    mq_client.make_request('createCustomer_queue', msg_Payload, function (err, results) {
	        if (err) {
	            console.log('Err: ' + err);
	            res.send({'statusCode': 400});
	            throw err;
	        } else {
	            if (results.statusCode == 200) {
	                console.log('Successful creation of customer!');
	                res.send(results);
	            } else {
	                console('Error Occured!');
	                res.send({'statusCode': 400});
	            }
	        }
	    });
    } else if(req.param('userType') === 'farmer'){
	    mq_client.make_request('createFarmer_queue', msg_Payload, function (err, results) {
	        if (err) {
	            console.log('Err: ' + err);
	            res.send({'statusCode': 400});
	            throw err;
	        } else {
	            if (results.statusCode == 200) {
	                console.log('Successful creation of farmer!');
	                res.send(results);
	            } else {
	                console('Error Occured!');
	                res.send({'statusCode': 400});
	            }
	        }
	    });
    }
};

exports.deleteCustomer = function deleteCustomer(req, res) {
    var msg_Payload = {
        'custId': req.param('custId')
    };
    mq_client.make_request('deleteCustomer_queue', msg_Payload, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            res.send({'statusCode': 400});
            throw err;
        } else {
            if (results.statusCode == 200) {
                console.log('Successful deletion of customer!');
                res.send(results);
            } else {
                console.log('Error Occured!');
                res.send({'statusCode': 400});
            }
        }
    });
};

exports.getAllCustomers = function getAllCustomers(req, res) {
    mq_client.make_request('getAllCustomers_queue', {}, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            res.send({'statusCode': 400});
            throw err;
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console('Error Occured!');
                res.send({'statusCode': 400});
            }
        }
    });
};

exports.generateBill = function generateBill(req, res) {
    mq_client.make_request('generateBill_queue', {}, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            res.send({'statusCode': 400});
            throw err;
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console('Error Occured!');
                res.send({'statusCode': 400});
            }
        }
    });
};

exports.selectDeliveryDateTime = function selectDeliveryDateTime(req, res) {
    mq_client.make_request('selectDeliveryDateTime_queue', {}, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            res.send({'statusCode': 400});
            throw err;
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console('Error Occured!');
                res.send({'statusCode': 400});
            }
        }
    });
};

exports.postReviewRating = function postReviewRating(req, res) {
    var msg_Payload = {
        'cust_id': req.param('cust_id'),
        'product_id': req.param('product_id'),
        'review': req.param('review'),
        'rating': req.param('rating')
    };

    mq_client.make_request('postReviewRating_queue', msg_Payload, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            res.send({'statusCode': 400});
            throw err;
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console('Error Occured!');
                res.send({'statusCode': 400});
            }
        }
    });
};