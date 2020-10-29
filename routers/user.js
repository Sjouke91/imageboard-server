const { Router } = require("express");
const router = new Router();
const User = require("../models").user;
const bcrypt = require("bcrypt");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (!users) {
      res.status(404).send("no users found");
    } else {
      res.send(users);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(400).send("submit fullname, password and email");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
      });
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
