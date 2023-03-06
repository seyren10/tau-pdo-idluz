const mongoose = require("mongoose");
const {typologies} = require('./categories/typologies');
const {sensitivitySchema} = require('../models/sensitivity')


const buildingSchema = new mongoose.Schema({
  classification: String,
  name: String,
  description: String,
  images: [String],
  floorCount: Number,
  footprintArea: Number,
  floorArea: Number,
  roomCount: String,
  typologies: {
    type: [String],
    enum: typologies,
  },
  capacity: Number,
  userCount: Number,
  assetValue: Number,
  location: {
    latitude: String,
    longtitude: String
  },
  sensitivity: sensitivitySchema,
});

const Building = mongoose.model("Building", buildingSchema);
module.exports = {
  Building,
  typologies,
};
