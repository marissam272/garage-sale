var express = require('express');
// var router = express.Router();
var passport = require('passport');
var path = require('path');
var db = require("../models");
// app.get('/dashboard',authController.dashboard);
// router.get('/', function(req, res, next) {
//    res.send(req.isAuthenticated());
// });

module.exports = function(app, passport) {
    console.log(passport);
    console.log('this is passport!!in routes file!!!!', passport)
    app.get("/login", function(req,res,next){
        console.log('we are at the login html')
       res.sendFile(path.join(__dirname, '../public/login.html'));
    });
    
    app.get("/login/nextPage", function(req,res,next){
        console.log('we are on the next page successss!!!')
        res.send('hello from next page it worked!!!!');
     });
    
     app.get("/login/nextPageFail", function(req,res,next){
        console.log('we are on the next page fail!!!')
        res.send('we faileedddd');
     });
    
     app.post('/login',
       passport.authenticate('local-signin', {
           successRedirect: '/',
           failureRedirect: '/login'
       })
    );

    app.post('/signup',
        passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/signup/'
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

// module.exports = app;


