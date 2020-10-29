const { Router } = require("express");
const router = new Router();
const Image = require("../models").image;
const { toJWT, toData } = require("../auth/jwt");

// router.get("/", async (req, res, next) => {
//   try {
//     const images = await Image.findAll();
//     if (!images) {
//       res.status(404).send("no images found");
//     } else {
//       res.send(images);
//     }
//   } catch (e) {
//     next(e);
//   }
// });

// router.get("/", (req, res, next) => {
// const limit = Math.min(req.query.limit || 25, 500);
// const offset = req.query.offset || 0;

//   Image.findAndCountAll({ limit, offset })
//     .then((result) => res.send({ images: result.rows, total: result.count }))
//     .catch((error) => next(error));
// });

router.get("/", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  const limit = Math.min(req.query.limit || 25, 500);
  const offset = req.query.offset || 0;
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
    } catch (e) {
      res.status(400).send("Invalid JWT token");
    }
    const allImages = await Image.findAndCountAll({ limit, offset });
    res.json(allImages);
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials",
    });
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
