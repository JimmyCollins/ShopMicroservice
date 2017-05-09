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

    // TODO

    module.exports = app;
}());