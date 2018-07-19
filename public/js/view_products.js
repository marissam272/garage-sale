$(document).ready(function() {
  /* global moment */
  // productContainer holds all of our posts
  var productContainer = $(".product-container");
  //var postCategorySelect = $("#category");
  $(document).on("click","button.buy",handleProductPurchase); 
  var products;

  /////////////////////////////////////////////////
  //======================================================
  // product_description.html js code
//   $(document).on("click", ".product_container", handleView);
//   var description = $(".description_container");
//   var product;
//   function getProduct() {
      
//     $.get("/api/products/:id", function(data) {
//       console.log("Products", data);
//       product = data;
//       if (!product || !product.length) {
//         displayEmpty();
//       }
//       else {
//         initializeRow();
//       }
//     });
//   }
// //fuunction to handle buy functionality
// function handleView() {
//   var currentProduct = $(this)
//     .parent()
//     .parent()
//     .data("product");
//     console.log(currentProduct.id);
    
//     $.ajax({
//       method: "PUT",
//       url: "/api/products/:id" + currentProduct.id,
//       checkout: true
//     }).then(window.location.href = "/product_description.html?product_id=" + currentProduct.id);
//     //window.location.href = "/checkout?product_id=" + currentProduct.id;
// }

//   getProduct();

//   function initializeRow() {
//     description.empty();
//     var productToAdd = [];
//     productToAdd.push(createNewRow1(product));
//     description.append(productToAdd);
//   }

//   // This function constructs a post's HTML
//   function createNewRow1(product) {
//     var newProductCard = $("<div class='container'>");
//     newProductCard.addClass("card");
//     var newProductCardHeading = $("<div>");
//     newProductCardHeading.addClass("card-header");

//     var buyBtn = $("<button>");
//     buyBtn.text("INTERESTED ? BUY IT");
//     buyBtn.addClass("buy btn btn-success");
//     var newProductName = $("<h2>");
    
//     var newProductCardBody = $("<div>");
//     newProductCardBody.addClass("card-body");

//     var newProductBody = $("<p>");
//     var newProductPrice = $("<p>");
//     var newProductImg = $("<p>");

//     newProductName.text(product.name + " ");
//     newProductBody.text(product.description);
//     newProductPrice.text(product.price);
//     newProductImg.text(product.img);

//     newProductCardHeading.append(newProductName);
//     newProductCardHeading.append(buyBtn);

//     newProductCardBody.append(newProductBody);
//     newProductCardBody.append(newProductPrice);
//     newProductCardBody.append(newProductImg);
//     newProductCard.append(newProductCardHeading);
//     newProductCard.append(newProductCardBody);
//     newProductCard.data("product", product);
//     return newProductCard;
//   }
// end product_description.html js code
/////////////////////////////////////////////////////
//=============================================

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
    newProductCard.addClass("cardfordisplay");
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
    var newProductImg = $("<img src =" +product.img + " height='100'width='100' > ");

    newProductName.text(product.name + " ");
    newProductBody.text(product.description);
    newProductPrice.text("$" +product.price);
    //newProductImg.text(product.img);
    console.log(product.img);
    

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

  
  //fuunction to handle buy functionality
  function handleProductPurchase() {
    var currentProduct = $(this)
      .parent()
      .parent()
      .data("product");
      console.log(currentProduct.id);
      
      $.ajax({
        method: "PUT",
        url: "/api/products/:id" + currentProduct.id,
        checkout: true
      }).then(window.location.href = "/product_description?product_id=" + currentProduct.id);
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
