const jwt = require("jsonwebtoken");
const { ENV_VARS } = require("../../config/envVars.js");

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "1d" });

  res.cookie("jwt-healthy", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true, // Cookie cannot be accessed by JavaScript
    samesite: "strict", // Cookie is sent only to the same site as the one that originated the request
    secure: ENV_VARS.NODE_ENV !== "development", // Cookie is sent only over HTTPS
  });

  return token;
};

module.exports = { generateTokenAndSetCookie };
