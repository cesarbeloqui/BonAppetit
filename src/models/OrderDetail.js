const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "OrderDetail",
    {
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
      amount: {
        type: DataTypes.INTEGER,
        dafaultValue: 1,
      },
      extras: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
