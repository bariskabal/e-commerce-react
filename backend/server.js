const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const dotenv = require("dotenv");
const mainRoute = require("./routes/index.js");
const app = express();
const cors = require("cors");
const port = 5001;
const path = require('path');
dotenv.config(); // kullanabilmemi sağlıyor(process.env)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (err) {
    throw err;
  }
};

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use("/api", mainRoute);

app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda calısıyor`);
});
