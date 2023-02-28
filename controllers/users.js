module.exports.index = (req, res) => {
  res.render("admin/");
};

module.exports.login = (req, res) => {
  const { nickName } = req.user;
  req.flash("success", `Welcome back, ${nickName}.`);
  res.redirect("/");
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("info", "Goodbye.");
    res.redirect("/");
  });
};
