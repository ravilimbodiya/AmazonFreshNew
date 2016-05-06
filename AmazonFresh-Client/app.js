
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , index = require('./routes/index')
  , home = require('./routes/home')
  , login = require('./routes/login')
  , user = require('./routes/user')
  , billing = require('./routes/billing')
  , customer = require('./routes/customer')
  , order = require('./routes/order')
  , trips = require('./routes/trips')
  , sessionMgmt = require('./routes/sessionMgmt')
  , farmer = require('./routes/farmer')
  , admin = require('./routes/admin') 
  , product = require('./routes/product');

//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://localhost:27017/Amazonfresh";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");

var app = express();

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

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//GET
// Customer Module
app.get('/', routes.index); 
app.get('/signin',index.signIn);
app.get('/signup', index.signUp);
app.get('/homepage', login.redirectToHomepage);
app.get('/logout', login.logout);
app.get('/showProduct/:productId', sessionMgmt.restrict, product.showProductDescription);
app.get('/shoppingCart',  sessionMgmt.restrict, order.showShoppingCart);
app.get('/checkout',  sessionMgmt.restrict, order.checkout);
app.get('/makePayment',  sessionMgmt.restrict, order.makePayment);
app.get('/viewPurchaseHistory',  sessionMgmt.restrict, order.viewPurchaseHistory);
app.post('/checkLogin', login.checkLogin);
app.post('/register', user.register);
app.post('/listAllProducts',  sessionMgmt.restrict, product.listAllProduct);
app.post('/addToCart',  sessionMgmt.restrict, order.addToCart);
app.post('/getShoppingCart',  sessionMgmt.restrict, order.getShoppingCart);
app.post('/removeItemFromCart',  sessionMgmt.restrict, order.removeItemFromCart);
app.post('/placeOrder',  sessionMgmt.restrict, order.placeOrder);
app.post('/getExistingAddress',  sessionMgmt.restrict, customer.getExistingAddress);
app.post('/getAllOrders',  sessionMgmt.restrict, order.getAllOrders);
app.post('/getAllOrdersByCustId',  sessionMgmt.restrict, order.getAllOrdersByCustId);
app.get('/searchProduct/:keyword',  sessionMgmt.restrict, product.displayProductSearchResult);
app.post('/searchProductByAttribute',  sessionMgmt.restrict, product.searchProductByAttribute);
app.post('/postReviewRating',  sessionMgmt.restrict, product.postReviewRating);
app.post('/getcurrentcustomer', sessionMgmt.restrict, customer.getcurrentCustomer);
app.get('/editprofilecustomer1',sessionMgmt.restrict, customer.redirectToeditprofileCustomer);
app.post('/editProfilecustomer2',sessionMgmt.restrict, customer.editProfilecustomer);

//Farmer module
app.get('/farmerDashboard',  sessionMgmt.restrict, farmer.farmerDashboard);
app.get('/addProduct',  sessionMgmt.restrict, farmer.addProduct);
app.get('/loadProducts',  sessionMgmt.restrict, farmer.loadProducts);
app.post('/renderAddProduct',  sessionMgmt.restrict, farmer.renderAddProduct);
app.post('/submitAddProduct',  sessionMgmt.restrict, farmer.submitAddProduct);
app.get('/editprofile',sessionMgmt.restrict, farmer.redirectToeditprofile);
app.post('/editProfilefarmer',sessionMgmt.restrict, farmer.editProfilefarmer);
app.post('/getcurrentfarmer',sessionMgmt.restrict, farmer.getcurrentFarmer);
app.get('/renderFeedback/:prodId', sessionMgmt.restrict, farmer.renderFeedback);
app.post('/viewFeedback', sessionMgmt.restrict, farmer.viewFeedback);
app.post('/renderEditProduct', sessionMgmt.restrict,farmer.renderEditProduct);
app.get('/farmerEditProduct', sessionMgmt.restrict,farmer.farmerEditProduct);
app.post('/submitUpdateProduct', sessionMgmt.restrict,farmer.submitUpdateProduct);
app.get('/deleteProduct/:prodId', sessionMgmt.restrict,farmer.deleteProduct);
app.get('/deleteCustomer/:custId', admin.deleteCustomer);

//Admin module
app.get('/admin', index.adminSignIn);
app.post('/adminLogin', index.checkAdminLogin);
app.get('/adminDashboard',  sessionMgmt.restrict, index.adminDashboard);
app.get('/adminGetFarmerList',  sessionMgmt.restrict, admin.adminGetFarmerList);
app.get('/adminGetFarmerApprovalPendingList',  sessionMgmt.restrict, admin.adminGetFarmerApprovalPendingList);
app.get('/adminApproveFarmer',  sessionMgmt.restrict, admin.adminApproveFarmer);
app.get('/adminDisapproveFarmer',  sessionMgmt.restrict, admin.adminDisapproveFarmer);
app.get('/adminGetFarmerSearchList',  sessionMgmt.restrict, admin.adminGetFarmerSearchList);
app.get('/adminGetCustomerList',  sessionMgmt.restrict, admin.adminGetCustomerList);
app.get('/adminGetCustomerApprovalPendingList',  sessionMgmt.restrict, admin.adminGetCustomerApprovalPendingList);
app.get('/adminApproveCustomer',  sessionMgmt.restrict, admin.adminApproveCustomer);
app.get('/adminDisapproveCustomer',  sessionMgmt.restrict, admin.adminDisapproveCustomer);
app.get('/adminGetCustomerSearchList',  sessionMgmt.restrict, admin.adminGetCustomerSearchList);

app.post('/getAllOrdersForAdmin',  sessionMgmt.restrict, admin.getAllOrdersForAdmin);
app.get('/adminGetProductList',  sessionMgmt.restrict, admin.adminGetProductList);
app.get('/adminGetProductApprovalPendingList',  sessionMgmt.restrict, admin.adminGetProductApprovalPendingList);
app.get('/adminApproveProduct',  sessionMgmt.restrict, admin.adminApproveProduct);
app.get('/adminDisapproveProduct',  sessionMgmt.restrict, admin.adminDisapproveProduct);
app.get('/adminGetProductSearchList',  sessionMgmt.restrict, admin.adminGetProductSearchList);
app.get('/adminGetBillingList', sessionMgmt.restrict, admin.adminGetBillingList);
app.get('/adminGetBillingSearchList', sessionMgmt.restrict, admin.adminGetBillingSearchList);
app.get('/adminGetUniqueProductTypes', sessionMgmt.restrict,admin.adminGetUniqueProductTypes);
app.get('/adminGetUniqueProducts', sessionMgmt.restrict,admin.adminGetUniqueProducts);
app.get('/adminApplyDPForProductType', sessionMgmt.restrict,admin.adminApplyDPForProductType);
app.get('/adminApplyDPForProduct', sessionMgmt.restrict,admin.adminApplyDPForProduct);
app.get('/farmers/:farmerId', sessionMgmt.restrict,admin.viewFarmerProfile);
app.get('/customers/:custId', sessionMgmt.restrict,admin.viewCustomerProfile);
app.get('/adminGetRevenuePerWeek', admin.adminGetRevenuePerWeek);
app.get('/adminGetRidesPerArea', admin.adminGetRidesPerArea);

app.use(function(req, res, next) {
	res.render('error');
});


//connect to the mongo collection session and then createServer
mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});