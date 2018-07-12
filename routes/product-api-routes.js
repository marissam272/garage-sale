// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/products", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.product.findAll({}).then(function(dbProduct) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbProduct);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/products/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.product.findOne({
      where: {
        id: req.params.id
      },
    //   include: [db.Author]
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });


  

  // POST route for saving a new post
  app.post("/api/products", function(req, res) {
    db.product.create(req.body).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/products/:id", function(req, res) {
    db.product.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });

  // PUT route for updating posts
  app.put("/api/products", function(req, res) {
    db.product.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbProduct) {
      res.json(dbProduct);
    });
  });
};
