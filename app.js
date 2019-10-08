require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const expressip = require("express-ip");

mongoose
  .connect(process.env.DB || "mongodb://localhost/tech-challenge", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app = express();

// Middleware Setup
app.use(expressip().getIpInfoMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes Setup
const auth = require("./routes/auth");
const sort = require("./routes/sort");
app.use("/", auth);
app.use("/", sort);

module.exports = app;
