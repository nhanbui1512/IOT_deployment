const env = require("dotenv");
const axios = require("axios");
env.config();

async function pushNotification(message) {
  try {
    const response = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      {
        to: process.env.deviceToken,
        sound: "default",
        title: "Falling App",
        body: message || "This is a test notification sent via Postman!",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = { pushNotification };
