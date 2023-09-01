const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        name: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        imagen: {
           type: DataTypes.STRING,
        },
        description: {
           type: DataTypes.TEXT,
           allowNull: false,
        },
        stock: {
            type: DataTypes.BOOLEAN,
        },
    })
} 