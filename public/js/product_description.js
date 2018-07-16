$(document).ready(function () {


    //container to hold our details
    var description = $(".description_container");
    //buttons for confirmation 
    $(document).on("click", "button.confirm", handleProductConfirm);
   
  
    var products;
  
    //the following code helps to grab id from the url and pass it to the get function
    var url = window.location.search;
    var idurl = url.substring(url.lastIndexOf('=') + 1);
    console.log(url);
    console.log(idurl);
  
    getProducts(idurl);
  
    //get all our data from db
    function getProducts(idurl) {
  
      $.get("/api/products", function (data) {
        console.log("Products", data);
        products = data;
        if (!products || !products.length) {
          displayEmpty();
        }
        else {
          initializeRows(idurl);
        }
      });
  
    }
  
    // This function displays a message when there are no items in checkout
    function displayEmpty() {
      checkoutContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No purchases yet , navigate <a href='/view_products'>here</a> if you wish to purchase a product.");
      checkoutContainer.append(messageH2);
    }
  
    // following function displays the product with the id grabbed from the url
    function initializeRows(idurl) {
      var productsToAdd = [];
      var productsinCheckout = [];
  
      for (var i = 0; i < products.length; i++) {
        if (products[i].id == idurl) {
          productsToAdd.push(createNewRow(products[i]));
        }
      }
      description.append(productsToAdd);
      
    }
  
    //this holds our product details and buttons
    function createNewRow(product) {
      var newProductCard = $("<div class='container'>");
      newProductCard.addClass("card");
      var newProductCardHeading = $("<div>");
      newProductCardHeading.addClass("card-header");
  
  
      var confirmBtn = $("<button>");
      confirmBtn.text("PROCEED TO CHECKOUT");
      confirmBtn.addClass("confirm btn btn-success");
      var newProductName = $("<h2>");
  
  
      var newProductCardBody = $("<div>");
      newProductCardBody.addClass("card-body");
  
      var newProductBody = $("<p>");
      var newProductPrice = $("<p>");
      var newProductImg = $("<p>");
  
      newProductName.text("NAME : " +product.name + " ");
      newProductBody.text("ABOUT : " +product.description);
      newProductPrice.text("COST : " +product.price);
      newProductImg.text("IMAGE : " +product.img);
  
      newProductCardHeading.append(newProductName);
     
      newProductCardHeading.append(confirmBtn);
  
      newProductCardBody.append(newProductBody);
      newProductCardBody.append(newProductPrice);
      newProductCardBody.append(newProductImg);
      newProductCard.append(newProductCardHeading);
      newProductCard.append(newProductCardBody);
      newProductCard.data("product", product);
      return newProductCard;
    }
  
   
  
    //handle a checkout confirmation
    function handleProductConfirm() {
  
        var currentProduct = $(this)
        .parent()
        .parent()
        .data("product");
        console.log(currentProduct.id);
        
        $.ajax({
          method: "PUT",
          url: "/api/products/:id" + currentProduct.id,
          checkout: true
        }).then(window.location.href = "/checkout?product_id=" + currentProduct.id);
        //;
  
    }
  
  
    //display empty@here if nothing purchased
    function display() {
  
      checkoutContainer.empty();
      var messageH1 = $("<h1>");
      var messageH2 = $("<h2>");
      messageH1.css({ "text-align": "center", "margin-top": "50px", "color": "green" });
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH1.html("SUCCESS");
      messageH2.html("Shop again , navigate <a href='/view_products'>here</a> .");
      checkoutContainer.append(messageH1);
      checkoutContainer.append(messageH2);
    }
  
  
  
  });