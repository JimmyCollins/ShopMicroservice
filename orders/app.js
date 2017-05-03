/**
 * Order Service
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
    //console.log("url: "+url1);

    if (request.method == 'POST')
    {
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

                    console.log("Order data: \n" + JSON.stringify(orderData, null, 2));




                    // TODO: Need to only pass one instance of customerID - make change in front-end handleCheckout function

                    // TODO: This woorks now so can use to iterate over the orders below to add to orderdetails table
                    for (var i=0;i<orderData.order.length;i++)
                    {
                        console.log("Customer ID:" + orderData.order[i].customerId);
                    }

                    // -- getting date -- TODO - add to function -- //
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!
                    var yyyy = today.getFullYear();

                    if(dd<10) {
                        dd='0'+dd
                    }

                    if(mm<10) {
                        mm='0'+mm
                    }

                    today = dd+'/'+mm+'/'+yyyy;

                    // ------------------------------------------------ //

                    // Insert into orders
                    console.log("Date - " + today);

                    // Ref: http://stackoverflow.com/questions/31371079/retrieve-last-inserted-id-with-mysql

                    /*var query = "INSERT into orders (customerId, saledate)" +
                            "VALUES(" +  +"," + saleDate + ")";

                    console.log(query);*/

                    /*db.query(query, function(err, result)
                    {
                        if (err) throw err;

                        console.log("Inserted OrderId = " + result.orderId);
                    });*/


                    // Need to insert into orders, then use that orderid to insert into orderdetails

                    // NB: Don't forget here, there could be multiple items to add to the orderdetails table




                    //TODO
                    response.writeHead(200, {
                        'Access-Control-Allow-Origin': '*'
                    });


                });

                break;

        }
    }
    /*else if(request.method == 'GET')
    {
        // Get the details of an existing order
        switch (path)
        {
            case "/order":

            // TODO

                break;

        }
    }*/

});
server.listen(3005);
console.log("Orders service running on Port 3005");