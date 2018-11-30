const util = require("util");
const models = require("../models");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const yup = require("yup");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const router = express.Router();

const hashPassword = util.promisify(bcrypt.hash);
const comparePassword = util.promisify(bcrypt.compare);

const screenIdRegexp = /^[a-zA-Z-_]+$/;

router.post(
  "/signup",
  validate({
    body: {
      name: yup.string().required(),
      screenId: yup
        .string()
        .matches(screenIdRegexp)
        .required(),
      password: yup
        .string()
        .required()
        .min(6)
    }
  }),
  async (req, res) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const password = await hashPassword(req.body.password, saltRounds);
    const user = await models.User.create({
      name: req.body.name,
      screenId: req.body.screenId,
      password
    });

    res.send(user);
  }
);

router.get("/me", auth(), async (req, res) => {
  const user = await models.User.findOne({
    where: { screenId: req.me.screenId }
  });
  res.send(user);
});

router.post(
  "/login",
  validate({
    body: {
      screenId: yup
        .string()
        .matches(screenIdRegexp)
        .required(),
      password: yup
        .string()
        .required()
        .min(6)
    }
  }),
  async (req, res) => {
    const user = await models.User.findOne({
      where: { screenId: req.body.screenId }
    });

    const isCorrect =
      user !== undefined &&
      (await comparePassword(req.body.password, user.password));
    if (!isCorrect) {
      res.status(401).send({
        error: "incorrect credential"
      });
      return;
    }

    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
    res.send({
      user,
      token
    });
  }
);

module.exports = router;
