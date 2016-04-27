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

exports.register = function(req, res){
	var queueName = 'createCustomer_queue';
	if(req.param('userType') === 'farmer'){
		queueName = 'createFarmer_queue';
	}
    var msg_Payload = {
        'ssn': req.param('ssn'),
        'firstName': req.param('firstName'),
        'lastName': req.param('lastName'),
        'email': req.param('email'),
        'password': req.param('password'),
        'address': req.param('address'),
        'city': req.param('city'),
        'state': req.param('state'),
        'zipcode': req.param('zipcode'),
        'cc_no': req.param('cardNumber'),
        'cc_name': req.param('nameOnCard'),
        'cc_expiry': req.param('expiry'),
        'cvv': req.param('cvv')
    };
	    mq_client.make_request(queueName, msg_Payload, function (err, results) {
	        if (err) {
	            console.log('Err: ' + err);
	            res.send(results);
	            throw err;
	        } else {
	            if (results.statusCode == 200) {
	                console.log('Successful creation of User!');
	                res.send(results);
	            } else {
	                console('Error Occured!');
	                res.send(results);
	            }
	        }
	    });
};