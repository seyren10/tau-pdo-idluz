const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  evaluator: {
    visitDate: String,
    timeIn: String,
    timeOut: String,
    visited: String,
    service: String,
    clientName: String,
    clientType: String,
    sex: String,
    company: String,
    remarks: String,
  },
  evaluate: {
    responsiveness: Number,
    reliability: Number,
    communication: Number,
    courtesy: Number,
    integrity: Number,
    accessAndFacilities: Number,
  },
});

module.exports = mongoose.model("Evaluation", evaluationSchema);
