const express = require("express");
require("express-async-errors");

const app = express();
const path = require("path");
const route = require("./app/routes");
const cors = require("cors");
const errorHandle = require("./app/middlewares/errorHandler");
const { swaggerDocs } = require("./config/swagger");
const PORT = process.env.PORT || 3000;

const db = require("./config/db");

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

db.connect();

app.use(express.static(path.join(__dirname, "/public")));
//config routes
route(app);
swaggerDocs(app);

app.use(errorHandle);

app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
  console.log(`API documentation at : http://localhost:${PORT}/docs`);
});
