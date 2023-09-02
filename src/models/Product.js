const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
  sequelize.define('Product', {
        Id: {
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
            type: DataTypes.DECIMAL,
            allowNull: false
        },

        imagen: {
           type: DataTypes.STRING,
           allowNull: false
        },
     
        stock: {
            type: DataTypes.BOOLEAN,
        },

        enable: {
            type: DataTypes.BOOLEAN,
            dafaultValue: true

        }
    },
    { timestamps: false }
    )
} 