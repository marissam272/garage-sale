// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // shows our index page
  app.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  
  // index page route to the products 

  app.get("/view_products", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view_products.html"));
  });

  // index page route to seller.html
  app.get("/seller_manager", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/seller_manager.html"));
  });



 };
