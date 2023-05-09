const express = require("express");
const router = express.Router();
const evaluationControllers = require("../controllers/evaluation");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");

router
  .route("/")
  .get(catchAsync(evaluationControllers.index))
  .post(catchAsync(evaluationControllers.create));

router.get("/new", evaluationControllers.new);
router.get("/analytics", catchAsync(evaluationControllers.analytics));
router.route("/:id").get(catchAsync(evaluationControllers.show));

module.exports = router;
