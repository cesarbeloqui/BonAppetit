const { DataTypes } = require ('sequelize')

module.exports = (sequelize) => {
    sequelize.define ( 'tipoProducto', {

        idTipo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tipo: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }

        
    })
}