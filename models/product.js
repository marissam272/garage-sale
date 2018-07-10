module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      productName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      productDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      productPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        len: [1]
      },
      productImg: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    },
  );
  
    Post.associate = function(models) {
      // We're saying that a Post should belong to an Seller
      // A Post can't be created without an Seller due to the foreign key constraint
      Post.belongsTo(models.Seller, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Post;
  };