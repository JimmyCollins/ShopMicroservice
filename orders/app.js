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
    //console.log("path: "+path);
    //console.log("url: "+url1);


    if (request.method == 'POST')
    {
        // Add a new order
        switch (path)
        {
            case "/order":

                console.log("Orders service - new order");

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var obj = JSON.parse(body);
                    console.log("Order data: " + JSON.stringify(obj, null, 2));

                    //TODO
                    response.writeHead(200, {
                        'Access-Control-Allow-Origin': '*'
                    });


                });

        }
    }
    else if(request.method == 'GET')
    {
        // Get the details of an existing order
        switch (path)
        {
            case "/order":

            // TODO

        }
    }

});
server.listen(3005);
console.log("Orders service running on Port 3005");