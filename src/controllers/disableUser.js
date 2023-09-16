const { User } = require("../db");

// const disableUser = async(uid) =>{
//     try {
//       const user = await User.findByPk(uid);
//       if(!user){
//         throw new Error("Usuario no encontrado");
//       }
//       if(user.role !== "Admin"){
//         throw new Error("Acceso denegado. Solo los Admin pueden inhabilitar usuarios");
//       }
//       await User.update({ disabled: true}, {where: {id: uid}});
//       return "Usuario inhabilitado con exito";
//     } catch (error) {
//       throw error;
//     }
//   };
const disableUser = async (adminUid, targetUid) => {
    try {
      const admin = await User.findByPk(adminUid);
      const targetUser = await User.findByPk(targetUid);
      if (!admin || !targetUser) {
        throw new Error("Usuario no encontrado");
      }
      if (admin.role !== "Admin") {
        throw new Error("Acceso denegado. Solo los Admin pueden inhabilitar usuarios");
      }
      if (targetUser.role !== "Client") {
        throw new Error("No puedes inhabilitar a un usuario que no es un cliente");
      }
      if(admin.role === "Admin"){
          await User.update({ disabled: true }, { where: { id: targetUid } });
          return "Usuario inhabilitado con éxito";
      }
    } catch (error) {
      throw error;
    }
  };
  

module.exports = {
    disableUser
}