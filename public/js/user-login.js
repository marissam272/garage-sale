$(document).ready(function() {
  // Getting jQuery references to the user name,description,category,price
var userNameInput = $("#name");
var userPassword = $("#password");
var signupForm = $("signup-form");
var sendInput = $("#send-input");
        
// Adding an event listener for when the form is submitted
$(sendInput).on("click", function handleFormSubmit(event) {
event.preventDefault();
console.log("this is a new user");
// Wont submit the post if we are missing a body or a title
if (!userNameInput || !userPassword ){
  return;
}

});

});