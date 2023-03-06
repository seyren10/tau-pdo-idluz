const express = require("express");
const { Building } = require("../models/building");

module.exports.new = async (req, res) => {
  const { id } = req.params;
  const building = await Building.findById(id);
  res.render("sensitivities/new", { building });
};

module.exports.create = async (req, res) => {
  const { id } = req.params;
  const formSensitivity = req.body;
  const sensitivity = await Building.findByIdAndUpdate(
    id,
    {
      ...formSensitivity
    },
    { new: true }
  );
  req.flash("success", "Sensitivity data added successfully.");
  res.redirect(`/buildings/${id}`);
};
