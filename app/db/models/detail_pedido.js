const {DataTypes} = require ("sequelize");

module.exports = (sequelize) =>{
    sequelize.define("detail_order", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
        },
        id_Order:{
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        id_Product:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price:{
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        stock:{
            type: DataTypes.BOOLEAN,
        },
        extras:{
            type: DataTypes.STRING
        }
    });
};