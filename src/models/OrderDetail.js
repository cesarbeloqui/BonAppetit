const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("OrderDetail", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.BOOLEAN
      },
      extras:{
        type:DataTypes.STRING,
      }
    },
    { timestamps: false }
  );
};