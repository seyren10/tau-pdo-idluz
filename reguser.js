const User = require("./models/user");

module.exports = async (req, res, next) => {
  try {
    const nickName = "roy victor";
    const username = "roy";
    const password = "dragon";
    const user = new User({ username, nickName });
    const registeredUser = await User.register(user, password);
    req.flash("error");
    return res.redirect("/admin");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/admin");
  }
  next();
};
