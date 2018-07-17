$(document).ready(function () {


  //container to hold our details
  var checkoutContainer = $(".checkout-container");
  //buttons for confirmation and cancelation of purchase
  $(document).on("click", "button.confirm", handleProductConfirm);
  $(document).on("click", "button.cancel", handleProductCancel);

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
    //checkoutContainer.empty();
    var productsToAdd = [];
    var productsinCheckout = [];

    for (var i = 0; i < products.length; i++) {
      if (products[i].id == idurl) {
        productsToAdd.push(createNewRow(products[i]));
      }
    }
    checkoutContainer.append(productsToAdd);

    for (var i = 0; i < products.length; i++) {
      if (products[i].checkout) {
        productsinCheckout.push(createNewRow(products[i]));
      }
    }
    checkoutContainer.append(productsinCheckout);
    
  }

  //this holds our product details and buttons
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
    var newProductImg = $("<img src =" +product.img + " height='100'width='100' > ");

    newProductName.text("NAME : " +product.name + " ");
    newProductBody.text("ABOUT : " +product.description);
    newProductPrice.text("COST : $" +product.price);
    //newProductImg.text("IMAGE : " +product.img);

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

  //handle an order cancelllation

  function handleProductCancel() {
    window.location.href = "/view_products";
  }



  //handle a checkout confirmation
  function handleProductConfirm() {

    var currentProduct = $(this)
      .parent()
      .parent()
      .data("product");
    deleteProduct(currentProduct.id);

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


  function deleteProduct(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/products/" + id
    })
      .then(function () {
        display();
      });
  }


});