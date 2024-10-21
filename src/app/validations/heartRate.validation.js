const { StatusCodes } = require("http-status-codes");
const Joi = require("joi");

const createDataVal = async (req, response, next) => {
  try {
    const condition = Joi.object({
      deviceId: Joi.string().min(5).max(80).required(),
      heartRateValue: Joi.number().integer().min(0).required(),
      oxygen: Joi.number().integer().min(0).required(),
    });
    await condition.validateAsync(req.body);
    return next();
  } catch (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: error.message,
    });
  }
};

module.exports = {
  createDataVal,
};
