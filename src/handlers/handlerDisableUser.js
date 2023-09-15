const { disableUser } = require("../controllers/disableUser");

// const handlerDisableUser = async(req, res) =>{
//     const {uid} = req.params;
//     try{
//       const message = await disableUser(uid);
//       res.status(200).json({ message: message});
//     }catch(error){
//         console.log(error);
//       res.status(500).json({ error: "Error interno del servidor." });
//     }
//   };
const handlerDisableUser = async (req, res) => {
    const { adminUid } = req.body;
    const { uid } = req.params;
    try {
      const message = await disableUser(adminUid, uid); // Pasa el UID del administrador y el UID del usuario a inhabilitar
      res.status(200).json({ message: message });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error interno del servidor." });
    }
  };

module.exports = {
    handlerDisableUser
}