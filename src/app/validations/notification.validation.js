const { StatusCodes } = require("http-status-codes");
const Joi = require("joi");

const getDataVal = async (req, response, next) => {
  try {
    const condition = Joi.object({
      page: Joi.number().integer().min(1),
      per_page: Joi.number().integer().min(1),
    });
    await condition.validateAsync(req.query);
    return next();
  } catch (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: error.message,
    });
  }
};

const createDataVal = async (req, response, next) => {
  try {
    const condition = Joi.object({
      deviceId: Joi.string().min(10).max(80).trim().required(),
      message: Joi.string().min(10).max(100).trim().required(),
    });
    await condition.validateAsync(req.body);
    return next();
  } catch (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: error.message,
    });
  }
};

module.exports = { getDataVal, createDataVal };
