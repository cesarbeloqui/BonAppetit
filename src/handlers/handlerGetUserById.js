const { User } = require("../db");

const handlerGetUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

module.exports = handlerGetUserById;
/* const user = await User.findAll({
    where: {
      id,
    },
  }); */
