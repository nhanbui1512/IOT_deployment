const dotenv = require("dotenv");

dotenv.config();

const ENV_VARS = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};

module.exports = { ENV_VARS };
