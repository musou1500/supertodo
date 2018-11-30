"use strict";
module.exports = (sequelize, DataTypes) => {
  const TaskTag = sequelize.define("TaskTag", {
    tagId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER
  });
  TaskTag.associate = function(models) {};
  return TaskTag;
};
