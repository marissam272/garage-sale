module.exports = function(sequelize, DataTypes) {
    var Seller = sequelize.define("Seller", {
      // Giving the Seller model a name of type STRING
      sellerName: DataTypes.STRING,
      sellerContactNumber: DataTypes.INTEGER,
      sellerLocation: DataTypes.STRING
    });
  
    Seller.associate = function(models) {
      // Associating Seller with Posts
      // When an Seller is deleted, also delete any associated Posts
      Seller.hasMany(models.Post, {
        onDelete: "cascade"
      });
    };
  
    return Seller;
  };
  