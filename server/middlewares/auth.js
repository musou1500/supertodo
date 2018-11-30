const jwt = require("jsonwebtoken");

module.exports = () => (req, res, next) => {
  try {
    if (req.token === undefined) {
      throw new Error();
    }

    const user = jwt.verify(req.token, process.env.JWT_SECRET);
    req.me = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "unauthorized" });
  }
};
