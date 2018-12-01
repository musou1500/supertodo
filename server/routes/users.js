const models = require("../models");
const yup = require("yup");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");

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

router.get(
  "/",
  validate({
    query: {
      limit: yup
        .number()
        .positive()
        .integer()
        .default(50),
      minId: yup
        .number()
        .positive()
        .integer(),
      maxId: yup
        .number()
        .positive()
        .integer()
    }
  }),
  async (req, res) => {
    const opts = {
      order: [["updatedAt", "desc"]],
      ...util.queryToOpts(req.query)
    };

    const users = await models.User.findAll(opts);
    res.send(users);
  }
);

router.get("/:screenId", async (req, res) => res.send(req.user));

module.exports = router;
