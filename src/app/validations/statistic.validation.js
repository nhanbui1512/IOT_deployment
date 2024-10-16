const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

const getDataVal = async (req, response, next) => {
  try {
    const condition = Joi.object({
      deviceId: Joi.string().min(10).max(50).required().trim().strict(),
      date: Joi.date().required(),
      type: Joi.string().valid("average", "list").required().trim().strict(),
      month: Joi.number().min(1).max(12),
      year: Joi.number().min(2023),
    });

    await condition.validateAsync(req.query);
    return next();
  } catch (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: error.message,
    });
  }
};

module.exports = { getDataVal };
