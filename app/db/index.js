'use strict'

require('dotenv').config({ path: `${process.cwd()}/.env` })
const modelpedido = require ('./models/pedido.js')
const modelproducto = require ('./models/producto.js')
const modeluser = require ('./models/user.js')
const modelTipoProducto = require ('./models/tipoProducto.js')

const { Sequelize, DataTypes } = require('sequelize')

// Define node env
const env = process.env.NODE_ENV || 'dev'

const dialectOptions = env === 'dev' ? {  } : {
	ssl: {
		require: true,
		rejectUnauthorized: false
	}
}

// Define connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	logging: false,
	dialectOptions
})

// Define model

modelpedido(sequelize,DataTypes)
modelproducto(sequelize,DataTypes)
modeluser(sequelize,DataTypes)
modelTipoProducto(sequelize,DataTypes)

console.log(sequelize.models)
// Define associate
const { user, pedido , producto , tipoProducto } = sequelize.models

user.hasMany(pedido)
pedido.belongsToMany(producto, {through: 'Detail_order', foreignKey: 'idOrder'})
producto.belongsToMany(pedido, {through: 'Detail_order', foreignKey: 'idProduct'})

producto.belongsToMany(tipoProducto, { through: 'Tipos_producto'})
tipoProducto.belongsToMany(producto, { through: 'Tipos_producto'})


module.exports = sequelize
