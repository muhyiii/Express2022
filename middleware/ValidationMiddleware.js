const { validationResult } = require("express-validator");

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: "fail",
      errors: errors.mapped(),
    });
  }
  next();
};

module.exports = validationMiddleware;
