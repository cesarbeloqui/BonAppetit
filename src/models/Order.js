const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(
        "Pagar",
        "En_preparacion",
        "Para_entregar",
        "Demorado",
        "Entregado",
        "Cancelado",
        "Mercado_Pago"
      ),
      allowNull: false,
      defaultValue: "Pagar",
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    take_away: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
