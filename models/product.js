module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("product", {
      name: {
        type: DataTypes.TEXT,
        // allowNull: false,
        // validate: {
        //   len: [1]
        // }
      },
      description: {
        type: DataTypes.TEXT,
        // allowNull: false,
        // len: [1]
      },
      price: {
        type: DataTypes.INTEGER,
        // allowNull: false,
        // len: [1]
      },
      img: {
        type: DataTypes.TEXT,
        // allowNull: false,
        // len: [1]
      }
    },
  );
  
    // Post.associate = function(models) {
    //   // We're saying that a Post should belong to an Seller
    //   // A Post can't be created without an Seller due to the foreign key constraint
    //   Post.belongsTo(models.Seller, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };
  
    return Product;
  };