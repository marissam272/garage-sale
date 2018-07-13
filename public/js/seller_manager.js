
$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?product_id=23)
  var productContainer = $(".product-container");
  var url = window.location.search;
  var productId;
  //buttons for editing and deleting
  $(document).on("click", "button.delete", handleProductDelete);
  $(document).on("click", "button.edit", handleProductEdit);
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
            
  // Adding an event listener for when the form is submitted
  $(productForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!nameInput.val().trim() || !descriptionInput.val().trim() || !priceValue.val().trim()
          || !imagevalue.val().trim()) {
      return;
    }
    // Constructing a newProduct object to hand to the database
    var newProduct = {
      name: nameInput.val().trim(),
      description: descriptionInput.val().trim(),
      price: priceValue.val(),
      img:imagevalue.val()
    };

    console.log(newProduct);

    // If we're updating a product run updateProduct to update a product
    // Otherwise run submitProduct to create a whole new product
    if (updating) {
      newProduct.id = productId;
      updateProduct(newProduct);
    }
    else {
      submitProduct(newProduct);
    }
  });

  // Submits a new product and brings user to views page upon completion
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


  getProducts();
  //delete and update

  function handleProductDelete() {
    var currentProduct = $(this)
      .parent()
      .parent()
      .data("product");
    deleteProduct(currentProduct.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleProductEdit() {
    var currentProduct = $(this)
      .parent()
      .parent()
      .data("product");
    window.location.href = "/seller_manager?product_id=" + currentProduct.id;
  }

   // This function does an API call to delete posts
   function deleteProduct(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/products/" + id
    })
      .then(function() {
        getProducts();
      });
  }

  // This function grabs posts from the database and updates the view
  function getProducts() {
    
    $.get("/api/products", function(data) {
      console.log("Products", data);
      products = data;
      if (!products || !products.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  function displayEmpty() {
    productContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No products yet ,if you want to sell a product add it.");
    productContainer.append(messageH2);
  }

  function initializeRows() {
    productContainer.empty();
    var productsToAdd = [];
    for (var i = 0; i < products.length; i++) {
      productsToAdd.push(createNewRow(products[i]));
    }
    productContainer.append(productsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(product) {
    var newProductCard = $("<div class='container'>");
    newProductCard.addClass("card");
    var newProductCardHeading = $("<div>");
    newProductCardHeading.addClass("card-header");

    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");

    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-primary");

    
    var newProductName = $("<h2>");
    
    var newProductCardBody = $("<div>");
    newProductCardBody.addClass("card-body");

    var newProductBody = $("<p>");
    var newProductPrice = $("<p>");
    var newProductImg = $("<p>");

    newProductName.text(product.name + " ");
    newProductBody.text(product.description);
    newProductPrice.text(product.price);
    newProductImg.text(product.img);
    

    newProductCardHeading.append(newProductName);
    newProductCardHeading.append(deleteBtn);
    newProductCardHeading.append(editBtn);
   
    
    newProductCardBody.append(newProductBody);
    newProductCardBody.append(newProductPrice);
    newProductCardBody.append(newProductImg);
    newProductCard.append(newProductCardHeading);
    newProductCard.append(newProductCardBody);
    newProductCard.data("product", product);
    return newProductCard;
  }

});
