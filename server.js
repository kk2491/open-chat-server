"use strict";

console.log("App directory in docker: " + __dirname);
require("app-module-path/register");
require("app-module-path").addPath(__dirname);

const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");

// defining the Express app
const app = express();

app.config = config;
console.log("app.config ===> ", app.config);
console.log("process.env ===> ", process.env);

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

async function connectToMongoDb(counter) {
  const mongoUri = app.config.mongoUrl;
  if (!mongoUri) {
    mongoUri = process.env.MONGO_URL;
  }

  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("Connected to MongoDB ");
    })
    .catch(async (error) => {
      console.log("Connection Error:", error);
      connectToMongoDb(++counter);
    });
}

connectToMongoDb(1);

const apiv1_routes = require("./src/api/v1/routes");

app.use("/v1/", apiv1_routes);

// defining an endpoint to return all ads
app.get("/", (req, res) => {
  console.log("header host = ", req.headers.host);
  res.status(200).json("success");
});

// const apiv1_routes = require('./src/api/v1/routes');
// app.use('/v1/', apiv1_routes);

const server = app.listen(4001, () => {
  console.log("listening on port 4001");
});
server.setTimeout(300000);
