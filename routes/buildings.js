const express = require("express");
const { isLoggedIn } = require("../middleware");
const router = express.Router();
const buildingControllers = require("../controllers/buildings");
const cathAsync  = require("../utils/catchAsync");
const upload = require('../utils/multerLocal')

router
  .route("/")
  .get(buildingControllers.index)
  .post(isLoggedIn,  upload.array('image',5),cathAsync(buildingControllers.create));

router.get("/new", isLoggedIn, buildingControllers.new);

module.exports = router;
