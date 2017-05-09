(function ()
{
  'use strict';

  module.exports = {

      // Catalogue Service
      catalogueUrl:  "http://localhost:3002",
      newProductUrl:  "http://localhost:3002",

      // Cart Service
      cartsUrl:      "http://localhost:3003",

      // User Service
      loginUrl:      "http://localhost:3001/login",
      registerUrl:   "http://localhost:3001/register",

      // Stock Service
      stockUrl:      "http://localhost:3004/",

      // Orders Service
      ordersUrl:     "http://localhost:3005/",

      // Unused / Not Implemented - DELETE BEFORE SUBMISSION
      tagsUrl:       "http://localhost:8082/catalogue/tags",
      customersUrl:  "http://localhost:8080/customers",
      addressUrl:    "http://localhost:8080/addresses",
      cardsUrl:      "http://localhost:8080/cards"
  };
}());