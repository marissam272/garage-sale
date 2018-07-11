$(document).ready(function() {

    // Our new todos will go inside the todoContainer
    var $productContainer = $(".product-container");

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
    
});