// var express = require('express');
// // var router = express.Router();
// var passport = require('passport');
// var path = require('path');
// var db = require("../models");
// // app.get('/dashboard',authController.dashboard);
// // router.get('/', function(req, res, next) {
// //    res.send(req.isAuthenticated());
// // });
var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {
    app.get('/seller_manager',authController.dashboard);

    app.get('/seller_manager', isLoggedIn, authController.dashboard);
 
 
 
    app.get('/logout', authController.logout);

     app.post('/login',
       passport.authenticate('local-signin', {
           successRedirect: '/',
           failureRedirect: '/login'
           
       })
    );
    app.get('/signup', authController.signup);
 

    app.get('/signin', authController.signin);

    app.post('/signup',
        passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup/'
        })
    );

    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
 
            return next();
 
        res.redirect('/signin');
 
    }
}

// module.exports = app;


