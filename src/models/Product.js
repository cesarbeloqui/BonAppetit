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
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(10 ,2 ), //almacena precio con 8 digitos y 2 decimales
        allowNull: false,
      },

      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      stock: {
        type: DataTypes.BOOLEAN,
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
