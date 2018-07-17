


$(document).ready(function() {
    // Getting jQuery references to the user name,description,category,price
var email = $("#email");
var password = $("#password");
var firstname = $("firstname");
var lastname = $('lastname');
var signupForm = $("signup-form");
var sendInput = $("#send-input");

$(sendInput).on("click", function handleFormSubmit(err, res ,event) {
    if (err) {
        console.log(err);
      }
    event.preventDefault();

    var newUser = {
        firstname: firstname.val().trim(),
        lastname: lastname.val().trim(),
        username: username.val(),
        password: password.val(),
        email: email.val()
      };
    console.log("created user!!!");
    // console.log(event);
    // console.log(passport);
    submituser(newUser);
    function submituser() {
      $.post("/signup",  function() {
        console.log();
      });
    }
    
    });
});
// $(sendInput).on("click")
// // Adding an event listener for when the form is submitted
// $(sendInput).on("click", function(event) {
//   event.preventDefault();
// signup();
// });

// });

//   console.log("this is a new user");
//   console.log(event);
//   // Wont submit the post if we are missing a body or a title
//   if (!userEmail || !userPassword ){
//     return;
//   }
// $.post('/signup',passport)
// //   Constructing a newuser object to hand to the database
//   var newUser = {
//     email: userEmail.val(),
//     password: userPassword.val()
//   };

//   console.log(newUser);