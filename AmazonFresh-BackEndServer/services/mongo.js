//WITH CONNECTION POOLING
/*var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
exports.ObjectId = require('mongodb').ObjectID;
var mongoURL = "mongodb://localhost:27017/Amazonfresh";
var connPool = [];
var connInUse = [];
function addNewConnectionToPool(){
	return MongoClient.connect(mongoURL, function(err, _db){
		console.log("Creating a new connection in the pool with MongoDB at : "+mongoURL);
	    if (err) { throw new Error('Could not connect: '+err); }
	    db = _db;
	    // Adding the connection to the pool.
	    connPool.push(db);
	    connected = true;
	    console.log(connected +" is connected?");
	  });
} 
var dbPool = {
	"maxPoolSize": 100
};
var createConnectionPool = function createConnectionPool(){
	for(var i = 0; i < dbPool.maxPoolSize; i++){
		addNewConnectionToPool();
	}
};
createConnectionPool();
exports.connect = function(url, callback){
	console.log('CONNECTION POOL : '+connPool.length);
	if(connPool.length > 0){
		callback(connPool.pop());
    } else {
    	console.log("Connection pool is empty. Filling connection pool to its full capacity.");
    	this.createConnectionPool();
    	callback(connPool.pop());
    }
	console.log("pool connect length: "+connPool.length);
};

exports.releaseConnection = function(conn){
	if (!connected) {
	      throw new Error('Must connect to Mongo before releasing connection');
	    } 
	if(connPool.length < dbPool.maxPoolSize){
	  	connPool.push(conn);
	  	console.log("pool release length: "+connPool.length);
	} 
};*/

//WITHOUT CONNECTION POOLING
var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;

exports.connect = function(url, callback){
    MongoClient.connect(url, function(err, _db){
      if (err) { throw new Error('Could not connect: '+err); }
      db = _db;
      connected = true;
      console.log(connected +" is connected?");
      callback(db);
    });
};

exports.collection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    } 
    return db.collection(name);
  
};