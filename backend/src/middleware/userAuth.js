const joi = require("joi");

const signupValidation = (req, res, next) => {
  const Schema = joi.object({
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .min(6) 
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{6,}$"))
      .required()
      .messages({
        "string.pattern.base":
          "Password must contain at least one letter and one number.",
      }),
  });

  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

const loginValidation = (req, res, next) => {
  const Schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = { signupValidation, loginValidation };
