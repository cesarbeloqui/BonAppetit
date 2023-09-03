const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{

    const User = sequelize.define('user', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role:{
            type: DataTypes.ENUM("Client", "Admin"),
            allowNull: false,
            defaultValue: "Client"
        }
    });
    return User;
};