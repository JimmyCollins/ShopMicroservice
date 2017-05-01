/**
 * Users Service
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

var cart = [];
var theuser = null;
var theuserid = null;
var theusertype = null;

var server = http.createServer(function (request, response)
{
    var path = url.parse(request.url).pathname;
    var url1 = url.parse(request.url);
    //console.log("path: "+path);
    //console.log("url: "+url1)

    if (request.method == 'POST')
    {
        switch (path)
        {
            // Login functionality
            case "/login":
                var body = '';
                //console.log("user Login ");
                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var obj = JSON.parse(body);
                    console.log(JSON.stringify(obj, null, 2));

                    var query = "SELECT * FROM users where name='" + obj.name + "' AND password='" + obj.password + "'";

                    response.writeHead(200, {
                        'Access-Control-Allow-Origin': '*'
                    });

                    db.query(
                        query,
                        [],
                        function(err, rows) {
                            if (err)
                            {
                                response.end('{"error": "1"}');
                                throw err;
                            }
                            if (rows!=null && rows.length>0)
                            {
                                console.log("User is in the database" );
                                theuserid = rows[0].userID;
                                theusertype = rows[0].usertype;
                                var obj = {
                                    customerId: theuserid,
                                    usertype: theusertype
                                }
                                response.end(JSON.stringify(obj));

                            }
                            else
                            {
                                response.end('{"error": "1"}');
                                console.log("User is not in the database");

                            }

                        }
                    );


                });

                break;

            // Registration functionality
            case "/register":
                var body = '';
                console.log("user Register ");
                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {
                    var obj = JSON.parse(body);
                    console.log(JSON.stringify(obj, null, 2));
                    var query = "SELECT * FROM users where name='" + obj.name + "'";
                    response.writeHead(200, {
                        'Access-Control-Allow-Origin': '*'
                    });

                    db.query(
                        query,
                        [],
                        function(err, rows) {
                            if (err) {
                                response.end("error");
                                throw err;
                            }
                            if (rows!=null && rows.length>0) {
                                console.log("User already exists in the database");
                                response.end('{"error": "2"}');
                            }
                            else{
                                query = "INSERT INTO users (name, password, address, usertype)"+
                                        "VALUES(?, ?, ?, 2)"; // FIXME: By default users are added as customers, need to be changed to admin currently in the database
                                db.query(
                                    query,
                                    [obj.name,obj.password,obj.address],
                                    function(err, result) {
                                        if (err) {
                                            // 2 response is an sql error
                                            response.end('{"error": "3"}');
                                            throw err;
                                        }
                                        theuserid = result.insertId;
                                        var obj = {
                                            id: theuserid
                                        }
                                        response.end(JSON.stringify(obj));

                                    }
                                );
                            }

                        }
                    );

                });

                break;
        }
    }
   

});
server.listen(3001);
console.log("Users service running on Port 3001");