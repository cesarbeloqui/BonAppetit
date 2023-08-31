const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('detalle', {
    idDetalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    importe_total: {
      type: DataTypes.FLOAT,
     
    },
    idPedido: {
      type: DataTypes.INTEGER,
      
    },
    idProducto: {
      type: DataTypes.INTEGER,
      
    },

    adicionales: {
      type: DataTypes.STRING

    }
 })
} 