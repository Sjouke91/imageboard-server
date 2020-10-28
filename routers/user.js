const { Router } = require("express");
const router = new Router();
const User = require("../models").user;

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

module.exports = router;
