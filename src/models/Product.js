const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10 ,2 ), //almacena precio con 8 digitos y 2 decimales
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      qualification: {
        type: DataTypes.ENUM("1","2","3","4","5")      
      },
      enable: {
        type: DataTypes.BOOLEAN,
        dafaultValue: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      }
    },
    { timestamps: false }
  );
};
