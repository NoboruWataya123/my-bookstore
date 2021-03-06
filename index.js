const express = require("express");
require("dotenv").config();
const sequelize = require("./db");
const cookieParser = require("cookie-parser");
const models = require("./models/index");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use(cookieParser());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server started on port ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
