const Joi = require("joi");

function isStrongPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

const changePassValidation = async (req, response, next) => {
  const condition = Joi.object({
    oldPassword: Joi.string().min(10).max(30).required().trim().strict(),
    newPassword: Joi.string().min(10).max(30).required().trim().strict(),
  });

  try {
    await condition.validateAsync(req.body, { abortEarly: false });
    const checkNewPassword = isStrongPassword(req.body.newPassword);

    if (!checkNewPassword)
      return response.status(422).json({ newPassword: "Password is invalid" });

    return next();
  } catch (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: error.message,
    });
  }
};

module.exports = { changePassValidation };
