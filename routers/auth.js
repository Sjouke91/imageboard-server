const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const User = require("../models").user;
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: "Please supply a valid email and password",
    });
  } else {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).send({
        message: "User with that email does not exist",
      });
    }
    // 2. use bcrypt.compareSync to check the password against the stored hash
    else if (bcrypt.compareSync(password, user.password)) {
      // 3. if the password is correct, return a JWT with the userId of the user (user.id)
      const jwt = toJWT({ userId: user.id });
      res.send({
        jwt,
      });
    } else {
      res.status(400).send({
        message: "Password was incorrect",
      });
    }
    res.send({
      jwt: toJWT({ userId: 1 }),
    });
  }
});

module.exports = router;
