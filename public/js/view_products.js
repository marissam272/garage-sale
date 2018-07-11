$(document).ready(function() {
  /* global moment */
  // productContainer holds all of our posts
  var productContainer = $(".product-container");
  //var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleProductDelete);
  $(document).on("click", "button.edit", handleProductEdit);
  //postCategorySelect.on("change", handleCategoryChange);
  var products;

  // This function grabs posts from the database and updates the view
  function getProducts() {
    // var categoryString = category || "";
    // if (categoryString) {
    //   categoryString = "/category/" + categoryString;
    // }
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
    var newProductCard = $("<div>");
    newProductCard.addClass("card");
    var newProductCardHeading = $("<div>");
    newProductCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newProductName = $("<h2>");
    //var newPostDate = $("<small>");
    //var newPostCategory = $("<h5>");
    //newPostCategory.text(post.category);
    // newPostCategory.css({
    //   float: "right",
    //   "font-weight": "700",
    //   "margin-top":
    //   "-15px"
    // });
    var newProductCardBody = $("<div>");
    newProductCardBody.addClass("card-body");

    var newProductBody = $("<p>");
    newProductName.text(product.name + " ");
    newProductBody.text(product.description);
    //var formattedDate = new Date(post.createdAt);
    //formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    //newPostDate.text(formattedDate);
    //newPostTitle.append(newPostDate);
    newProductCardHeading.append(deleteBtn);
    newProductCardHeading.append(editBtn);
    newProductCardHeading.append(newProductName);
    //newProductCardHeading.append(newPostCategory);
    newProductCardBody.append(newProductBody);
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

  // This function displays a message when there are no posts
  function displayEmpty() {
    productContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No posts yet for this category, navigate <a href='/seller_manager'>here</a> in order to create a new post.");
    productContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  // function handleCategoryChange() {
  //   var newPostCategory = $(this).val();
  //   getPosts(newPostCategory);
  // }

});
