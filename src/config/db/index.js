const mongoose = require("mongoose");

async function connect() {
  try {
    console.log("--> Connecting to DB");
    await mongoose.connect(process.env.MONGODB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Connect to database successfully");
  } catch (error) {
    console.log("Connect failure!!!");
  }
}

module.exports = { connect };
