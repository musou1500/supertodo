const yup = require("yup");

module.exports = opts => {
  const querySchema = opts.query && yup.object().shape(opts.query);
  const bodySchema = opts.body && yup.object().shape(opts.body);

  return async (req, res, next) => {
    try {
      if (querySchema !== undefined) {
        req.query = await querySchema.validate(req.query);
      }

      if (bodySchema !== undefined) {
        req.body = await bodySchema.validate(req.body);
      }

      next();
    } catch (e) {
      next(e);
    }
  };
};
