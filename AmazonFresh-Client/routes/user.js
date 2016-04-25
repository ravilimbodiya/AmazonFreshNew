var mq_client = require('../rpc/client');
var ejs = require("ejs");

exports.signup = function(req, res){
	if (req.session.user) { 
		  console.log('validated user');
		  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		  res.render("customerHome",{user:req.session.user});
	  } else { 
		  res.render('signup', { title: 'Sign up for Amazon Fresh', alertClass: '', msg: '' });
	  }
};