(function (){
  'use strict';

  var request = require("request");
  var helpers = {};

  /* Public: errorHandler is a middleware that handles your errors
   *
   * Example:
   *
   * var app = express();
   * app.use(helpers.errorHandler);
   * */
  helpers.errorHandler = function(err, req, res, next) {
    var ret = {
      message: err.message,
      error:   err
    };
    res.
      status(err.status || 500).
      send(ret);
  };

  helpers.mylogger = function(req, res, next) {

   console.log('body '+JSON.stringify(req.body));
    next();
  };

  helpers.sessionMiddleware = function(err, req, res, next) {
    if(!req.cookies.logged_in) {
      res.session.customerId = null;
    }
  };

  /* Responds with the given body and status 200 OK  */
  helpers.respondSuccessBody = function(res, body) {
    helpers.respondStatusBody(res, 200, body);
  }

  /* Public: responds with the given body and status
   *
   * res        - response object to use as output
   * statusCode - the HTTP status code to set to the response
   * body       - (string) the body to yield to the response
   */
  helpers.respondStatusBody = function(res, statusCode, body) {
    res.writeHeader(statusCode);
    res.write(body);
    res.end();
  }

  helpers.respondStatusBodyJSON = function(res, statusCode, body) {
    res.writeHeader(statusCode);
    res.write(JSON.stringify(body));
    res.end();
  }

  /* Responds with the given statusCode */
  helpers.respondStatus = function(res, statusCode) {
    res.writeHeader(statusCode);
    res.end();
  }

  /* Public: performs an HTTP GET request to the given URL
   *
   * url  - the URL where the external service can be reached out
   * res  - the response object where the external service's output will be yield
   * next - callback to be invoked in case of error. If there actually is an error
   *        this function will be called, passing the error object as an argument
   *
   * Examples:
   *
   * app.get("/users", function(req, res) {
   *   helpers.simpleHttpRequest("http://api.example.org/users", res, function(err) {
   *     res.send({ error: err });
   *     res.end();
   *   });
   * });
   */
  helpers.simpleHttpRequest = function(url, res, next) {
    request.get(url, function(error, response, body) {
      if (error) return next(error);
      helpers.respondSuccessBody(res, body);
    }.bind({res: res}));
  }


  helpers.getCustomerId = function(req, env)
  {
    // Check if logged in. Get customer Id
      var logged_in = req.cookies.logged_in;

      if (!logged_in)
      {
        console.log("user not logged in - no customer id");
        return 0;
      }

      var custId = req.cookies.customer_id;

      return custId;


    // TODO REMOVE THIS, SECURITY RISK
    /*if (env == "development" && req.query.custId != null)
    {
      console.log("dev env - returning: " + req.query.custId);
      return req.query.custId;
    }*/

    /*if (!logged_in)
    {
        //console.log("user is not logged in");

      /*if (!req.session.id)
      {
        console.log("no session id?");
        throw new Error("User not logged in.");
      }

      // Use Session ID instead
        //console.log("returning :" + req.session.id);
      return req.session.id;
    }

    //console.log("helpers/index - getCustomerId - returning: " + req.session.customerId);
    return req.session.customerId;*/
  }

    module.exports = helpers;
}());
