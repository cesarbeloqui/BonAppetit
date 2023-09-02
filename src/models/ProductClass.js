const { DataTypes } = require ('sequelize')

module.exports = (sequelize) => {
    sequelize.define ( 'ProductClass', {

        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        class: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        }
    },
    { timestamps: false }
    );
}