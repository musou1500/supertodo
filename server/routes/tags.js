const models = require("../models");
const express = require("express");
const router = express.Router();

router.param("id", (req, res, next, id) => {
  const tag = await models.Tag.findByPk(id);

  if (task === undefined) {
    res.status(404).send({
      error: "no such tag"
    });
    return;
  }

  req.tag = tag;
  next();
});

router.get("/", (req, res) => {
  const tags = await models.Tag.findAll();
  res.send(tags);
});

router.post("/", (req, res) => {
  const tag = await models.Tag.create({
    name: req.body.name,
    color: req.body.color
  });

  res.send(tag);
});

router.delete("/:id", (req, res) => {
  await req.tag.destroy();
  res.send(req.tag);
});

module.exports = router;
