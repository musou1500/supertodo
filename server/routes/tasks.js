const models = require("../models");
const express = require("express");
const yup = require("yup");
const router = express.Router();
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");

router.param("id", async (req, res, next, id) => {
  const task = await models.Task.findByPk(id);

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
      order: [["updatedAt", "desc"]]
    });

    res.send(tasks);
  }
);

router.post(
  "/",
  validate({
    body: {
      tags: yup.array().of(
        yup
          .number()
          .positive()
          .integer()
          .required()
      ),
      assigneeId: yup
        .number()
        .positive()
        .integer(),
      name: yup.string().required()
    }
  }),
  async (req, res) => {
    // TODO: add transaction
    const task = await models.sequelize.transaction(async transaction => {
      const task = await models.Task.create(
        {
          assigneeId: req.body.assigneeId,
          authorId: req.me.id,
          name: req.body.name
        },
        { transaction }
      );

      // nested create supports only full creates
      await task.setTags(req.body.tags, { transaction });
      return task;
    });

    await task.reload();
    res.send(task);
  }
);

router.delete("/:id", async (req, res) => {
  await req.task.destroy();
  res.send(req.task);
});

router.get("/:id", async (req, res) => res.send(req.task));

module.exports = router;
