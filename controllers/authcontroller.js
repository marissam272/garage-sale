var exports = module.exports = {}


exports.signup = function(req,res){

	res.render('./public/signup'); 

}

exports.signin = function(req,res){

	res.render("./public/login"); 

}

exports.dashboard = function(req,res){

	res.render("./public/seller_manager"); 

}

exports.logout = function(req,res){

  req.session.destroy(function(err) {
  res.redirect('/');
  });

}
