const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

mongoose.connect("mongodb+srv://user:password@cluster0-rm3yj.mongodb.net/Fredi?retryWrites=true&w=majority", {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

const app = express();
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
const routes = require("./src/routes/index");

app.use("/", routes);

app.use((req, res) => {
  res.status(404).json({
    message: ("api.404_error", {
      url: req.originalUrl
    })
  });
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).json({
      error: {
        message: err.message || "Something failed"
      }
    });
    throw err;
  } else {
    next();
  }
});

module.exports = app;