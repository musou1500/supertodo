const models = require("../models");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.param("screenId", async (req, res, next, screenId) => {
  const user = await models.User.findOne({ where: { screenId } });

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

router.post("/", async (req, res) => {
  const task = await models.Task.create(
    {
      assigneeId: req.body.assigneeId,
      authorId: req.body.authorId,
      name: req.body.name,
      tags: req.body.tags
    },
    {
      include: [
        models.Tag,
        { model: models.User, as: "author" },
        { model: models.User, as: "assignee" }
      ]
    }
  );

  res.send(task);
});

router.get("/:screenId", async (req, res) => res.send(req.user));
router.get("/me", async (req, res) => {
  const user = await models.User.findOne({
    where: { screenId: req.me.screenId }
  });
  res.send(user);
});

module.exports = router;
