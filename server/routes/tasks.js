const models = require("../models");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.param("id", (req, res, next, id) => {
  const task = await models.Task.findByPk(id, {
    include: [
      models.Tag,
      { model: models.User, as: "author" },
      { model: models.User, as: "assignee" }
    ]
  });

  if (task === undefined) {
    res.status(404).send({
      error: "no such task"
    });
    return;
  }

  req.task = task;
  next();
});

router.use(auth());

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const defaultLimit = 50;
  const tasks = await models.Task.findAll({
    limit: isNaN(limit) || limit <= 0 ? defaultLimit : limit,
    order: [["updatedAt", "desc"]],
    include: [
      models.Tag,
      { model: models.User, as: "author" },
      { model: models.User, as: "assignee" }
    ]
  });

  res.send(tasks);
});

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

router.delete("/:id", async (req, res) => {
  await req.task.destroy();
  res.send(req.task);
});

router.get("/:id", async (req, res) => res.send(req.task));

module.exports = router;
