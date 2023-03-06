const mongoose = require("mongoose");

const materialCategories = require("./categories/materials");
const materialSchema = new mongoose.Schema({
  mainStructural: {
    type: String,
    enum: materialCategories.mainStructuralCategories,
  },
  exteriorWalls: {
    type: String,
    enum: materialCategories.exteriorWallsCategories,
  },
  roofFraming: {
    type: String,
    enum: materialCategories.roofFramingCategories,
  },
  roofCoverage: {
    type: String,
    enum: materialCategories.roofCoverageCategories,
  },
});

const maintenanceSchema = new mongoose.Schema({
  age: Number,
  retrofitYear: Number,
  retrofitDescription: String,
});

const sensitivitySchema = new mongoose.Schema({
  material: materialSchema,
  maintenance: maintenanceSchema,
});

const Sensitivity = mongoose.model("Sensitivity", sensitivitySchema);
module.exports = {
  Sensitivity,
  sensitivitySchema,
};
