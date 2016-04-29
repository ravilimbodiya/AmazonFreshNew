var mq_client = require('../rpc/client');
var ejs = require("ejs");

exports.index = function(req, res){
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
			res.render("farmerHome", {
				user : req.session.user,
				userType: req.session.userType
			});
		}
		
	} else {
		res.render('index');
	}
};

exports.signIn = function signIn(req,res) {

	ejs.renderFile('./views/signin.ejs',function(err, result) {
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

exports.signUp = function signUp(req,res) {

	ejs.renderFile('./views/signup.ejs',function(err, result) {
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