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

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/product.html"));
  });

  // cms route loads cps.html
  app.get("/cps", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cps.html"));
  });

  // blog route loads produuct.html
  app.get("/product", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/product.html"));
  });

//   // authors route loads author-manager.html
//   app.get("/authors", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/author-manager.html"));
//   });

 };
