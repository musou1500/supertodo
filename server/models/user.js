"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      screenId: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] }
      }
    }
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
