const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validation: {
            isEmail:true,
        },
      },
      password:{
        type:DataTypes.STRING,
        allowNull: false,
      },
      role:{
        type: DataTypes.ENUM("Client", "Admin"),
        allowNull: false,
        defaultValue: "Client"
      }
    },
    { timestamps: false }
  );
};