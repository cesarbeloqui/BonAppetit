const { 
    createProduct,
    findallProduct, 
    destroyProduct,
    recoverProduct,
    updateProduct
} = require ('../controllers/product.js')



//  trae todos las clases de productos. se le pasa por query "deleted" para filtrar productos borrados
const getAllProduct =   async (req,res) => {
    try {
        const {deleted}  = req.query
        const productClass = await findallProduct(deleted)
        res.status(200).json(productClass)
    } catch (error) {res.status(400).json({error: error.message})}
      
};

// para crear un producto
const postProduct = async (req,res) => {
    try {
        const product = req.body;
        const newProduct = await createProduct(product);
        res.status(201).json(newProduct) ;
    } catch (error) {res.status(400).json({error: error.message})};
      
}

//  para borrar   ( borrado logico )

const deleteProduct = async (req,res) => {
    try {
        const {id} = req.params
        const {deleted} = req.query
        const delProduct = await destroyProduct(id,deleted)
        res.status(201).send(delProduct)
    } catch (error) {res.status(400).json({error: error.message})}
      
}

// ruta para recuperar o editar producto   
const putProduct = async (req,res) => {
    try {
        const {id} = req.params
        const {deleted} = req.query
        const product = req.body
      
        if (deleted === 'false') {
            const recover = await recoverProduct(id,deleted);
            res.send(recover);
          } else {
            const update = await updateProduct(id,product);
            res.send(update);
          }
    } catch (error) {res.status(400).json({error: error.message})}
}

module.exports = {
    getAllProduct,
    putProduct,
    deleteProduct,
    postProduct,
  };
  