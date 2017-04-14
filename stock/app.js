/**
 * Stock Management Service
 *
 * TODO
 */

var http = require('http');
var url = require('url');
var mysql = require('mysql');

var db = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'root',
    database: 'shop'
});

var server = http.createServer(function (request, response)
{
    var path = url.parse(request.url).pathname;
    var url1 = url.parse(request.url);
    console.log("path: "+path);
    console.log("url: "+url1);

    if (request.method == 'POST')
    {
        switch (path)
        {
            // Add new product
            case "/add":

                console.log("Stock Management Service - Add");

                // TODO

                break;

            // Update an existing product
            case "/update":

                console.log("Stock Management Service - Update");

                // TODO

                break;

            // Delete a product
            case "/delete":

                console.log("Stock Management Service - Delete");

                // TODO

                break;

            // Make a product inactive so it doesn't appear in the UI
            case "/deactivate":

                console.log("Stock Management Service - Deactivate");

                // TODO

                break;
        }
    }
   

});
server.listen(3004);