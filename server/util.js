const models = require("./models");

module.exports.queryToOpts = query => {
  const Op = models.Sequelize.Op;
  const opts = {
    limit: query.limit,
    where: (query.minId || query.maxId) && {
      id: {}
    }
  };

  if (query.minId) {
    opts.where["id"][Op.gt] = query.minId;
  }

  if (query.maxId) {
    opts.where["id"][Op.lt] = query.maxId;
  }

  console.log(query, opts);

  return opts;
};
