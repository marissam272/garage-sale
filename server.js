// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var router = express.Router();
var path = require('path');
var bcrypt = require('bcrypt');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

passport.use('local', new localStrategy({
  passReqToCallback : true,
  usernameField: 'username'
},


function(req, username, password, done){
console.log('called local');
db.connect(connectionString, function (err, client) {
 
 console.log('called local - db');

 var user = {};

   var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

   query.on('row', function (row) {
     console.log('User obj', row);
     console.log('Password', password)
     user = row;
     if(password == user.password){
       console.log('match!')
       done(null, user);
     } else {
       done(null, false, { message: 'Incorrect username and password.' });
     }
     
   });

   // After all data is returned, close connection and return results
   query.on('end', function () {
       client.end();
   });

   // Handle Errors
   if (err) {
       console.log(err);
   }
});

}));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60000, secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
     console.log('called deserializeUser');
     db.connect(connection, function (err, client) {
     
       var user = {};
       console.log('called deserializeUser - db');
         var query = client.query("SELECT * FROM users WHERE id = $1", [id]);
     
         query.on('row', function (row) {
           console.log('User row', row);
           user = row;
           done(null, user);
         });
     
         // After all data is returned, close connection and return results
         query.on('end', function () {
             client.end();
         });
     
         // Handle Errors
         if (err) {
             console.log(err);
         }
     });

});


var register = require('./routes/user-register.js');
  
app.use('/register', register);

var login = require('./routes/user-login.js');

app.use('/login', login);

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

// Syncing our sequelize models and then starting our Express app
// =============================================================
 db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
 });
