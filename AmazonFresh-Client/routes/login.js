/**
 * Routes file for Login
 */
var mq_client = require('../rpc/client');
var ejs = require("ejs");

exports.login = function(req, res) {
	if (req.session.user) {
		console.log('validated user');
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("profileHome", {
			user : req.session.user
		});
	} else {
		res.render('login', {
			title : 'Log in to AmazonFresh',
			alertClass : '',
			msg : ''
		});
	}
};

//Check login - called when '/checklogin' POST call given from AngularJS module in login.ejs
exports.checkLogin = function(req, res) {
	if (req.session.user) {
		console.log('validated user');
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.send({"statusCode": 200});
	} else {
		var json_responses;
		var email = req.param("email");
		var pass = req.param("password");
		var userType = req.param("userType");
		if (!module.parent)
			console.log('authenticating %s:%s', email, pass);
		var msg_payload = { "email": email, "password": pass, "userType": userType };
		mq_client.make_request('checkLogin_queue', msg_payload, function(err,results){
			console.log(results);
			if(err){
				throw err;
			}
			else 
			{
				if(results.statusCode === 200){
					console.log("valid Login");
					req.session.user = results.userObj;
					req.session.userType = results.userType;
					req.session.shoppingCart = results.shoppingCart;
					res.send(results);
				}
				else {    
					console.log("Invalid Login");
					res.send(results);
				}
			}  
		});
	}
};

//Redirects to the homepage
exports.redirectToHomepage = function(req, res) {
	//Checks before redirecting whether the session is valid
	if (req.session.user) {
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		var uType = req.session.userType;
		if(uType === 'customer'){
			res.render("customerHome", {
				user : req.session.user,
				userType: req.session.userType
			});
		} else if(uType === 'farmer'){
			res.render("farmerDashboard", {
				user : req.session.user,
				userType: req.session.userType
			});
		}
		
	} else {
		res.redirect('/');
	}
};

//Logout the user - invalidate the session
exports.logout = function(req, res) {
	req.session.destroy();
	res.redirect('/');
};
