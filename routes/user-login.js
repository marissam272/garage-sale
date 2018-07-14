var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get("/", function(req,res,next){
    console.log('we are at the login html')
   res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get("/nextPage", function(req,res,next){
    console.log('we are on the next page successss!!!')
    res.send('hello from next page it worked!!!!');
 });

 router.get("/nextPageFail", function(req,res,next){
    console.log('we are on the next page fail!!!')
    res.send('we faileedddd');
 });

router.post('/',
   passport.authenticate('local', {
       successRedirect: '/login/nextPage',
       failureRedirect: '/login/nextPageFail'
   })
);

router.post('/test', function(req,res) {
    console.log('we hit login test!!');
    res.send('we hit login test!!!')
})

module.exports = router;