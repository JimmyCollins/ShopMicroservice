(function ()
{
  'use strict';

  var catalogueUrl = "http://localhost:3002";
  var cartsUrl = "http://localhost:3003";
  var loginUrl = "http://localhost:3001/login";
  var registerUrl = "http://localhost:3001/register";
  var stockUrl = "http://localhost:3004/";
  var ordersUrl = "http://localhost:3005/";

  // If we are running in the Cloud, use the Bluemix service URL's
  if(process.env.VCAP_SERVICES)
  {
      catalogueUrl = "https://catalogue-api-jc.mybluemix.net";
      cartsUrl = "https://cart-jc.mybluemix.net";
      loginUrl = "https://users-jc.mybluemix.net/login";
      registerUrl = "https://users-jc.mybluemix.net/register";
      stockUrl = "https://stock-jc.mybluemix.net/";
      ordersUrl = "https://orders-jc.mybluemix.net/";
  }

  module.exports = {

      // Catalogue Service
      catalogueUrl:  catalogueUrl,

      // Cart Service
      cartsUrl: cartsUrl,

      // User Service
      loginUrl: loginUrl,
      registerUrl: registerUrl,

      // Stock Service
      stockUrl: stockUrl,

      // Orders Service
      ordersUrl: ordersUrl
  };
}());