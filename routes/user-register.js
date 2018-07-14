// Requiring our models
var db = require("../models");


var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get('/', function(req, res, next){
   res.sendFile(path.resolve(__dirname, '../public/register.html'));
});

router.post('/', function(req,res,next) {
  db.connect(
    // connectionString,
     function(err, client){

    db.user.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });

    query.on('end', function(){
      response.sendStatus(200);
      client.end();
    })

  })
});

module.exports = router;

router.post("/register", function(req, res){
  db.user.create(req.body).then(function(dbUser){
res.json(dbUser);
  });
});