const express = require("express");
const { isLoggedIn } = require("../middleware");
const router = express.Router();
const buildingControllers = require("../controllers/buildings");
const upload = require("../utils/multerLocal");
const catchAsync = require("../utils/catchAsync");
const sensitivityControllers = require("../controllers/sensitivity");

router
  .route("/")
  .get(catchAsync(buildingControllers.index))
  .post(
    upload.array("image", 5),
    isLoggedIn,
    catchAsync(buildingControllers.create)
  );

router.get("/new", isLoggedIn, buildingControllers.new);

router
  .route("/:id")
  .get(catchAsync(buildingControllers.show))
  .delete(isLoggedIn, catchAsync(buildingControllers.delete));

router
  .route("/:id/edit")
  .get(isLoggedIn, catchAsync(buildingControllers.editForm))
  .put(
    upload.array("image", 5),
    isLoggedIn,
    catchAsync(buildingControllers.edit)
  );

//sensitivity
router.get(
  "/:id/sensitivity/new",
  isLoggedIn,
  catchAsync(sensitivityControllers.new)
);
router.post(
  "/:id/sensitivity",
  isLoggedIn,
  catchAsync(sensitivityControllers.create)
);

module.exports = router;
