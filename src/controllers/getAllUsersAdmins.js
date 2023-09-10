const {User} = require('../db')


const getAllUsersAdmins = async(_req, res) => { 
    try {
        res.status(200).json(await User.findAll({where:{role:"Admin"}}))
    } catch (error) {
        res.status(500).send(error.message)
    }
 }

module.exports = getAllUsersAdmins