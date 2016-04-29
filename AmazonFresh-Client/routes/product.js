var mq_client = require('../rpc/client');
var ejs = require("ejs");

exports.createProduct = function createProduct(req, res) {
    var msg_payLoad = {
        'farmerId': req.param('farmerId'),
        'productName': req.param('productName'),
        'productPrice': req.param('productPrice'),
        'productDescription': req.param('productDescription'),
        'productReviews': req.param('productReviews'),
        'productRatings': req.param('productRatings'),
        'prod_id': req.param('prod_id')
    };

    mq_client.make_request('product_createProduct', msg_payLoad, function (err, results) {
        if (err) {
            console.log("Err: " + err);
            res.send({'statusCode': 200});
            throw err;
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console.log('Error Occured!');
                res.send(results);
            }
        }
    });
};

exports.deleteProduct = function deleteProduct(req, res) {
    var msg_payLoad = {
        'prodId': req.param('prodId')
    };

    mq_client.make_request('product_deleteProduct', msg_payLoad, function (err, results) {
        if (err) {
            console.log("Err: " + err);
            res.send({'statusCode': 200});
            throw err;
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console.log('Error Occured!');
                res.send(results);
            }
        }
    });
};

exports.listAllProduct = function listAllProduct(req, res) {
    mq_client.make_request('product_listallProduct', {}, function (err, results) {
        if (err) {
            console.log("Err: " + err);
            res.send({'statusCode': 401});
            throw err;
        } else {
            if (results.statusCode === 200) {
                res.send(results);
            } else {
                console.log('Error Occured!');
                res.send(results);
            }
        }
    });
};

exports.updateProduct = function updateProduct(req, res) {
    mq_client.make_request('product_updateProduct', {}, function (err, results) {
        if (err) {
            console.log("Err: " + err);
            res.send({'statusCode': 200});
            throw err;
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console.log('Error Occured!');
                res.send(results);
            }
        }
    });
};

exports.searchProductByAttribute = function searchProductByAttribute(req, res) {
    var msg_Payload = {
        'keyword': req.param('keyword')
    };

    mq_client.make_request('product_searchProduct', msg_Payload, function (err, results) {
        if (err) {
            console.log("Err: " + err);
            res.send({'statusCode': 200});
            throw err;
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console.log('Error Occured!');
                res.send(results);
            }
        }
    });
};

exports.displayProduct = function displayProduct(req, res) {
    
};


exports.showProductDescription = function showProductDescription(req,res) {

	var msg_payLoad = {'prod_id': req.param('productId')};

    mq_client.make_request('product_displayProduct', msg_payLoad, function (err, results) {
        if (err) {
            console.log("Err: " + err);
            res.render('error');
            throw err;
        } else {
            if (results.statusCode === 200) {
            	console.log('Currently displaying: '+ results.result[0].name);
            	req.session.selectedProduct = results.result[0];
                res.render('productDescription',{selectedProduct: results.result[0]});
            } else {
                console.log('Error Occured!');
                res.render('error');
            }
        }
    });
};