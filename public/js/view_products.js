$(document).ready(function() {
  /* global moment */
  // productContainer holds all of our posts
  var productContainer = $(".product-container");
  //var postCategorySelect = $("#category");
 
  $(document).on("click","button.buy",handleProductPurchase);
  
  
  var products;

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

  // Getting the initial list of products
  getProducts();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
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

    

    var buyBtn = $("<button>");
    buyBtn.text("Checkout Now!");
    buyBtn.addClass("buy btn btn-success");
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
    
    newProductCardHeading.append(buyBtn);
    
    
    newProductCardBody.append(newProductBody);
    newProductCardBody.append(newProductPrice);
    newProductCardBody.append(newProductImg);
    newProductCard.append(newProductCardHeading);
    newProductCard.append(newProductCardBody);
    newProductCard.data("product", product);
    return newProductCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
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

  //fuunction to handle buy functionality
  function handleProductPurchase() {
    var currentProduct = $(this)
      .parent()
      .parent()
      .data("product");
      console.log(currentProduct.id);
      
      $.ajax({
        method: "PUT",
        url: "/api/products/" + currentProduct.id,
        checkout: true
      }).then(window.location.href = "/checkout?product_id=" + currentProduct.id);
      //window.location.href = "/checkout?product_id=" + currentProduct.id;
  }


  // This function displays a message when there are no posts
  function displayEmpty() {
    productContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No products yet , navigate <a href='/seller_manager'>here</a> if you want to sell a product.");
    productContainer.append(messageH2);
  }

});
