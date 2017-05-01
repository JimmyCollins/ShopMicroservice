var express = require("express");
var morgan = require("morgan");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();

app.use(morgan('combined'));
app.use(morgan("dev", {}));
app.use(bodyParser.json());

var cart = [];

/**
 * Add an item to the cart
 */
app.post("/add", function (req, res, next)
{
    var obj = req.body;
    console.log("Customer: " + obj.custId);
    console.log("Attempting to add to cart: " + JSON.stringify(req.body));

    var max = 0;
    var ind = 0;

    if (cart["" + obj.custId] === undefined)
        cart["" + obj.custId] = [];

    var c = cart["" + obj.custId];

    // Assignment Part 4 (a) - Combine the items in the cart if the user orders a product more than once
    for(var i = 0; i < c.length; i++)
    {
        if(c[i].productID === obj.productID)
        {
            console.log("Already a product with that ID in the cart!");
            c[i].quantity = Number(c[i].quantity) + Number(obj.quantity);
            res.send(201);
            return;
        }
    }

    for (ind = 0; ind < c.length; ind++)
        if (max < c[ind].cartid)
            max = c[ind].cartid;

    var cartid = max + 1;

    var data = {
        "cartid": cartid,
        "productID": obj.productID,
        "name": obj.name,
        "price": obj.price,
        "image": obj.image,
        "quantity": obj.quantity
    };

    //console.log(JSON.stringify(data));
    c.push(data);

    res.status(201);

    res.send("");

});


/**
 * Delete an item from the cart
 */
app.delete("/cart/:custId/items/:id", function (req, res, next)
{
    var body = '';
    console.log("Delete item from cart: for custId " + req.url + ' ' +  req.params.id.toString());

    var c = cart["" + req.params.custId];

    // Assignment Part 4 (c) - Delete item from cart
    for(var i = 0; i < c.length; i++)
    {
        if(c[i].cartid === Number(req.params.id))
        {
            console.log("Found item to delete");

            var indexOfElementToDelete = c.indexOf(c[i]);
            c.splice(indexOfElementToDelete, 1);

            res.send(201);
            return;
        }
    }

    res.send(' ');

});


/**
 * Get the contents of this customers cart
 */
app.get("/cart/:custId/items/", function (req, res, next)
{
    var custId = req.params.custId;
    console.log("getCart" + custId);

    console.log('custID ' + custId);

    console.log(JSON.stringify(cart["" + custId], null, 2));

    res.send(JSON.stringify(cart["" + custId]));
    console.log("cart sent");

});


var server = app.listen(process.env.PORT || 3003, function ()
{
    var port = server.address().port;
    console.log("App now running in %s mode on port %d", app.get("env"), port);
});