module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You do not have the permission to do that.");
    return res.redirect("/");
  }
  next();
};
