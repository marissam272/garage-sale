module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
      // Giving the User model a name of type STRING
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
          type:DataTypes.STRING
    },
      password: {
        type: DataTypes.TEXT,
        // allowNull: false,
        // len: [1]
      }
    });
      
    return User;

  };