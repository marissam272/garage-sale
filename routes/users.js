var express = require('express');
var router = express.Router();
// var passport = require('passport');
var path = require('path');
var db = require("../models");

router.get('/', function(req, res, next) {
   res.send(req.isAuthenticated());
});

module.exports = function(app, passport) {

    
     app.post('/login',
       passport.authenticate('local-signin', {
           successRedirect: '/',
           failureRedirect: '/login'
       })
    );

    app.post('/signup',
        passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup/nextPageFail'
        })
    );

    app.get("/signup/nextPageFail", function(req,res,next){
        console.log('we are on the next page fail!!!')
        res.send('we faileedddd');
     });

    
    app.get('/signup', function(req,res) {
        console.log('we hit login test!!');
        res.sendFile(path.join(__dirname, '../public/signup.html'));
    });

    app.post("/api/users", function(req,res){
        db.User.create(req.body).then(function(dbUser){
            res.json(dbUser)
        })
    })
}

// var authController = require('../controllers/authcontroller.js');
 
// module.exports = function(app) {
 
//     app.get('/signup', authController.signup);
 
// }

// app.get('/signin', authController.signin);

