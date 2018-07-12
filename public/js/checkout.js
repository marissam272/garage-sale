$(document).ready(function () {

  var checkoutContainer = $(".checkout-container");

  $(document).on("click", "button.confirm", handleProductConfirm);
  $(document).on("click", "button.cancel", handleProductCancel);

  var products;

  var url = window.location.search;
  var id = url.substring(url.lastIndexOf('=')+1);
  console.log(url);
  console.log(id);

  getProducts(id);

  function getProducts(id) {

  

      $.get("/api/products", function (data) {
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

  // This function displays a message when there are no items in checkout
  function displayEmpty() {
    checkoutContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No purchases yet , navigate <a href='/view_products'>here</a> if you wish to purchase a product.");
    checkoutContainer.append(messageH2);
  }

  function initializeRows() {
    checkoutContainer.empty();
    var productsToAdd = [];
    for (var i = 0; i < products.length; i++) {
      productsToAdd.push(createNewRow(products[i]));
    }
    checkoutContainer.append(productsToAdd);
  }

  function createNewRow(product) {
    var newProductCard = $("<div class='container'>");
    newProductCard.addClass("card");
    var newProductCardHeading = $("<div>");
    newProductCardHeading.addClass("card-header");

    var cancelBtn = $("<button>");
    cancelBtn.text("Cancel");
    cancelBtn.addClass("cancel btn btn-danger");

  
    var confirmBtn = $("<button>");
    confirmBtn.text("CONFIRM PURCHASE");
    confirmBtn.addClass("confirm btn btn-success");
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
    newProductCardHeading.append(cancelBtn);
    newProductCardHeading.append(confirmBtn);
   
    newProductCardBody.append(newProductBody);
    newProductCardBody.append(newProductPrice);
    newProductCardBody.append(newProductImg);
    newProductCard.append(newProductCardHeading);
    newProductCard.append(newProductCardBody);
    newProductCard.data("product", product);
    return newProductCard;
  }

  function handleProductCancel(){
    window.location.href = "/view_products";
  }

  function handleProductConfirm(){

    console.log("herer");
    var currentProduct = $(this)
    .parent()
    .parent()
    .data("product");
    deleteProduct(currentProduct.id);

    console.log("herer");

  }

  function display(){

    checkoutContainer.empty();
    var messageH1 = $("<h1>");
    var messageH2 = $("<h2>");
    messageH1.css({"text-align":"center","margin-top":"50px","color":"green"});
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH1.html("SUCCESS");
    messageH2.html("Shop again , navigate <a href='/view_products'>here</a> .");
    checkoutContainer.append(messageH1);
    checkoutContainer.append(messageH2);
  }


  function deleteProduct(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/products/" + id
    })
      .then(function() {
        display();
      });
  }


});