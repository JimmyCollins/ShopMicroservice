/**
 * Order Service
 *
 * Handles saving/retrieving user orders
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
    //console.log("path: "+path);
    //console.log("url: "+url1);

    if (request.method == 'POST')
    {
        //console.log("method is POST");

        switch (path)
        {
            // Add a new order
            case "/order":

                console.log("Orders service - new order");

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var orderData = JSON.parse(body);

                    // TODO: Call into stock service to check for levels of stock?
                    // Or do this earlier?

                    console.log("Order data: \n" + JSON.stringify(orderData, null, 2));

                    // Insert into orders table
                    var saleDate = getDate();

                    var ordersQuery = "INSERT into orders (customerId, saledate, status)" +
                            " VALUES (" + orderData.customerId +",'" + saleDate + "','" + "Processing" + "')";

                    console.log(ordersQuery);

                    db.query(ordersQuery, function(err, result)
                    {
                        if (err)
                        {
                            console.log("Error adding to orders table: " + err);
                            throw err;
                        }

                        var orderId = result.insertId;
                        //console.log("Inserted OrderId = " + orderId);

                        // Insert order details
                        for (var i=0; i < orderData.order.length; i++)
                        {
                            var productId = orderData.order[i].productId;
                            var quantity = orderData.order[i].quantity;

                            var orderDetailsQuery = "INSERT into orderdetails (orderID, productID, quantity)" +
                                "VALUES (" + orderId + "," + productId + "," + quantity +")";

                            console.log(orderDetailsQuery);

                            db.query(orderDetailsQuery, function(err, result)
                            {
                                if (err)
                                {
                                    console.log("Error adding to orderdetails table: " + err);
                                    throw err;
                                }
                            });

                        }

                        console.log("ending...");
                        //response.statusCode =  200;
                        //response.writeHead(200);
                        response.end();

                    });



                    // TODO: Call into Stock service to decrement stock levels for these products?

                    response.writeHead(200, {
                        'Access-Control-Allow-Origin': '*'
                    });


                });

                break;

        }
    }
    else if(request.method == 'GET')
    {
        console.log("method is GET");

        switch (path)
        {
            // Get all orders for a particular user
            case "/order":

                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });

                var parsedUrl = url.parse(request.url, true);
                var customerID = parsedUrl.query.customerId;

                var query = "SELECT * FROM orders where customerID=" + customerID;

                db.query(
                    query,
                    [],
                    function (err, rows) {
                        if (err) throw err;
                        //console.log(JSON.stringify(rows, null, 2));
                        response.end(JSON.stringify(rows));
                        //console.log("order details sent");
                    }
                );

                break;


            // Get the details of a specific order
            case "/orderDetails":

                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });

                var orderDetailsUrl = url.parse(request.url, true);
                var orderID = orderDetailsUrl.query.orderId;

                var q = "SELECT * FROM orderdetails where orderID=" + orderID;

                db.query(
                     q,
                     [],
                     function(err, rows) {
                     if (err) throw err;
                     //console.log(JSON.stringify(rows, null, 2));
                     response.end(JSON.stringify(rows));
                     //console.log("order details sent");
                     }
                 );

                break;

            case "/allOrders":

                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });

                console.log("all orders");

                var query = "SELECT * FROM orders"; // TODO: Only open orders?

                db.query(
                    query,
                    [],
                    function (err, rows) {
                        if (err) throw err;
                        console.log(JSON.stringify(rows, null, 2));
                        response.end(JSON.stringify(rows));
                        console.log("all order details sent");
                    }
                );

                break;
        }
    }

    /**
     * Get today's date
     * @returns {Date} in the format DD/MM/YYYY
     */
    function getDate()
    {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() +1;
        var yyyy = today.getFullYear();

        if(dd < 10)
        {
            dd = '0' + dd;
        }

        if(mm < 10)
        {
            mm = '0' + mm;
        }

        today = dd + '/' + mm + '/' + yyyy;

        return today;
    }

});
server.listen(3005);
console.log("Orders service running on Port 3005");