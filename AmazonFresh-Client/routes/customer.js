var mq_client = require('../rpc/client');

exports.createCustomer = function createCustomer(req, res) {};

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