const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('order', {
    id_Order: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
   id_Client: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('a_pagar','en_preparacion','para_entregar','entregado','cancelado'), 
      allowNull: false, 
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    order_date:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }
  });
};