module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the User model a name of type STRING
      login: {
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