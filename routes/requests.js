const express = require("express");
const router = express.Router();
const requestControllers = require("../controllers/requests");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");

router
  .route("/")
  .get(catchAsync(requestControllers.index))
  .post(catchAsync(requestControllers.create));

router.route("/manage").get(isLoggedIn, catchAsync(requestControllers.manage));
router.get("/send", isLoggedIn, catchAsync(requestControllers.send));

module.exports = router;
