var mysql = require("./mysql");

function add(msg, callback) {
    var createQuery = "insert into truck (truck_id,driver_id,first_name,last_name,address,city,state,zipcode,phone_number,truck_name,truck_model,last_location_latitude,last_location_longitude," +
        "delivery_history,date_time,dropoff_location_latitude,dropoff_location_longitude)" +
        "values ('" + msg.truckID + "','" + msg.driverID + "','" + msg.firstName + "','" + msg.lastName + "','" + msg.address + "','" + msg.city + "','" + msg.state + "','" + msg.zipcode + "','" + msg.phoneNumber + "','" + msg.truckName + "','" + msg.truckModel + "','" +  msg.lastLocationLongitude + "'," +
        		msg.deliveryHistory +",'" + msg.dateTime + "','" + msg.dropoffLocationLatitude + "','" + msg.dropoffLocationLongitude + "')";

    console.log("Add Query: " + add);

    var jsonResponses = {};
    mysql.fetchData(function (err, results) {
        if (err) {
            console.log("ERR: " + err);
            jsonResponses = {statusCode: 400};
            callback(null, jsonResponses);
            throw err;
        } else if (results.length > 0) {
            var jsonString = JSON.stringify(results);
            var jsonParse = JSON.parse(jsonString);
            jsonResponses = {"statusCode": 200, result: jsonParse};
            callback(null, jsonResponses);
        } else {
            console.log("Error Occured in adding a truck!");
            jsonResponses = {"stautsCode": 400};
            callback(null, jsonResponses);
        }
    }, add);
}

function update(msg, callback) {
    var jsonResponses = {};

    var updateQuery = "update truck where truck_id = '" + msg.trip_id + "' " +
        "set driver_id = " + msg.driverId + ", " +
        "first_name = " + msg.firstName + ", " +
        "last_name = " + msg.last_name + ", " +
        "address = " + msg.address + ", " +
        "city = '" + msg.city + "'," +
        "state = '" + msg.state + "'," +
        "zipcode = '" + msg.zipcode + ", " +
        "phone_number = '" + msg.phoneNumber + "',"+"truck_name = '" + msg.phoneNumber +"';";

    console.log(updateQuery);

    mysql.fetchData(function (err, results) {
        if (err) {
            console.log("Err: " + err);
            //throw err;
            jsonResponses = {'statusCode': 400};
            callback(null, jsonResponses);
        } else if (results.length > 0) {
            var jsonString = JSON.stringify(results);
            var jsonParse = JSON.parse(jsonString);
            jsonResponses = {"statusCode": 200, result: jsonParse};
            callback(null, jsonResponses);
        } else {
            console.log("Error Occured in updating a truck!");
            jsonResponses = {"stautsCode": 400};
            callback(null, jsonResponses);
        }
    }, updateQuery);
}

function deleteTruck(msg,callback){
    var jsonResponses= {};

    var deleteQuery1 = "delete * from truck where truck_id = '"+msg.truckId+"';";

    console.log("Delete Query: "+deleteQuery1);

    mysql.fetchData(function(err,results){
        if(err){
            console.log("Err: "+err);
            //throw err;
            jsonResponses = {"statusCode": 400};
            callback(null, jsonResponses);
        }else if (results.length > 0) {
            var jsonString = JSON.stringify(results);
            var jsonParse = JSON.parse(jsonString);
            jsonResponses = {"statusCode": 200, result: jsonParse};
            callback(null, jsonResponses);
        } else {
            console.log("Error Occured in deleting a truck!");
            jsonResponses = {"stautsCode": 400};
            callback(null, jsonResponses);
        }
    },deleteQuery1);
}

function currentLocation(msg,callback){
    var jsonResponses= {};

    var currentLocation = "select * from trip where truck_id = '"+msg.truckId+"';";

    console.log("Get Truck Location: "+currentLocation);

    mysql.fetchData(function(err,results){
        if(err){
            console.log("Err: "+err);
            //throw err;
            jsonResponses = {"statusCode": 400};
            callback(null, jsonResponses);
        }else if (results.length > 0) {
            var jsonString = JSON.stringify(results);
            var jsonParse = JSON.parse(jsonString);
            jsonResponses = {"statusCode": 200, result: jsonParse};
            callback(null, jsonResponses);
        } else {
            console.log("Error Occured in getting truck location!");
            jsonResponses = {"stautsCode": 400};
            callback(null, jsonResponses);
        }
    },currentLocation);
}

exports.add =add;
exports.update = update;
exports.deleteTruck = deleteTruck;
exports.currentLocation= currentLocation;