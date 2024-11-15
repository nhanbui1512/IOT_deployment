const { StatusCodes } = require("http-status-codes");
const Joi = require("joi");

async function createDevice(req, response, next) {
  try {
    const condition = Joi.object({
      deviceId: Joi.string().min(10).max(80).trim().required(),
      deviceName: Joi.string().min(10).max(100).trim().required(),
      deviceType: Joi.string().min(10).max(100).trim().required(),
    });

    await condition.validateAsync(req.body);
    return next();
  } catch (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: error.message,
    });
  }
}

module.exports = { createDevice };
