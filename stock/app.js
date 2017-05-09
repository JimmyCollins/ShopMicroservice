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

    if (request.method == 'POST')
    {
        switch (path)
        {
            // Add to stock number for a product
            case "/incrementStock":

                console.log("Stock Management Service - Add");

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var stockData = JSON.parse(body);
                    console.log(stockData);

                    var updateStockQuery = "UPDATE products set quantity=" + stockData.newStockLevel + " WHERE productID=" + stockData.productId;
                    console.log(query);

                    db.query(updateStockQuery, function(err, result) {
                        if (err) {
                            console.log("Error updating stock: " + err);
                            throw err;
                        }

                        response.end();
                    });

                });

                response.writeHead(200, {
                    'Access-Control-Allow-Origin': '*'
                });

                break;

            // Take from the stock number for a product i.e. if one is sold
            case "/decrementStock":

                console.log("Stock Management Service - Delete");

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var stockData = JSON.parse(body);
                    console.log(stockData);

                    // Might need to not do the calculation for the new stock level in front-end and do it here?

                    var updateStockQuery = "UPDATE products set quantity=" + stockData.newStockLevel + " WHERE productID=" + stockData.productId;
                    console.log(query);

                    db.query(updateStockQuery, function(err, result) {
                        if (err) {
                            console.log("Error updating stock: " + err);
                            throw err;
                        }

                        response.end();
                    });

                });

                response.writeHead(200, {
                    'Access-Control-Allow-Origin': '*'
                });

                break;
        }
    }
    else
    {
        switch (path)
        {
            // Get the current stock numbers for each product
            case "/currentStock":

                console.log("currentStock");

                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });

                var query = "SELECT productID, name, quantity FROM products ";  // TODO: Where active is 1

                db.query(
                    query,
                    [],
                    function(err, rows) {
                        if (err) throw err;
                        console.log(JSON.stringify(rows, null, 2));
                        response.end(JSON.stringify(rows));
                        console.log("Stock details sent");
                    }
                );
                break;

                break;

            // Get the top 5 best sellers
            case "/bestSellers":

                // TODO

                break;
        }
    }

});
server.listen(3004);
console.log("Stock service running on Port 3004");