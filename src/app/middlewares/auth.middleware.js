require("dotenv").config();
const jwt = require("jsonwebtoken");

async function authMiddleWare(req, response, next) {
  const authHeader = String(req.headers["authorization"] || "");

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      var decode = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decode.userId;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return response
          .status(401)
          .json({ status: 401, message: "Token expired" });
      } else if (error.name === "JsonWebTokenError") {
        return response
          .status(401)
          .json({ status: 401, authorize: "Invalid token" });
      } else {
        return response
          .status(500)
          .json({ error: "Internal server error", status: 500 });
      }
    }
  } else {
    return response
      .status(401)
      .json({ status: 401, authorize: "No token provided" });
  }
}

module.exports = {
  authMiddleWare,
};
