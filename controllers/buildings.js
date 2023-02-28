const { Building } = require("../models/building");

module.exports.index = async (req, res) => {
  const buildings = await Building.find({})
  res.render('buildings/', {buildings})
};

module.exports.create = async (req, res) => {
  const building = req.body.building
  const newBuilding = new Building({...building})
    const paths = req.files.map(({path}) => path)
    newBuilding.images = paths
    newBuilding.typologies = req.body.typologies
    await newBuilding.save()
    req.flash('success', 'Building successfully added.')
    res.redirect('/buildings/new')
};

module.exports.new = (req, res) => {
  res.render("buildings/new");
};
