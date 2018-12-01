const models = require("../models");
const express = require("express");
const yup = require("yup");
const router = express.Router();
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const util = require("../util");

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

    const tasks = await models.Task.findAll(opts);
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
      assignee: yup
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
          assigneeId: req.body.assignee,
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
