if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(flash());
app.use(express.urlencoded({ extended: true }));
//SESSION
const secret = process.env.SECRET || "samplename";
const sessionConfig = {
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

//MONGOOSE
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/tau-pdo-idluz")
  .then(() => {
    console.log("Database Connected.");
  })
  .catch((err) => {
    console.log(err);
  });

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const {typologies} = require('./models/building')
//LOCALS
app.use((req, res, next) => {
  res.locals = {
    messages: {
      success: req.flash("success"),
      danger: req.flash("error"),
      info: req.flash("info"),
    },
    currentUser: req.user,
    typologies,
  };
  next();
});

//ROUTES
const userRoutes = require("./routes/users");
const buildingRoutes = require("./routes/buildings");

app.use("/admin", userRoutes);
app.use("/buildings", buildingRoutes);

// const register = require("./reguser");
// app.use(register);

//HOME
app.get("/", (req, res) => {
  res.render("");
});

//all req error handler
app.all("*", (req, res, next) => {
  next(new ExpressError("Page not Found", 404));
});

//error handler
app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Oh no! Something went wrong";
  res.status(status).render("error", { err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Local: http://127.0.0.1:${PORT}`);
});
