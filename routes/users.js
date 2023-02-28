const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/users");

router
  .route("/")
  .get(userController.index)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/admin",
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
