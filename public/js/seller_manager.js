function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#img')
              .attr('src', e.target.result)
              .width(150)
              .height(200);
      };

      reader.readAsDataURL(input.files[0]);
  }
}
$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?product_id=23)
  var url = window.location.search;
  var productId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the product id from the url
  // In localhost:8080/seller_manager?product_id=1, productId is 1
  if (url.indexOf("?product_id=") !== -1) {
    productId = url.split("=")[1];
    getProductData(productId);
  }

  // Getting jQuery references to the product name,description,category,price
  var nameInput = $("#name");
  var descriptionInput = $("#description");
  var productForm = $("#product-form");
  var priceValue = $("#price");
  var imagevalue=$("#img");
            // Giving the postCategorySelect a default value
            // postCategorySelect.val("Personal");
  // Adding an event listener for when the form is submitted
  $(productForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!nameInput.val().trim() || !descriptionInput.val().trim() || !priceValue.val().trim()
          || !imagevalue.val().trim()) {
      return;
    }
    // Constructing a newProductt object to hand to the database
    var newProduct = {
      name: nameInput.val().trim(),
      description: descriptionInput.val().trim(),
      price: priceValue.val(),
      img:imagevalue.val()
    };

    console.log(newProduct);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newProduct.id = productId;
      updateProduct(newProduct);
    }
    else {
      submitProduct(newProduct);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitProduct(product) {
    $.post("/api/products/", product, function() {
      window.location.href = "/view_products";
    });
  }

  // Gets product data for a product if we're editing
  function getProductData(id) {
    $.get("/api/products/" + id, function(data) {
      if (data) {
        // If this product exists, prefill our viewproduct forms with its data
        nameInput.val(data.name);
        descriptionInput.val(data.description);
        priceValue.val(data.price);
        imagevalue.val(data.img);
        // If we have a product with this id, set a flag for us to know to update the product
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given product, bring user to the view page when done
  function updateProduct(product) {
    $.ajax({
      method: "PUT",
      url: "/api/products",
      data: product
    })
      .then(function() {
        window.location.href = "/view_products";
      });
  }
});
