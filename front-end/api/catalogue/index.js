(function (){
  'use strict';

  var express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express()

    app.get("/catalogue/images*", function (req, res, next) {
        var url = endpoints.catalogueUrl + req.url.toString();
        console.log("images url "+url);
        request.get(url)
            .on('error', function(e) { next(e); })
            .pipe(res);
    });

    app.get("/getProducts", function (req, res, next) {
        var x = endpoints.catalogueUrl+"/getProducts" ;//+ req.url.toString();
        console.log("getProducts "+x);
        helpers.simpleHttpRequest(x
         , res, next);
    });

    app.get("/tags", function(req, res, next) {
        helpers.simpleHttpRequest(endpoints.tagsUrl, res, next);
    });

    app.post("/newProduct", function(req, res, body)
    {
        var options = {
            uri: endpoints.catalogueUrl + "/newProduct",
            method: 'POST',
            json: true,
            body: req.body
        };

        console.log("Posting New Product: " + JSON.stringify(req.body));

        request(options, function(error, response, body) {

            if (error !== null )
            {
                console.log("Error with adding new product: "+JSON.stringify(error));
                res.status(500).send('Internal server error!');
                return;
            }

            if (response.statusCode == 200 && body != null && body != "")
            {
                if (body.error)
                {
                    console.log("Error with adding new product: " + body.error);
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
