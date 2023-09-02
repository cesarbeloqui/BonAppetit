const { where } = require('sequelize')
const { ProductClass } = require ('../db')

const allProductClasses = async () => {
    const classes =  await ProductClass.findAll()
    return classes
}

const createProductClass = async (productClass) => {
    const newClass = await ProductClass.create({
        class: productClass
    })
    return newClass
}

const deleteProductClass = async (id) => {
    const productClass  = await ProductClass.findByPk(id)
    if (productClass) {
       productClass.destroy() 
       return ('clase de producto borrada con exito')
    }  else  { return ('no hay nada para borrar')}
}

const updateProductClass = async (id,productClass) => {
    
    await ProductClass.update({
        class: productClass },
        { where: { Id: id} }
    )
    const updateClass =  ProductClass.findByPk(id)
    return updateClass
}

module.exports = { allProductClasses, createProductClass ,deleteProductClass , updateProductClass}