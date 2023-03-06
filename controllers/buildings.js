const { Building } = require("../models/building");
const fs = require("fs");
const path = require("path");
const ExpressError = require("../utils/ExpressError");

//index
module.exports.index = async (req, res) => {
  const buildings = await Building.find({});
  res.render("buildings", { buildings });
};

//add new building
module.exports.create = async (req, res) => {
  const building = req.body.building;
  const newBuilding = new Building({ ...building });
  const paths = req.files.map(({ path }) => path);
  newBuilding.images = paths;
  newBuilding.typologies = req.body.typologies;
  newBuilding.location = req.body.location
  await newBuilding.save();
  req.flash("success", "Building successfully added.");
  res.redirect("/buildings/new");
};

//show building
module.exports.show = async (req, res) => {
  const { id } = req.params;
  const building = await Building.findById(id);

  if (!building) {
    req.flash("error", "Building doesn't exist.");
    return res.redirect("/buildings");
  } else {
    res.render("buildings/show", { building });
  }
};

//building edit form
module.exports.editForm = async (req, res) => {
  const { id } = req.params;
  const building = await Building.findById(id);
  res.render("buildings/edit", { building });
};

//building edit
module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const building = await Building.findByIdAndUpdate(id, req.body.building, {
    new: true,
  });
  building.typologies = req.body.typologies;
  building.location = req.body.location
  const addedImages = req.files.map(({ path }) => path);
  building.images.push(...addedImages);
  await building.save();

  const imgsDelete = req.body.deletedImages;
  if (imgsDelete && imgsDelete.length) {
    for (let img of imgsDelete) {
      fs.unlink(path.join(__dirname, "../", img), (err) => {
        if (err) {
          throw new ExpressError(err.message, 500);
        }
      });
    }
  }
  await building.updateOne({ $pull: { images: { $in: imgsDelete } } });
  req.flash('success',`${building.name} successfully updated.`);
  res.redirect(`/buildings/${id}`);
};

// delete building
module.exports.delete = async (req, res) => {
  const {id} = req.params

  const {images} = await Building.findById(id)
  if (images && images.length) {
    for (let img of images) {
      fs.unlink(path.join(__dirname, "../", img), (err) => {
        if (err) {
          throw new ExpressError(err.message, 500);
        }
      });
    }
  }

  await Building.findByIdAndDelete(id)
  req.flash('success', 'Building successfully deleted.')
  res.redirect('/buildings')
};

//building add form
module.exports.new = (req, res) => {
  res.render("buildings/new");
};
