const util = require("util");
const models = require("../models");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const hashPassword = util.promisify(bcrypt.hash);
const comparePassword = util.promisify(bcrypt.compare);

router.post("/signup", async (req, res) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const password = bcrypt.hash(req.body.password, saltRounds);
  const user = await models.User.create({
    name: req.body.name,
    screenName: req.body.screenId,
    password
  });

  res.send(user);
});

router.post("/login", async (req, res) => {
  const user = await models.User.findOne({
    where: { screenId: req.body.screenId }
  });

  const isCorrect =
    user !== undefined &&
    (await comparePassword(req.body.password, user.password));
  if (isCorrect) {
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
});

module.exports = router;
