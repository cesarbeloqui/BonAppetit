const express = require("express");
const { User } = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {
  const { uid, email, displayName } = req.body;
  const user = { id: uid, displayName, email };

  try {
    const [createdUser, created] = await User.findOrCreate({
      where: { email: user.email },
      defaults: user,
    });

    if (created) {
      res.status(200).send(createdUser);
    } else {
      res.status(200).send({
        message: "El usuario ya existe.",
        user: {
          id: createdUser.id,
          displayName: createdUser.displayName,
          email: createdUser.email,
        },
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
