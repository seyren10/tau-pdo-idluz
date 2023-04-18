const express = require("express");
const router = express.Router();
const reportControllers = require("../controllers/reports");
const catchAsync = require("../utils/catchAsync");

router.route("/").get(catchAsync(reportControllers.index));

router.route("/download").get(reportControllers.download);
router.route("/download-master-plan").get(reportControllers.downloadMasterPlan);

module.exports = router;
