//WITH CONNECTION POOLING
/*var ejs= require('ejs');
var mysql = require('mysql');
var pool =[];
function getConnection(){
	return mysql.createConnection({
	    host     : 'localhost',
	    user     : 'root',
	    password : 'Welcom@123',
	    database : 'Amazonfresh',
	    port	 : 3306
	});
}
var dbpool = {
	"maxsize": 50
};
var createConnectionPool= function createConnectionPool(){
	for(var i=0; i<dbpool.maxsize;i++){
		pool.push(getConnection());
	}
};
function getConnectionFromPool(){
	if(pool.length<=0){
		console.log("Empty connection pool!");
		return null;
	}
	else{
		return pool.pop();
	}
}
function fetchData(callback,sqlQuery, params){
	console.log("\nSQL Query::"+sqlQuery);
	var connection=getConnectionFromPool();
	connection.query(sqlQuery, params, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}

exports.insertData = function(callback,sqlQuery, params){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnectionFromPool();
	
	connection.query(sqlQuery, params, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
};*/


//WITHOUT CONNECTION POOLING
var ejs = require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port
function getConnection() {
    console.log('in connection');
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Welcom@123',
        database: 'Amazonfresh',
        port: 3306
    });
    return connection;
}

function fetchData(callback,sqlQuery, params){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, params, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}

exports.insertData = function(callback,sqlQuery, params){
	
	console.log("\nSQL Query::"+sqlQuery);
	
	var connection=getConnection();
	
	connection.query(sqlQuery, params, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}


exports.fetchData = fetchData;
