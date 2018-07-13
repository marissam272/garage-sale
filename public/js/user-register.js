$(document).ready(function() {
    // Getting jQuery references to the product name,description,category,price
var userNameInput = $("#username");
var userPassword = $("#password");
          
// Adding an event listener for when the form is submitted
$(productForm).on("submit", function handleFormSubmit(event) {
  event.preventDefault();
  // Wont submit the post if we are missing a body or a title
  if (!userNameInput.val().trim() || !userPassword.val().trim()) {
    return;
  }
  // Constructing a newProduct object to hand to the database
  var newUser = {
    name: userNameInput.val().trim(),
    password: userPassword.val().trim()
  };

  console.log(newUser);
});

});