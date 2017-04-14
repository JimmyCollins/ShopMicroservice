var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var p = require('path');
//var qs = require('querystring');
var mysql = require('mysql');
var root = __dirname;

var headers = [
    "Product Name", "Price", "Picture", "Buy Button"
];

var db = mysql.createConnection({
    host:     'localhost',
    user:     'root',
    password: 'root',
    database: 'shop'
});

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

            // Add a new product
            case "/newProduct":
                console.log("Inside newProduct");

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {
                    var product = qs.parse(body);

                    // Create SQL
                    var dbInsert = "INSERT INTO products (name, quantity, price, image) VALUES ( '" + product.name + "','" + product.quantity + "','" + product.price + "','" + product.productImage + "');"
                    //console.log(dbInsert.toString());

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
                var query = "SELECT * FROM products ";

                db.query(
                    query,
                    [],
                    function(err, rows) {
                        if (err) throw err;
                        console.log(JSON.stringify(rows, null, 2));
                        response.end(JSON.stringify(rows));
                        console.log("Products sent");
                    }
                );
                break;

            // Get details of a specific product
            case "/getProduct":
                console.log("getProduct");
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
                    console.log(JSON.stringify(product, null, 2));
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
});

server.listen(3002);
