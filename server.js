require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./Routes/productRoute");
const errorMiddleware = require("./middleware/errorMiddleware")
const cors = require('cors')
const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8081;
var corsOptions = {
    origin: process.env.FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions))

//routes
app.use("/api/products", productRoute);
app.get("/", (req, res) => {
    throw new Error('fake error');
 // res.send("Hello Node API");
});
app.use(errorMiddleware)

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Node API app is running..");
    });
    console.log("connected to mongoDB");
  })
  .catch((e) => {
    console.log(e);
  });
