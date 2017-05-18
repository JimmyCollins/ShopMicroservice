(function() {
    'use strict';

    var async = require("async"),
        express = require("express"),
        request = require("request"),
        endpoints = require("../endpoints"),
        helpers = require("../../helpers"),
        app = express(),
        logged_in = "logged_in",
        user_type = "user_type",
        customer_id = "customer_id",
        user_name = "user_name";


    // Get all users
    app.get("/allUsers", function (req, res, next)
    {
        var url = endpoints.usersUrl + "allUsers";
        helpers.simpleHttpRequest(url, res, next);
    });


    // Delete an existing user
    app.post("/deleteUser", function(req, res, next)
    {
        var options = {
            uri: endpoints.usersUrl + "deleteUser",
            method: 'POST',
            json: true,
            body: req.body
        };

        request(options, function(error, response, body) {

            if (error !== null )
            {
                console.log("Error deleting user: "+JSON.stringify(error));
                res.status(500).send('Internal server error!');
                return;
            }

            if (response.statusCode == 200 && body != null && body != "")
            {
                if (body.error)
                {
                    console.log("Error deleting user: " + body.error);
                    res.status(500);
                    res.end();
                    return;
                }
            }

            res.end();

        });
    });


    // Register a new user
    app.post("/register", function(req, res, next) {
        var options = {
            uri: endpoints.usersUrl + "register",
            method: 'POST',
            json: true,
            body: req.body
        };

        console.log("Posting Customer: " + JSON.stringify(req.body));
        request(options, function(error, response, body) {
            if (error !== null ) {
                console.log("error "+JSON.stringify(error));
                return;
            }
            if (response.statusCode == 200 &&
                body != null && body != "") {
                if (body.error) {
                    console.log("Error with log in: " + err);
                    res.status(500);
                    res.end();
                    return;
                }
                console.log(body);
                var customerId = body.id;
                console.log(customerId);
                req.session.customerId = customerId;
                //console.log("set cookie" + customerId);
                res.status(200);
                /*res.cookie(cookie_name, req.session.id, {
                 maxAge: 3600000
                 }).send({id: customerId});
                 console.log("Sent cookies.");*/
                res.end();
                return;
            }
            console.log(response.statusCode);

        });

    });


    // Log a user into the site
    app.post("/login", function(req, res, next) {
        var options = {
            uri: endpoints.usersUrl + "login",
            method: 'POST',
            json: true,
            body: req.body
        };

        console.log("Posting Customer: " + JSON.stringify(req.body));

        request(options, function(error, response, body) {

            if (error !== null )
            {
                console.log("error "+JSON.stringify(error));
                return;
            }

            if (response.statusCode == 200 && body != null && body != "")
            {
                console.log('body '+JSON.stringify(body))

                if (body.error)
                {
                    console.log("Error with log in: " + body.error);
                    res.status(500);
                    res.end();
                    return;
                }

                var customerId = body.customerId;
                var usertype = body.usertype;
                var name = body.username;

                req.session.customerId = customerId;
                req.session.usertype = usertype;
                req.session.username = name;

                // Set some cookies we need

                // The session ID
                res.cookie(logged_in, req.session.id, {
                    maxAge: 14400000
                });

                // The customer ID
                res.cookie(customer_id, req.session.customerId, {
                    maxAge: 14400000
                });

                // The user type
                res.cookie(user_type, req.session.usertype, {
                    maxAge: 14400000
                });

                // The user name
                res.cookie(user_name, req.session.username, {
                    maxAge: 14400000
                });

                res.status(200);

                res.end();
                return;
            }
            console.log(response.statusCode);

        });

    });


    // Make a user an administrator
    app.post("/makeUserAdmin", function(req, res, next)
    {
        var options = {
            uri: endpoints.usersUrl + "makeUserAdmin",
            method: 'POST',
            json: true,
            body: req.body
        };

        request(options, function(error, response, body) {

            if (error !== null )
            {
                console.log("Error making user administrator: "+JSON.stringify(error));
                res.status(500).send('Internal server error!');
                return;
            }

            if (response.statusCode == 200 && body != null && body != "")
            {
                if (body.error)
                {
                    console.log("Error making user administrator: " + body.error);
                    res.status(500);
                    res.end();
                    return;
                }
            }

            res.end();

        });
    });


    // Revoke a users administrator access
    app.post("/revokeUserAdmin", function(req, res, next)
    {
        var options = {
            uri: endpoints.usersUrl + "revokeUserAdmin",
            method: 'POST',
            json: true,
            body: req.body
        };

        request(options, function(error, response, body) {

            if (error !== null )
            {
                console.log("Error revoking user administrator privileges: "+JSON.stringify(error));
                res.status(500).send('Internal server error!');
                return;
            }

            if (response.statusCode == 200 && body != null && body != "")
            {
                if (body.error)
                {
                    console.log("Error revoking user administrator privileges: " + body.error);
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
