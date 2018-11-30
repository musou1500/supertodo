"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    authorId: DataTypes.INTEGER,
    assigneeId: DataTypes.INTEGER,
    name: DataTypes.STRING
  });
  Task.associate = function(models) {
    // associations can be defined here
    models.Task.belongsTo(models.User, {
      foreignKey: "assigneeId",
      as: "assignee"
    });

    models.Task.belongsTo(models.User, {
      foreignKey: "authorId",
      as: "author"
    });

    models.Task.belongsToMany(models.Tag, {
      through: "TaskTags",
      foreignKey: "taskId",
      as: "tags"
    });
  };
  return Task;
};
