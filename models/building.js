const mongoose = require("mongoose");
const typologies = [
  "institutional",
  "security",
  "residential",
  "maintenance",
  "workshop",
  "assembly",
  "commercial",
  "agricultural",
  "academic",
  "research",
  "agricultural research",
  "sports",
];

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
});
const Building = mongoose.model("Building", buildingSchema);
module.exports = {
  Building,
  typologies,
};
