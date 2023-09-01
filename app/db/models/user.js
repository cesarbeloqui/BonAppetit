const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER,
      autoincrement: true,
      primaryKey: true,
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
      type: DataTypes.ENUM("Client", "Admin"),
      allowNull: false,
      defaultValue: "Client"
    }
  });
  };


