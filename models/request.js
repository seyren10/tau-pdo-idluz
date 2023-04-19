const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  buildingName: String,
  fullName: String,
  contactNo: String,
  company: String,
  email: String,
  position: String,
  purpose: String,
});

module.exports = mongoose.model("Request", requestSchema);
