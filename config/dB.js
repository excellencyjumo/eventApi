const mongoose = require("mongoose");
require("dotenv").config();

const dBconnection = () => {
  try {
    mongoose.connect(`mongodb+srv://excellencyjumo:${process.env.DB_PASSWORD}@cluster0.jwrwxm1.mongodb.net/`,);
  } catch (err) {
    console.log(err);
  }
};

module.exports = dBconnection;