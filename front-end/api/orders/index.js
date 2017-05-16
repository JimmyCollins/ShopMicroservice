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
                console.log("error with ordering "+JSON.stringify(error));
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

/*(function (){
  'use strict';

  var async     = require("async")
    , express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express()

  app.get("/orders", function (req, res, next) {
    console.log("Request received with body: " + JSON.stringify(req.body));
    var logged_in = req.cookies.logged_in;
    if (!logged_in) {
      throw new Error("User not logged in.");
      return
    }

    custId = req.session.customerId;
    async.waterfall([
        function (callback) {
          request(endpoints.ordersUrl + "/orders/search/customerId?sort=date&custId=" + custId, function (error, response, body) {
            if (error) {
              return callback(error);
            }
            console.log("Received response: " + JSON.stringify(body));
            if (response.statusCode == 404) {
              console.log("No orders found for user: " + custId);
              return callback(null, []);
            }
            callback(null, JSON.parse(body)._embedded.customerOrders);
          });
        }
    ],
    function (err, result) {
      if (err) {
        return next(err);
      }
      helpers.respondStatusBody(res, 201, JSON.stringify(result));
    });
  });

  app.get("/orders/*", function (req, res, next) {
    var url = endpoints.ordersUrl + req.url.toString();
    request.get(url).pipe(res);
  });

  app.post("/orders", function(req, res, next) {
    console.log("Request received with body: " + JSON.stringify(req.body));
    var logged_in = req.cookies.logged_in;
    if (!logged_in) {
      throw new Error("User not logged in.");
      return
    }

    custId = req.session.customerId;

    async.waterfall([
        function (callback) {
          request(endpoints.customersUrl + "/" + custId, function (error, response, body) {
            if (error) {
              callback(error);
              return;
            }
            console.log("Received response: " + JSON.stringify(body));
            var jsonBody = JSON.parse(body);
            var customerlink = jsonBody._links.customer.href;
            var addressLink = jsonBody._links.addresses.href;
            var cardLink = jsonBody._links.cards.href;
            var order = {
              "customer": customerlink,
              "address": null,
              "card": null,
              "items": endpoints.cartsUrl + "/" + custId + "/items"
            };
            callback(null, order, addressLink, cardLink);
          });
        },
        function (order, addressLink, cardLink, callback) {
          async.parallel([
              function (callback) {
                console.log("GET Request to: " + addressLink);
                request.get(addressLink, function (error, response, body) {
                  if (error) {
                    callback(error);
                    return;
                  }
                  console.log("Received response: " + JSON.stringify(body));
                  var jsonBody = JSON.parse(body);
                  if (jsonBody._embedded.address[0] != null) {
                    order.address = jsonBody._embedded.address[0]._links.self.href;
                  }
                  callback();
                });
              },
              function (callback) {
                console.log("GET Request to: " + cardLink);
                request.get(cardLink, function (error, response, body) {
                  if (error) {
                    callback(error);
                    return;
                  }
                  console.log("Received response: " + JSON.stringify(body));
                  var jsonBody = JSON.parse(body);
                  if (jsonBody._embedded.card[0] != null) {
                    order.card = jsonBody._embedded.card[0]._links.self.href;
                  }
                  callback();
                });
              }
          ], function (err, result) {
            if (err) {
              callback(err);
              return;
            }
            console.log(result);
            callback(null, order);
          });
        },
        function (order, callback) {
          var options = {
            uri: endpoints.ordersUrl + '/orders',
            method: 'POST',
            json: true,
            body: order
          };
          console.log("Posting Order: " + JSON.stringify(order));
          request(options, function (error, response, body) {
            if (error) {
              return callback(error);
            }
            console.log("Order response: " + JSON.stringify(response));
            console.log("Order response: " + JSON.stringify(body));
            callback(null, response.statusCode, body);
          });
        }
    ],
    function (err, status, result) {
      if (err) {
        return next(err);
      }
      helpers.respondStatusBody(res, status, JSON.stringify(result));
    });
  });

  module.exports = app;
}());*/
