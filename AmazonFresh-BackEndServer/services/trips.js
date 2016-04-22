var mysql = require("./mysql");

function create(msg, callback) {
    var createQuery = "insert into trip (trip_id,pickup_location_latitude,pickup_location_longitude," +
        "dropoff_location_latitude,dropoff_location_longitude,date_time,customer_id,driver_id,truck_id)" +
        "values ('" + msg.tripID + "'," + msg.pickupLocationLatitude + "," + msg.pickupLocationLongitude + "," + msg.droppffLocationLatitude + "," +
        msg.droppffLocationLongitude + "','" + msg.dateTime + "','" + msg.customerId + "','" + msg.driverId + "','" + msg.truckId + ")";

    console.log("Create Query: " + createQuery);

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
            console.log("Error Occured in adding a trip!");
            jsonResponses = {"stautsCode": 400};
            callback(null, jsonResponses);
        }
    }, createQuery);
}

function edit(msg, callback) {
    var jsonResponse = {};

    var editQuery = "update amazon.trip where trip_id = '" + msg.trip_id + "' " +
        "set pickup_location_latitude = " + msg.pickupLocationLatitude + ", " +
        "pickup_location_longitude = " + msg.pickupLocationLongitude + ", " +
        "dropoff_location_latitude = " + msg.dropOffLocationLatitude + ", " +
        "dropoff_location_longitude = " + msg.dropOffLocationLongitude + ", " +
        "date_time = '" + msg.dateTime + "'," +
        "customer_id = '" + msg.customerId + "'," +
        "driver_id = '" + msg.driverId + ", " +
        "truck_id = '" + msg.truckId + "';";

    console.log(editQuery);

    mysql.fetchData(function (err, results) {
        if (err) {
            console.log("Err: " + err)
            throw err;
            jsonResponse = {'statusCode': 400};
            callback(null, jsonResponse);
        } else if (results.length > 0) {
            var jsonString = JSON.stringify(results);
            var jsonParse = JSON.parse(jsonString);
            jsonResponses = {"statusCode": 200, result: jsonParse};
            callback(null, jsonResponses);
        } else {
            console.log("Error Occured in adding a trip!");
            jsonResponses = {"stautsCode": 400};
            callback(null, jsonResponses);
        }
    }, editQuery);
}

function deleteTrip(msg,callback){
    var jsonResponse= {};

    var deleteQuery = "delete * from trip where trip_id = '"+msg.tripId+"';";

    console.log("Delete Query: "+deleteQuery);

    mysql.fetchData(function(err,results){
        if(err){
            console.log("Err: "+err);
            throw err;
            jsonResponse = {"statusCode": 400};
        }else if (results.length > 0) {
            var jsonString = JSON.stringify(results);
            var jsonParse = JSON.parse(jsonString);
            jsonResponses = {"statusCode": 200, result: jsonParse};
            callback(null, jsonResponses);
        } else {
            console.log("Error Occured in adding a trip!");
            jsonResponses = {"stautsCode": 400};
            callback(null, jsonResponses);
        }
    },deleteQuery);
}

function getTripsByTruck(msg,callback){
    var jsonResponse= {};

    var getTripByTruckQuery = "select * from trip where truck_id = '"+msg.truckId+"';";

    console.log("Get Trip By Truck Query: "+getTripByTruckQuery);

    mysql.fetchData(function(err,results){
        if(err){
            console.log("Err: "+err);
            throw err;
            jsonResponse = {"statusCode": 400};
        }else if (results.length > 0) {
            var jsonString = JSON.stringify(results);
            var jsonParse = JSON.parse(jsonString);
            jsonResponses = {"statusCode": 200, result: jsonParse};
            callback(null, jsonResponses);
        } else {
            console.log("Error Occured in adding a trip!");
            jsonResponses = {"stautsCode": 400};
            callback(null, jsonResponses);
        }
    },getTripByTruckQuery);
}

function getTripsByDriver(msg,callback){
    var jsonResponse= {};

    var getTripsByDriverQuery = "select * from trip where driver_id = '"+msg.driverId+"';";

    console.log("Get Trip By Truck Query: "+getTripsByDriverQuery);

    mysql.fetchData(function(err,results){
        if(err){
            console.log("Err: "+err);
            throw err;
            jsonResponse = {"statusCode": 400};
        }else if (results.length > 0) {
            var jsonString = JSON.stringify(results);
            var jsonParse = JSON.parse(jsonString);
            jsonResponses = {"statusCode": 200, result: jsonParse};
            callback(null, jsonResponses);
        } else {
            console.log("Error Occured in adding a trip!");
            jsonResponses = {"stautsCode": 400};
            callback(null, jsonResponses);
        }
    },getTripsByDriverQuery);
}

exports.create =create;
exports.edit = edit;
exports.deleteTrip = deleteTrip;
exports.getTripByTruck = getTripsByTruck;
exports.getTripByDriver = getTripsByDriver;







