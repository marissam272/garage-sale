
$(document).ready(function() {
    // Getting a reference to the input field where user adds a new todo
    var $newItemInput = $("input.new-item");
    // Our new todos will go inside the todoContainer
    var $productContainer = $(".product-container");
    // Adding event listeners for deleting, editing, and adding todos
    $(document).on("click", "button.delete", deleteProduct);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".product-item", editProduct);
    $(document).on("keyup", ".product-item", finishEdit);
    $(document).on("blur", ".product-item", cancelEdit);
    $(document).on("submit", "#product-form", insertProduct);
  
    // Our initial todos array
    var products = [];
  
    // Getting todos from database when page loads
    getProducts();
  
    // This function resets the todos displayed with new todos from the database
    function initializeRows() {
      $productContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < products.length; i++) {
        rowsToAdd.push(createNewRow(products[i]));
      }
      $productContainer.prepend(rowsToAdd);
    }
  
    // This function grabs todos from the database and updates the view
    function getProducts() {
      $.get("/api/products", function(data) {
        products = data;
        initializeRows();
      });
    }
  
    // This function deletes a todo when the user clicks the delete button
    function deleteProduct(event) {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/products/" + id
      }).then(getProducts);
    }
  
    // This function handles showing the input box for a user to edit a todo
    function editProduct() {
      var currentProduct = $(this).data("product");
      $(this).children().hide();
      $(this).children("input.edit").val(currentProduct.text);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // Toggles complete status
    function toggleComplete(event) {
      event.stopPropagation();
      var product = $(this).parent().data("product");
      product.complete = !product.complete;
      updateProduct(product);
    }
  
    // This function starts updating a todo in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedProduct = $(this).data("product");
      if (event.which === 13) {
        updatedProduct.text = $(this).children("input").val().trim();
        $(this).blur();
        updateProduct(updatedProduct);
      }
    }
  
    // This function updates a todo in our database
    function updateProduct(product) {
      $.ajax({
        method: "PUT",
        url: "/api/products",
        data: product
      }).then(getProducts);
    }
  
    // This function is called whenever a todo item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentProduct = $(this).data("product");
      if (currentProduct) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentProduct.text);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a todo-item row
    function createNewRow(product) {
      var $newInputRow = $(
        [
          "<li class='list-group-item product-item'>",
          "<span>",
          product.text,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "<button class='complete btn btn-primary'>✓</button>",
          "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", product.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("product", product);
      if (product.complete) {
        $newInputRow.find("span").css("text-decoration", "line-through");
      }
      return $newInputRow;
    }
  
    // This function inserts a new todo into our database and then updates the view
    function insertProduct(event) {
      event.preventDefault();
      var product = {
        text: $newItemInput.val().trim(),
        complete: false
      };
  
      $.post("/api/products", product, getProducts);
      $newItemInput.val("");
    }
  });
