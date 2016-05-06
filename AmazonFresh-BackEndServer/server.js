//super simple rpc server example
var amqp = require('amqp')
    , util = require('util');

var login = require('./services/login');
var product = require('./services/product');
var billing = require('./services/billing');
var customer = require('./services/customer');
var farmer = require('./services/farmer');
var trip = require('./services/trips');
var truck = require('./services/trucks');
var cart = require('./services/cart');
var order = require('./services/order');
var admin   = require('./services/admin');

var express = require('express');
var http = require('http');
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require('./services/mongo');


var app = express();

app.set('port', process.env.PORT || 4100);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);


var cnn = amqp.createConnection({host: '127.0.0.1'});
app.use(expressSession({
    secret: 'cmpe273_teststring',
    resave: false,  //don't save session if unmodified
    saveUninitialized: false,	// don't create session until something stored
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new mongoStore({
        url: mongoSessionConnectURL
    })
}));


cnn.on('ready', function () {
    console.log("listening on login_queue");
    console.log('reached backend server');
    
    cnn.queue('checkLogin_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            login.checkLogin(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
    cnn.queue('createCustomer_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			customer.createCustomer(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});

    //Create product queue
    cnn.queue('product_createProduct', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            product.createProduct(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    //Delete Product queue
    cnn.queue('product_deleteProduct', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            product.deleteProduct(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    //List all product queue
    cnn.queue('product_listallProduct', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            product.listallProduct(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    //update a product queue
    cnn.queue('product_updateProduct', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            product.updateProduct(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    //Search a product queue
    cnn.queue('product_searchProduct', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            product.searchProductbyattribute(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    //Display a product queue
    cnn.queue('product_displayProduct', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            product.displayProduct(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
    cnn.queue('getAllReviewsByProductId_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            product.getAllReviewsByProductId(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
    cnn.queue('postReviewRating_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            product.postReviewRating(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    //CUSTOMER MODULE
    cnn.queue('createCustomer_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            customer.createCustomer(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('deleteCustomer_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            customer.deleteCustomer(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('getAllCustomers_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            customer.getAllCustomers(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('generateBill_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            customer.generateBill(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('selectDeliveryDateTime_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            customer.selectDeliveryDateTime(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('postReviewRating_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            customer.postReviewRating(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
  //edit profile customer
    cnn.queue('editprofileCustomer_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            customer.editprofileCustomer(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    //BILLING MODULE
    cnn.queue('deleteBill_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            billing.deleteBill(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('searchBill_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            billing.searchBill(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('createTrip_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            trip.create(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('editTrip_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            trip.edit(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('deleteTrip_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            trip.deleteTrip(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('getTripsByTruck_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            trip.getTripByTruck(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('getTripByDriver_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            trip.getTripByDriver(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    //TRUCKS MODULE
    cnn.queue('createTruck_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            truck.add(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('updateTruck_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            truck.update(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });

    cnn.queue('deleteTruck_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            truck.deleteTruck(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('currentLocation_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            truck.currentLocation(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
    cnn.queue('addToCart_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            cart.addToCart(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
    cnn.queue('removeItemFromCart_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            cart.removeItemFromCart(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
    cnn.queue('placeOrder_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            order.placeOrder(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
    cnn.queue('getAllOrders_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            order.getAllOrders(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('getAllOrdersByCustId_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            order.getAllOrdersByCustId(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    cnn.queue('createFarmer_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            farmer.createFarmer(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
  //Farmer Queues
    cnn.queue('addFarmerProduct_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));            
            
            farmer.submitAddProduct(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
    cnn.queue('loadProducts_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));            
            
            farmer.loadProducts(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
    cnn.queue('viewFeedback_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));            
            
            farmer.viewFeedback(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
    cnn.queue('submitUpdateProduct_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));            
            
            farmer.updateProduct(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
    cnn.queue('deleteProduct_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));            
            
            farmer.deleteProduct(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
  //edit profile farmer
    cnn.queue('editprofileFarmer_queue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            util.log(util.format( deliveryInfo.routingKey, message));
            util.log("Message: "+JSON.stringify(message));
            util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
            console.log('reached edit farmer queue');
            farmer.editprofileFarmer(message, function(err,res){
                    console.log('queue success');
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });
    
    cnn.queue('viewCustomerProfile_queue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            util.log(util.format( deliveryInfo.routingKey, message));
            util.log("Message: "+JSON.stringify(message));
            util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
            console.log('reached edit farmer queue');
            customer.viewCustomerProfile(message, function(err,res){
                    //console.log('queue success');
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });
    
    cnn.queue('viewFarmerProfile_queue', function(q){
        q.subscribe(function(message, headers, deliveryInfo, m){
            util.log(util.format( deliveryInfo.routingKey, message));
            util.log("Message: "+JSON.stringify(message));
            util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
            console.log('reached edit farmer queue');
            farmer.viewFarmerProfile(message, function(err,res){
                   //console.log('queue success');
                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType:'application/json',
                    contentEncoding:'utf-8',
                    correlationId:m.correlationId
                });
            });
        });
    });
    
  //Delete customer queue
    cnn.queue('deleteCustomer_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));
            admin.deleteCustomer(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
////*******    start admin farmer module  *****  /////
    cnn.queue('getAllOrdersForAdmin_queue', function (q) {
        q.subscribe(function (message, headers, deliveryInfo, m) {
            util.log(util.format(deliveryInfo.routingKey, message));
            util.log("Message: " + JSON.stringify(message));
            util.log("DeliveryInfo: " + JSON.stringify(deliveryInfo));            
            
            admin.getAllOrdersForAdmin(message, function (err, res) {

                //return index sent
                cnn.publish(m.replyTo, res, {
                    contentType: 'application/json',
                    contentEncoding: 'utf-8',
                    correlationId: m.correlationId
                });
            });
        });
    });
    
	cnn.queue('adminFarmer_queue', function(q){
		console.log("listening on adminFarmer_queue");		
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

			switch (message.func) {
				case "getFarmerList":
					admin.handle_request_getFarmerList(message, function(err,res){
						util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, res, {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
					});
				});
				break;

				case "getFarmerApprovalPendingList":
					admin.handle_request_getFarmerApprovalPendingList(message, function(err,res){
						util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, res, {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
					});
				});
				break;

				case "approveFarmer":
					admin.handle_request_approveFarmer(message, function(err,res){
						util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, res, {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
					});
				});
				break; 

				case "disApproveFarmer":
					admin.handle_request_disApproveFarmer(message, function(err,res){
						util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, res, {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
					});
				});
				break; 

				case "getFarmerSearchList":
					admin.handle_request_getFarmerSearchList(message, function(err,res){
						util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, res, {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
					});
				});
				break;

			}
		});
	});   // end  adminFarmer_queue

//// *******    end admin Farmer module  *****  /////

//// *******    start admin Customer module  *****  /////
	cnn.queue('adminCustomer_queue', function(q){
		console.log("listening on adminCustomer_queue");		
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

			switch (message.func) {
				case "getCustomerList":
					admin.handle_request_getCustomerList(message, function(err,res){
						util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, res, {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
					});
				});
				break;

				case "getCustomerApprovalPendingList":
					admin.handle_request_getCustomerApprovalPendingList(message, function(err,res){
						util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, res, {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
					});
				});
				break;

				case "approveCustomer":
					admin.handle_request_approveCustomer(message, function(err,res){
						util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, res, {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
					});
				});
				break; 

				case "disApproveCustomer":
					admin.handle_request_disApproveCustomer(message, function(err,res){
						util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, res, {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
					});
				});
				break; 

				case "getCustomerSearchList":
					admin.handle_request_getCustomerSearchList(message, function(err,res){
						util.log("Correlation ID: " + m.correlationId);
						// return index sent
						cnn.publish(m.replyTo, res, {
							contentType: 'application/json',
							contentEncoding: 'utf-8',
							correlationId: m.correlationId
					});
				});
				break;

			}
		});
	});   // end  adminCustomer_queue
//// *******    end  admin Customer module  *****  /////
	
////*******    start admin Product module  *****  /////
    cnn.queue('adminProduct_queue', function(q){
        console.log("listening on adminProduct_queue");        
        q.subscribe(function(message, headers, deliveryInfo, m){
            util.log(util.format( deliveryInfo.routingKey, message));
            util.log("Message: "+JSON.stringify(message));
            util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

            switch (message.func) {
                case "getProductList":
                    admin.handle_request_getProductList(message, function(err,res){
                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                    });
                });
                break;

                case "getProductApprovalPendingList":
                    admin.handle_request_getProductApprovalPendingList(message, function(err,res){
                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                    });
                });
                break;

                case "approveProduct":
                    admin.handle_request_approveProduct(message, function(err,res){
                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                    });
                });
                break; 

                case "disApproveProduct":
                    admin.handle_request_disApproveProduct(message, function(err,res){
                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                    });
                });
                break; 

                case "getProductSearchList":
                    admin.handle_request_getProductSearchList(message, function(err,res){
                        util.log("Correlation ID: " + m.correlationId);
                        // return index sent
                        cnn.publish(m.replyTo, res, {
                            contentType: 'application/json',
                            contentEncoding: 'utf-8',
                            correlationId: m.correlationId
                    });
                });
                break;

            }
        });
    });   // end  adminProduct_queue
//// *******    end  admin Product module  *****  /////
////*******    Start  admin Billing module  *****  /////
    cnn.queue('adminBilling_queue', function(q){
            console.log("listening on adminBilling_queue");     
            q.subscribe(function(message, headers, deliveryInfo, m){
                util.log(util.format( deliveryInfo.routingKey, message));
                util.log("Message: "+JSON.stringify(message));
                util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

                switch (message.func) {
                    case "getBillingList":
                        admin.getAllOrdersForAdmin(message, function(err,res){
                            util.log("Correlation ID: " + m.correlationId);
                            // return index sent
                            cnn.publish(m.replyTo, res, {
                                contentType: 'application/json',
                                contentEncoding: 'utf-8',
                                correlationId: m.correlationId
                        });
                    });
                    break;
                    case "getBillingSearchListByCustId":
                        admin.handle_request_getBillingSearchListByCustId(message, function(err,res){
                            util.log("Correlation ID: " + m.correlationId);
                            // return index sent
                            cnn.publish(m.replyTo, res, {
                                contentType: 'application/json',
                                contentEncoding: 'utf-8',
                                correlationId: m.correlationId
                        });
                    });
                    break;
                    case "getBillingSearchListByBillId":
                        admin.handle_request_getBillingSearchListByBillId(message, function(err,res){
                            util.log("Correlation ID: " + m.correlationId);
                            // return index sent
                            cnn.publish(m.replyTo, res, {
                                contentType: 'application/json',
                                contentEncoding: 'utf-8',
                                correlationId: m.correlationId
                        });
                    });
                    break;
                }
            });
        });

    //// *******    end   admin Billing module  *****  /////
////*******    Start  admin Dynamic Pricing module  *****  /////
    cnn.queue('adminDynamicPricing_queue', function(q){
           console.log("listening on adminDynamicPricing_queue");     
           q.subscribe(function(message, headers, deliveryInfo, m){
               util.log(util.format( deliveryInfo.routingKey, message));
               util.log("Message: "+JSON.stringify(message));
               util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

               switch (message.func) {
                   case "applyDPForProductType":
                       admin.handle_request_applyDPForProductType(message, function(err,res){
                           util.log("Correlation ID: " + m.correlationId);
                           // return index sent
                           cnn.publish(m.replyTo, res, {
                               contentType: 'application/json',
                               contentEncoding: 'utf-8',
                               correlationId: m.correlationId
                       });
                   });
                   break;
                   case "applyDPForProduct":
                       admin.handle_request_applyDPForProduct(message, function(err,res){
                           util.log("Correlation ID: " + m.correlationId);
                           // return index sent
                           cnn.publish(m.replyTo, res, {
                               contentType: 'application/json',
                               contentEncoding: 'utf-8',
                               correlationId: m.correlationId
                       });
                   });
                   break;
                   case "getUniqueProducts":
                       admin.handle_request_getUniqueProducts(message, function(err,res){
                           util.log("Correlation ID: " + m.correlationId);
                           // return index sent
                           cnn.publish(m.replyTo, res, {
                               contentType: 'application/json',
                               contentEncoding: 'utf-8',
                               correlationId: m.correlationId
                       });
                   });
                   break;
                   case "getUniqueProductTypes":
                       admin.handle_request_getUniqueProductTypes(message, function(err,res){
                           util.log("Correlation ID: " + m.correlationId);
                           // return index sent
                           cnn.publish(m.replyTo, res, {
                               contentType: 'application/json',
                               contentEncoding: 'utf-8',
                               correlationId: m.correlationId
                       });
                   });
                   break;
               }
           });
       });

    //// *******    end   admin Billing module  *****  /////
////*******    Start  admin stats module  *****  /////
    cnn.queue('adminStats_queue', function(q){
            console.log("listening on adminStats_queue");     
            q.subscribe(function(message, headers, deliveryInfo, m){
                util.log(util.format( deliveryInfo.routingKey, message));
                util.log("Message: "+JSON.stringify(message));
                util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));

                switch (message.func) {
                    case "getRevenuePerWeek":
                        admin.handle_request_getRevenuePerWeek(message, function(err,res){
                            util.log("Correlation ID: " + m.correlationId);
                            // return index sent
                            cnn.publish(m.replyTo, res, {
                                contentType: 'application/json',
                                contentEncoding: 'utf-8',
                                correlationId: m.correlationId
                        });
                    });
                    break;
                    case "getRidesPerArea":
                        admin.handle_request_getRidesPerArea(message, function(err,res){
                            util.log("Correlation ID: " + m.correlationId);
                            // return index sent
                            cnn.publish(m.replyTo, res, {
                                contentType: 'application/json',
                                contentEncoding: 'utf-8',
                                correlationId: m.correlationId
                        });
                    });
                    break;
                }
            });
        });

    //// *******    end   admin Stats module  *****  /////
});