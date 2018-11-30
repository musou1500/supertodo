const models = require("../models");
const validate = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const express = require("express");
const yup = require("yup");
const router = express.Router();

router.param("id", async (req, res, next, id) => {
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

router.use(auth());

router.get("/", async (req, res) => {
  const tags = await models.Tag.findAll();
  res.send(tags);
});

router.post(
  "/",
  validate({
    body: {
      name: yup.string().required(),
      color: yup.string().matches(/^#[A-Fa-f0-9]{6}$/)
    }
  }),
  async (req, res) => {
    const tag = await models.Tag.create({
      name: req.body.name,
      color: req.body.color
    });

    res.send(tag);
  }
);

router.delete("/:id", async (req, res) => {
  await req.tag.destroy();
  res.send(req.tag);
});

module.exports = router;
