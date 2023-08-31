const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('pedido', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
   Id_Cliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    estado: {
      type: DataTypes.ENUM('a_pagar','en_preparacion','para_entregar','entregado','cancelado'),
         
    },
    importe_total: {
      type: DataTypes.FLOAT,
     
    },
    estado_pago: {
      type: DataTypes.BOOLEAN,
      
    }
    
  })
} 