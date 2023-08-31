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
        },

        imagen: {
           type: DataTypes.STRING,
        },
     
        tipo: {
           type: DataTypes.STRING,
        },
     
        stock: {
            type: DataTypes.BOOLEAN,
        },
    })
} 