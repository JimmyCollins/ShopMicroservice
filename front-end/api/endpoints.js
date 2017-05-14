(function ()
{
  'use strict';

  module.exports = {

      // Catalogue Service
      catalogueUrl:  "https://catalogue-api-jc.mybluemix.net",
      newProductUrl:  "https://catalogue-api-jc.mybluemix.net",

      // Cart Service
      cartsUrl:      "https://cart-jc.mybluemix.net",

      // User Service
      loginUrl:      "https://users-jc.mybluemix.net/login",
      registerUrl:   "https://users-jc.mybluemix.net/register",

      // Stock Service
      stockUrl:      "https://stock-jc.mybluemix.net/",

      // Orders Service
      ordersUrl:     "https://orders-jc.mybluemix.net/",

      // Unused / Not Implemented - DELETE BEFORE SUBMISSION
      tagsUrl:       "http://localhost:8082/catalogue/tags",
      customersUrl:  "http://localhost:8080/customers",
      addressUrl:    "http://localhost:8080/addresses",
      cardsUrl:      "http://localhost:8080/cards"
  };
}());