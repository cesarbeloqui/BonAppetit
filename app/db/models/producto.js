const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('producto', {
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        nombre: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        precio: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        imagen: {
           type: DataTypes.STRING,
           allowNull: false
        },
     
        stock: {
            type: DataTypes.BOOLEAN,
        },
    })
} 