const models = require("../models");
const express = require("express");
const yup = require("yup");
const router = express.Router();
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");

router.param("id", async (req, res, next, id) => {
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

router.get(
  "/",
  validate({
    query: {
      limit: yup
        .number()
        .positive()
        .integer()
        .default(50)
    }
  }),
  async (req, res) => {
    const tasks = await models.Task.findAll({
      limit: req.query.limit,
      order: [["updatedAt", "desc"]],
      include: [
        models.Tag,
        { model: models.User, as: "author" },
        { model: models.User, as: "assignee" }
      ]
    });

    res.send(tasks);
  }
);

router.post(
  "/",
  validate({
    body: {
      tags: yup.array().of(
        yup.object().shape({
          id: yup
            .number()
            .positive()
            .integer()
            .required()
        })
      ),
      authorId: yup
        .number()
        .positive()
        .integer()
        .required(),
      assigneeId: yup
        .number()
        .positive()
        .integer()
        .required(),
      name: yup.string().required()
    }
  }),
  async (req, res) => {
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
  }
);

router.delete("/:id", async (req, res) => {
  await req.task.destroy();
  res.send(req.task);
});

router.get("/:id", async (req, res) => res.send(req.task));

module.exports = router;
