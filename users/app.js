var http = require('http');
var url = require('url');
var mysql = require('mysql');

var port = (process.env.VCAP_APP_PORT || 3001);
var host = (process.env.VCAP_APP_HOST || 'localhost');

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

var cart = [];
var theuser = null;
var theuserid = null;
var theusertype = null;
var theusername = null;

var server = http.createServer(function (request, response)
{
    var path = url.parse(request.url).pathname;
    var url1 = url.parse(request.url);

    if (request.method == 'POST')
    {
        switch (path)
        {
            // Login functionality
            case "/login":
                var body = '';
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
                                theuserid = rows[0].userID;
                                theusertype = rows[0].usertype;
                                theusername = rows[0].name;
                                var obj = {
                                    customerId: theuserid,
                                    usertype: theusertype,
                                    username: theusername
                                }
                                response.end(JSON.stringify(obj));

                            }
                            else
                            {
                                response.end('{"error": "1"}');
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
                                response.end('{"error": "2"}');
                            }
                            else{
                                query = "INSERT INTO users (name, password, address, usertype)"+
                                        "VALUES(?, ?, ?, 2)"; // By default users are added as customers, need to be changed to admin currently in the database
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

            // Delete a user
            case "/deleteUser":

                var body = '';

                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', function () {

                    var user = JSON.parse(body);

                    var query = "DELETE from users where userID=" + user.userID;

                    // Execute SQL
                    db.query(
                        query,
                        [],
                        function(err, result) {
                            if (err) throw err;
                            console.log(JSON.stringify(result, null, 2));
                            response.end(JSON.stringify(result));
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
            // Get all users
            case "/allUsers":

                response.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });

                var query = "SELECT * from users";

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
console.log("Users service running on Port: " + port);