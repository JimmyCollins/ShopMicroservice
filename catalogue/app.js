var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var p = require('path');
//var qs = require('querystring');
var mysql = require('mysql');
var root = __dirname;

var port = (process.env.VCAP_APP_PORT || 3002);
console.log("Catalogue Service - process.env.VCAP_APP_PORT " + port);
console.log("Catalogue Service - process.env.PORT " + process.env.PORT);

var host = (process.env.VCAP_APP_HOST || 'localhost');
console.log("Catalogue Service - Host is " + host);

if (process.env.VCAP_SERVICES)
{
    console.log("Catalogue Service - in if VCAP_SERVICES");

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

            console.log("DB Name: " + mysqlCreds.name);
            console.log("DB Host: " + mysqlCreds.hostname);
            console.log("DB Port: " + mysqlCreds.port);
            console.log("DB User: " + mysqlCreds.username);
            console.log("DB Password: " + mysqlCreds.password);

        }
    }
}
else
{
    console.log("Catalogue Service - VCAP_SERVICES not found");
    var db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'shop'
    });
}

var headers = [
    "Product Name", "Price", "Picture", "Buy Button"
];

var cart = [];
var theuser=null;
var theuserid =null;
var server = http.createServer(function (request, response)
{
    var path = url.parse(request.url).pathname;
    var url1 = url.parse(request.url);

    if (request.method == 'POST')
    {
        switch (path)
        {
            // Assignment Part 3 (b) - Handle the new product in the catalogue service

            // Add a new product to the catalogue
            case "/newProduct":
                console.log("Inside newProduct");

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var product = JSON.parse(body);

                    // Create SQL
                    var dbInsert = "INSERT INTO products (name, quantity, price, image, description) VALUES ( '" + product.name + "','" + product.quantity + "','" + product.price +
                        "','" + product.productImage + "','" + product.description + "');"
                    console.log(dbInsert.toString());

                    // Execute SQL
                    db.query(
                        dbInsert,
                        [],
                        function(err, result) {
                            if (err) throw err;
                            console.log(JSON.stringify(result, null, 2));
                            response.end(JSON.stringify(result));
                            console.log("Product added!");
                        }
                    );
                });

                break;

            // Delete a product from the catalogue
            case "/deleteProduct":

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var product = JSON.parse(body);

                    var query = "DELETE from products where productID=" + product.productId;

                    // Execute SQL
                    db.query(
                        query,
                        [],
                        function(err, result) {
                            if (err) throw err;
                            console.log(JSON.stringify(result, null, 2));
                            response.end(JSON.stringify(result));
                            console.log("Product deleted!");
                        }
                    );

                });

                break;

            // Deactivate a product (but leave it in the catalogue)
            case "/deactivateProduct":

                console.log("Inside deactivateProduct");

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var product = JSON.parse(body);

                    var query = "UPDATE products SET active=0 where productID=" + product.productId;

                    // Execute SQL
                    db.query(
                        query,
                        [],
                        function(err, result) {
                            if (err) throw err;
                            console.log(JSON.stringify(result, null, 2));
                            response.end(JSON.stringify(result));
                            console.log("Product deactivated!");
                        }
                    );

                });

                break;


            // Reactivate an inactive product
            case "/reactivateProduct":

                console.log("Inside reactivateProduct");

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var product = JSON.parse(body);

                    var query = "UPDATE products SET active=1 where productID=" + product.productId;

                    // Execute SQL
                    db.query(
                        query,
                        [],
                        function(err, result) {
                            if (err) throw err;
                            console.log(JSON.stringify(result, null, 2));
                            response.end(JSON.stringify(result));
                            console.log("Product reactivated!");
                        }
                    );

                });

                break;

            // Return details of a specific product
            case "/getProduct":
                console.log("In getProduct");
                var body="";
                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {
                    var product = JSON.parse(body);
                    response.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Access-Control-Allow-Origin': '*'
                    });
                    console.log("getProduct JSON received" + JSON.stringify(product, null, 2));
                    var query = "SELECT * FROM products where productID="+
                        product.id;

                    db.query(
                        query,
                        [],
                        function(err, rows) {
                            if (err) throw err;
                            console.log(JSON.stringify(rows, null, 2));
                            response.end(JSON.stringify(rows[0]));
                            console.log("Products sent");
                        }
                    );

                });
                break;
        }
    }
    else
    {
        switch (path)
        {
            // Get the list of available products in the database
            case "/getProducts":
                console.log("getProducts");
                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });
                var query = "SELECT * FROM products WHERE active=1";

                db.query(
                    query,
                    [],
                    function(err, rows) {
                        if (err) throw err;
                        //console.log(JSON.stringify(rows, null, 2));
                        response.end(JSON.stringify(rows));
                        //console.log("Products sent");
                    }
                );
                break;
        }
    }
});

server.listen(port);
console.log("Catalogue service running on port " + port);