module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the User model a name of type STRING
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
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