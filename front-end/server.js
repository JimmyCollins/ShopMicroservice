var request      = require("request")
  , express      = require("express")
  , morgan       = require("morgan")
  , path         = require("path")
  , bodyParser   = require("body-parser")
  , async        = require("async")
  , cookieParser = require("cookie-parser")
  , session      = require("express-session")
  //, epimetheus   = require("epimetheus")
  , config       = require("./config")
  , helpers      = require("./helpers")
  , cart         = require("./api/cart")
  , catalogue    = require("./api/catalogue")
  , stock    = require("./api/stock")
  , orders       = require("./api/orders")
  , user         = require("./api/user")
  , app          = express()

//app.use(express.logger());
//epimetheus.instrument(app);
app.use(morgan('combined'));
app.use(morgan("dev", {}));
app.use(express.static("public"));
app.use(session(config.session));
app.use(bodyParser.json());
app.use(helpers.mylogger);
app.use(cookieParser());
app.use(helpers.errorHandler);
app.use(helpers.sessionMiddleware);
//app.use(morgan("dev", {}));

var domain = "";
process.argv.forEach(function (val, index, array) {
  var arg = val.split("=");
  if (arg.length > 1) {
    if (arg[0] == "--domain") {
      domain = arg[1];
      console.log("Setting domain to:", domain);
    }
  }
});

console.log('VCAP SERVICES: ' + JSON.stringify(process.env.VCAP_SERVICES, null, 4));

/* Mount API endpoints */
app.use(cart);
app.use(catalogue);
app.use(user);
app.use(stock);
app.use(orders);

var server = app.listen(process.env.PORT || 8079, function () {
  var port = server.address().port;
  console.log("App now running in %s mode on port %d", app.get("env"), port);
  //alert("App now running in %s mode on port %d", app.get("env"), port);
  console.log('VCAP SERVICES: ' + JSON.stringify(process.env.VCAP_SERVICES, null, 4));
  //alert('VCAP SERVICES: ' + JSON.stringify(process.env.VCAP_SERVICES, null, 4));
});
