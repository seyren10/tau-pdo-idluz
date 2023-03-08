const express = require("express");
const {} = require("../middleware");
const router = express.Router();
const buildingControllers = require("../controllers/buildings");
const upload = require("../utils/multerLocal");
const catchAsync = require("../utils/catchAsync");
const sensitivityControllers = require("../controllers/sensitivity");

router.route("/").get(catchAsync(buildingControllers.index)).post(
  upload.array("image", 5),

  catchAsync(buildingControllers.create)
);

router.get("/new", buildingControllers.new);

router
  .route("/:id")
  .get(catchAsync(buildingControllers.show))
  .delete(catchAsync(buildingControllers.delete));

router.route("/:id/edit").get(catchAsync(buildingControllers.editForm)).put(
  upload.array("image", 5),

  catchAsync(buildingControllers.edit)
);

//sensitivity
router.get(
  "/:id/sensitivity/new",

  catchAsync(sensitivityControllers.new)
);
router.post(
  "/:id/sensitivity",

  catchAsync(sensitivityControllers.create)
);

module.exports = router;
