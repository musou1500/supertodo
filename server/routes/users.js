const models = require("../models");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.param("screenId", async (req, res, next, screenId) => {
  const user = await models.User.findOne({
    where: { screenId }
  });

  if (user === undefined) {
    res.status(404).send({
      error: "no such user"
    });
    return;
  }

  req.user = user;
  next();
});

router.use(auth());

// TODO: add pagination
router.get("/", async (req, res) => {
  const users = await models.User.findAll();
  res.send(users);
});

router.get("/:screenId", async (req, res) => res.send(req.user));

module.exports = router;
