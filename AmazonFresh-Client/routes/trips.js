var mq_client = require('../rpc/client');

function create(req, res) {
    var msg_payload = {
        'tripId': req.param('tripId'),
        'pickupLocationLatitude': req.param('pickupLocationLatitude'),
        'pickupLocationLongitude': req.param('pickupLocationLongitude'),
        'dropoffLocationLatitude': req.param('dropoffLocationLatitude'),
        'dropoffLocationLongitude': req.param('dropoffLocationLongitude'),
        'dateTime': req.param('dateTime'),
        'customerId': req.param('customerId'),
        'driverId': req.param('driverId'),
        'truckId': req.param('truckId')
    };

    mq_client.make_request('createTrip_queue', msg_payload, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            //throw err;
            res.send({'statusCode': 400});
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console.log('Invalid Insert');
                res.send({'statusCode': 400});
            }
        }
    });
};

function edit(req, res) {
    var msg_payload = {
        'tripId': req.param('tripId'),
        'pickupLocationLatitude': req.param('pickupLocationLatitude'),
        'pickupLocationLongitude': req.param('pickupLocationLongitude'),
        'dropoffLocationLatitude': req.param('dropoffLocationLatitude'),
        'dropoffLocationLongitude': req.param('dropoffLocationLongitude'),
        'dateTime': req.param('dateTime'),
        'customerId': req.param('customerId'),
        'driverId': req.param('driverId'),
        'truckId': req.param('truckId')
    };

    mq_client.make_request('editTrip_queue', msg_payload, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            //throw err;
            res.send({'statusCode': 400});
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console.log('Invalid Edit');
                res.send({'statusCode': 400});
            }
        }
    });
};

function deleteTrip(req, res) {
    var msg_payload = {'tripId': req.param('tripId')};

    mq_client.make_request('deleteTrip_queue', msg_payload, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            //throw err;
            res.send({'statusCode': 400});
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console.log('Invalid Delete');
                res.send({'statusCode': 400});
            }
        }
    });
};

function getTripsByTruck(req, res) {
    var msg_payload = {'truckId': req.param('truckId')};

    mq_client.make_request('getTripsByTruck_queue', msg_payload, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            //throw err;
            res.send({'statusCode': 400});
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console.log('Invalid Truck ID!');
                res.send({'statusCode': 400});
            }
        }
    });
};

function getTripsByDriver(req, res) {
    var msg_payload = {'driverId': req.param('driverId')};

    mq_client.make_request('getTripByDriver_queue', msg_payload, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            //throw err;
            res.send({'statusCode': 400});
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console.log('Invalid Driver ID!');
                res.send({'statusCode': 400});
            }
        }
    });
};

exports.create = create;
exports.edit = edit;
exports.deleteTrip = deleteTrip;
exports.getTripByDriver = getTripsByDriver;
exports.getTripByTruck = getTripsByTruck;
