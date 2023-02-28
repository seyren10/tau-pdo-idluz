const multer = require("multer");
const path = require("path");
const ExpressError = require('./ExpressError');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/buildings");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new ExpressError("Only images are allowed", 401));
    }
    cb(null, true);
  };
  
  const upload = multer({
    storage,  
    limits: { fileSize: 2000000 },
    fileFilter,
    multiple: true,
    maxCount: 5,
  });
  
module.exports = upload