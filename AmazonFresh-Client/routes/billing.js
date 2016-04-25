var mq_client = require('../rpc/client');

exports.deleteBill = function deleteBill(req, res) {
    var msg_payLoad = {
        'billId': req.param('billId')
    };

    mq_client.make_request('deleteBill_queue', msg_payLoad, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            //throw err;
            res.send({'statusCode': 400});
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console.log('Error Occured!');
                res.send({'statusCode': 400});
            }
        }
    });
};

exports.searchBill = function searchBill(req, res) {
    var msg_payLoad = {
        'billId': req.param('billId')
    };

    mq_client.make_request('deleteBill_queue', msg_payLoad, function (err, results) {
        if (err) {
            console.log('Err: ' + err);
            //throw err;
            res.send({'statusCode': 400});
        } else {
            if (results.statusCode == 200) {
                res.send(results);
            } else {
                console.log('Error Occured!');
                res.send({'statusCode': 400});
            }
        }
    });
};
