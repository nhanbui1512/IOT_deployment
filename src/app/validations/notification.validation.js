const { StatusCodes } = require("http-status-codes");
const Joi = require("joi");

const getDataVal = async (req, response, next) => {
  try {
    const condition = Joi.object({
      page: Joi.number().integer().min(1),
      per_page: Joi.number().integer.min(1),
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
