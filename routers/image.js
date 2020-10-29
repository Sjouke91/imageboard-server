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

router.get("/:imageId", async (req, res, next) => {
  try {
    const id = req.params.imageId;
    const image = await Image.findByPk(id);
    if (!image) {
      res.status(404).send("image not found");
    }
    res.send(image);
  } catch {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) {
      res.status(400).send("this request needs a title and an url");
    }
    const newImage = await Image.create({ title, url });
    res.send(newImage);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
