var express = require('express');
var router = express.Router();
// var passport = require('passport');
var path = require('path');


router.get('/', function(req, res, next) {
   res.send(req.isAuthenticated());
});

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
           successRedirect: '/view_products',
           failureRedirect: '/login'
       })
    );

    app.post('/signup',
        passport.authenticate('local-signup', {
            successRedirect: '/login/nextPage',
            failureRedirect: '/login/nextPageFail'
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
}