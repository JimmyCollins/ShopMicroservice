/**
 * Stock Management Service
 * Provides functionality for managing stock levels
 */

var http = require('http');
var url = require('url');
var mysql = require('mysql');

var port = (process.env.VCAP_APP_PORT || 3004);

if (process.env.VCAP_SERVICES)
{
    var services = JSON.parse(process.env.VCAP_SERVICES);

    for (var svcName in services)
    {
        if (svcName.match(/^cleardb/))
        {
            var mysqlCreds = services[svcName][0]['credentials'];
            var db = mysql.createConnection({
                host: mysqlCreds.hostname,
                port: mysqlCreds.port,
                user: mysqlCreds.username,
                password: mysqlCreds.password,
                database: mysqlCreds.name
            });
        }
    }
}
else
{
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'shop'
    });
}

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

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var stockData = JSON.parse(body);
                    console.log(stockData);

                    var updateStockQuery = "UPDATE products set quantity=" + stockData.newStockLevel + " WHERE productID=" + stockData.productId;

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

            // Take from the stock number for a product
            case "/decrementStock":

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var stockData = JSON.parse(body);
                    console.log(stockData);

                    // Get the current stock level for the product
                    var getStockLevelQuery = "SELECT quantity from products where productID=" + stockData.productId;

                    db.query(getStockLevelQuery, function(err, rows)
                    {
                        if (err)
                        {
                            console.log("Error getting existing stock level: " + err);
                            throw err;
                        }

                        var currentStockLevel = rows[0].quantity;
                        var stockToRemove = stockData.removedStock;
                        var newStockLevel = Number(currentStockLevel) - Number(stockToRemove);
                        var updateStockQuery = "UPDATE products set quantity=" + newStockLevel + " WHERE productID=" + stockData.productId;

                        db.query(updateStockQuery, function(err, result)
                        {
                             if (err)
                             {
                                 console.log("Error updating stock: " + err);
                                 throw err;
                             }

                             response.end();
                        });

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

                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });

                var query = "SELECT productID, name, quantity, price, active FROM products";

                db.query(
                    query,
                    [],
                    function(err, rows) {
                        if (err) throw err;
                        console.log(JSON.stringify(rows, null, 2));
                        response.end(JSON.stringify(rows));
                    }
                );

                break;
        }

    }

});
server.listen(port);
console.log("Stock service running on Port: " + port);