(function ()
{
  'use strict';

    var catalogueUrl = "http://localhost:3002";
    var cartsUrl = "http://localhost:3003";
    var usersUrl = "http://localhost:3001/";
    var stockUrl = "http://localhost:3004/";
    var ordersUrl = "http://localhost:3005/";

  // If we are running in the Cloud, use the Bluemix service URL's
  if(process.env.VCAP_SERVICES)
  {
      catalogueUrl = "https://catalogue-api-jc.mybluemix.net";
      cartsUrl = "https://cart-jc.mybluemix.net";
      usersUrl = "https://users-jc.mybluemix.net/";
      stockUrl = "https://stock-jc.mybluemix.net/";
      ordersUrl = "https://orders-jc.mybluemix.net/";
  }

  module.exports = {

      // Catalogue Service
      catalogueUrl:  catalogueUrl,

      // Cart Service
      cartsUrl: cartsUrl,

      // User Service
      usersUrl : usersUrl,

      // Stock Service
      stockUrl: stockUrl,

      // Orders Service
      ordersUrl: ordersUrl
  };
}());