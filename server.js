// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
  var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
//require("./routes/seller-api-routes.js")(app);
require("./routes/product-api-routes.js")(app);

// <<<<<<< marissa
//removing offerup info
=======
// var offerup = require('offerup');
 
// // Get your list by Query
// offerup.getFullListByQuery({
//     location: 'Chicago', // required
//     search: 'iphone', // required
//     radius: 50,
//     limit: 100,
//     price_min: 100,
//     price_max: 1000
//     }).then(function success(response){
 
//         /*
//         Output
//             [
//                 {
//                     id: 469543577,
//                     category: { 
//                         id: 20, 
//                         name: 'Cell Phones' 
//                     },
//                     location_name: 'Chicago, IL',
//                     title: 'Cracked iPhone 7 32 GB unlocked for any company',
//                     post_date_ago: '1 minute',
//                     get_full_url: 'https://offerup.com/item/detail/469543577/',
//                     priority: 100,
//                     state: 3,
//                     longitude: -87.7754,
//                     latitude: 41.9211,
//                     sort_label: 'Items near Chicago',
//                     description: 'Unlocked for any company. Cracked screen everything works perfectly. Drop off is a extra $15 '
//                 },
//                 ...
//             ]
//         */
 
//     }, function error(response){
//         console.log("this is the data" + response);
//     });
// >>>>>>> development

// Syncing our sequelize models and then starting our Express app
// =============================================================
 db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
 });
