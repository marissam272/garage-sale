$(document).ready(function() {
      // Getting jQuery references to the product name,description,category,price
  var userNameInput = $("#username");
  var userPassword = $("#password");


  var userObj = {
    username: 'tom',
    password: 'tom123'
  }

  console.log('hellooooo from js file!')
  $.post("/login", userObj, function(thingWeGotBack) {
    
    console.log('thingWeGotBack =====', thingWeGotBack);

  });

});