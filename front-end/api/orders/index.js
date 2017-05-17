(function (){
'use strict';

var express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express()

// Add a new order
app.post("/order", function(req, res, body)
{
    var options = {
        uri: endpoints.ordersUrl + "order",
        method: 'POST',
        json: true,
        body: req.body
    };

    request(options, function(error, response, body) {

        if (error !== null )
        {
            console.log("Error with ordering "+JSON.stringify(error));
            res.status(500).send('Internal server error!');
            return;
        }

        if (response.statusCode == 200 && body != null && body != "")
        {
            console.log('order body '+JSON.stringify(body))

            if (body.error)
            {
                console.log("Error with ordering: " + body.error);
                res.status(500);
                res.end();
                return;
            }
        }

        res.end();

    });

});


// Get the list of orders for a particular customer
app.get("/order", function (req, res, next)
{
    var customerId =  req.query.customerId;
    var url = endpoints.ordersUrl + "order?customerId=" + customerId;
    helpers.simpleHttpRequest(url, res, next);
});


// Get details of a specific order
app.get("/orderDetails", function (req, res, next)
{
    var orderId =  req.query.orderId;
    var url = endpoints.ordersUrl + "orderDetails?orderId=" + orderId;
    helpers.simpleHttpRequest(url, res, next);
});


// Get all orders (used in admin panel)
app.get("/allOrders", function (req, res, next)
{
    var url = endpoints.ordersUrl + "allOrders";
    helpers.simpleHttpRequest(url, res, next);
});

module.exports = app;
}());
