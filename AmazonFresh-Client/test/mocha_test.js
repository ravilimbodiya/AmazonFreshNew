var request = require('request')
    , express = require('express')
    , assert = require("assert")
    , http = require("http");
app = express();

//Test Check Login
describe('http test', function () {
    it('should not login', function (done) {
        request.post('http://localhost:3000/checkLogin',
            {form: {username: 'ravi@gmail.com', password: '123', userType: 'customer'}},
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            });
    });
});

//Check Redundant Signup
describe('check signup', function () {
    it('should signup', function (done) {
        request.post('http://localhost:3000/register',
            {
                form: {
                    'ssn': "123-45-6789",
                    'firstName': "Ram",
                    'lastName': "Singh",
                    'email': "singh.sahab@email.com",
                    'password': "password",
                    'address': "punjabi gali",
                    'city': "amritsar",
                    'state': "Punjab",
                    'zipcode': "123456",
                    'cc_no': "1234567890",
                    'cc_name': "Ram Singh",
                    'cc_expiry': "2014-09-08",
                    'cvv': "123"
                }
            }, function (error, respose, body) {
                assert.equal(200, respose.statusCode);
                done();
            });
    });
});

//Test Add to Cart Function

describe('add to cart', function () {
    it("should not add to cart", function (done) {
        request.post("http://localhost:3000/addToCart", {
            form: {
                'cust_id': 10,
                'product': "Mango",
                'quantity': 10
            }
        }, function (error, response, body) {
            assert.equal(500, response.statusCode);
            done();
        });
    });
});

//Test get exisiting address

describe('check destroyed session', function () {
    it("should not get session address values", function (done) {
        request.post("http://localhost:3000/getExistingAddress", function (error, response, body) {
            console.log("response :"+response);
            assert.equal(500, response.statusCode);
            done();
        });
    });
});