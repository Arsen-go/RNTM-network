const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '../front/views/images/resources'));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage, limits: 2 * 1024 * 1024 });

module.exports = upload;