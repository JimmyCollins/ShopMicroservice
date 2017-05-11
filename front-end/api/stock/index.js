(function (){
    'use strict';

    var express   = require("express")
        , request   = require("request")
        , endpoints = require("../endpoints")
        , helpers   = require("../../helpers")
        , app       = express()

    // Get the stock levels for all products
    app.get("/stockLevels", function (req, res, next)
    {
        var url = endpoints.stockUrl + "currentStock";
        helpers.simpleHttpRequest(url, res, next);
    });


    // Add to the level of stock for a particular product
    app.post("/addStock", function(req, res, body)
    {
        var options = {
            uri: endpoints.stockUrl + "incrementStock",
            method: 'POST',
            json: true,
            body: req.body
        };

        request(options, function(error, response, body) {

            if (error !== null )
            {
                console.log("Error with adding to stock "+JSON.stringify(error));
                res.status(500).send('Internal server error!');
                return;
            }

            if (response.statusCode == 200 && body != null && body != "")
            {
                if (body.error)
                {
                    console.log("Error with adding to stock: " + body.error);
                    res.status(500);
                    res.end();
                    return;
                }

            }

            console.log("Status Code: " + response.statusCode);
            res.end();

        });
    });


    // Take from the level of stock for a particular product
    app.post("/removeStock", function(req, res, body)
    {
        var options = {
            uri: endpoints.stockUrl + "decrementStock",
            method: 'POST',
            json: true,
            body: req.body
        };

        request(options, function(error, response, body) {

            if (error !== null )
            {
                console.log("Error with removing from stock "+JSON.stringify(error));
                res.status(500).send('Internal server error!');
                return;
            }

            if (response.statusCode == 200 && body != null && body != "")
            {
                if (body.error)
                {
                    console.log("Error with removing from stock: " + body.error);
                    res.status(500);
                    res.end();
                    return;
                }
            }

            console.log("Status Code: " + response.statusCode);
            res.end();

        });
    });


    module.exports = app;
}());