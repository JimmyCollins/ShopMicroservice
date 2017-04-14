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
            // Add to stock number for a product
            case "/incrementStock":

                console.log("Stock Management Service - Add");

                // TODO

                break;

            // Take from the stock number for a product i.e. if one is sold
            case "/decrementStock":

                console.log("Stock Management Service - Delete");

                // TODO

                break;
        }
    }
    else
    {
        switch (path)
        {
            // Get the current stock numbers for each product
            case "currentStock":

                // TODO

                break;

            // Get the top 5 best sellers
            case "bestSellers":

                // TODO

                break;
        }
    }

});
server.listen(3004);