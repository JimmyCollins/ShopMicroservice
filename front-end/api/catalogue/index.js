(function (){
  'use strict';

  var express   = require("express")
    , request   = require("request")
    , endpoints = require("../endpoints")
    , helpers   = require("../../helpers")
    , app       = express()

    app.get("/catalogue/images*", function (req, res, next)
    {
        var url = endpoints.catalogueUrl + req.url.toString();
        console.log("images url "+url);
        request.get(url)
            .on('error', function(e) { next(e); })
            .pipe(res);
    });

    // Get the product details from the catalogue
    app.get("/getProducts", function (req, res, next)
    {
        var x = endpoints.catalogueUrl+"/getProducts" ;
        console.log("getProducts " + x);
        helpers.simpleHttpRequest(x, res, next);
    });

    app.get("/tags", function(req, res, next)
    {
        helpers.simpleHttpRequest(endpoints.tagsUrl, res, next);
    });

    // Add a new product in the catalogue
    app.post("/newProduct", function(req, res, body)
    {
        var options = {
            uri: endpoints.catalogueUrl + "/newProduct",
            method: 'POST',
            json: true,
            body: req.body
        };

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

            res.end();

        });
    });

    // Deactivate an existing product in the catalogue
    app.post("/deactivateProduct", function(req, res, body)
    {
        var options = {
            uri: endpoints.catalogueUrl + "/deactivateProduct",
            method: 'POST',
            json: true,
            body: req.body
        };

        request(options, function(error, response, body) {

            if (error !== null )
            {
                console.log("Error deactivating product: "+JSON.stringify(error));
                res.status(500).send('Internal server error!');
                return;
            }

            if (response.statusCode == 200 && body != null && body != "")
            {
                if (body.error)
                {
                    console.log("Error deactivating product: " + body.error);
                    res.status(500);
                    res.end();
                    return;
                }
            }

            res.end();

        });

    });

    // Reactivate an existing product in the catalogue
    app.post("/reactivateProduct", function(req, res, body)
    {
        var options = {
            uri: endpoints.catalogueUrl + "/reactivateProduct",
            method: 'POST',
            json: true,
            body: req.body
        };

        request(options, function(error, response, body) {

            if (error !== null )
            {
                console.log("Error reactivating product: "+JSON.stringify(error));
                res.status(500).send('Internal server error!');
                return;
            }

            if (response.statusCode == 200 && body != null && body != "")
            {
                if (body.error)
                {
                    console.log("Error reactivating product: " + body.error);
                    res.status(500);
                    res.end();
                    return;
                }
            }

            res.end();

        });

    });

    // Delete a product from the catalog
    app.post("/deleteProduct", function(req, res, body)
    {
        var options = {
            uri: endpoints.catalogueUrl + "/deleteProduct",
            method: 'POST',
            json: true,
            body: req.body
        };

        request(options, function(error, response, body) {

            if (error !== null )
            {
                console.log("Error deleting product: "+JSON.stringify(error));
                res.status(500).send('Internal server error!');
                return;
            }

            if (response.statusCode == 200 && body != null && body != "")
            {
                if (body.error)
                {
                    console.log("Error deleting product: " + body.error);
                    res.status(500);
                    res.end();
                    return;
                }
            }

            res.end();

        });
    });

  module.exports = app;
}());
