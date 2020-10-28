const { Router } = require("express");
const router = new Router();
const Image = require("../models").image;

router.get("/", async (req, res, next) => {
  try {
    const images = await Image.findAll();
    if (!images) {
      res.status(404).send("no images found");
    } else {
      res.send(images);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
