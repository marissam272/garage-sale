var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var router = express.Router();
var path = require('path');
var bcrypt = require('bcrypt');
var app = express();
var PORT = process.env.PORT || 8080;

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 60000, secure: false }
}));

var db = require("./models");
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport/passport.js')(passport,db.User);

// var signup = require('./routes/users.js');
  
// app.use('/signup', signup);



// app.use('/login', login);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/product-api-routes.js")(app);

// var authRoute = require('./routes/users')(app);
require('./routes/users')(app, passport);

 db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
 });
